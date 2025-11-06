import { useState, useEffect } from 'react'
import { getAlgorithm, insertIntoQueue } from '../algorithms/elevatorScheduler'

/**
 * Custom hook to manage elevator system state and logic
 */
export const useElevatorSystem = (numFloors, numElevators, schedulingMode = 'manual') => {
    const [elevators, setElevators] = useState([])
    const [calls, setCalls] = useState([])
    
    const isAutoMode = schedulingMode !== 'manual'

    // Initialize/reset elevators when configuration changes
    useEffect(() => {
        setElevators(
            Array(numElevators).fill().map((_, index) => ({
                id: index,
                currentFloor: 1,
                targetFloor: null,
                direction: 'idle',
                isMoving: false,
                queue: [] // Queue of floors to visit
            }))
        )
        setCalls([])
    }, [numFloors, numElevators])

    // Call an elevator (add to queue)
    const callElevator = (floor, direction) => {
        if (!calls.some(c => c.floor === floor && c.direction === direction)) {
            const newCall = { id: Date.now(), floor, direction }
            setCalls(prev => [...prev, newCall])
            
            // If in auto mode, immediately assign to best elevator
            if (isAutoMode) {
                setTimeout(() => {
                    const algorithm = getAlgorithm(schedulingMode)
                    const bestElevatorId = algorithm(elevators, floor, direction)
                    if (bestElevatorId !== null) {
                        addToElevatorQueue(bestElevatorId, floor, direction)
                        setCalls(prev => prev.filter(c => c.id !== newCall.id))
                    }
                }, 100) // Small delay to ensure state is updated
            }
        }
    }

    // Add a floor to an elevator's queue
    const addToElevatorQueue = (elevatorId, floor) => {
        setElevators(prev =>
            prev.map(e => {
                if (e.id !== elevatorId) return e

                // Add floor to queue using the selected algorithm's queue insertion
                const newQueue = insertIntoQueue(e.queue, e.currentFloor, e.direction, floor, schedulingMode)
                
                // If elevator is idle, start moving immediately
                if (e.direction === 'idle' && !e.isMoving) {
                    const targetFloor = newQueue[0]
                    const newDirection = targetFloor > e.currentFloor ? 'up' : 'down'
                    
                    return {
                        ...e,
                        queue: newQueue,
                        targetFloor,
                        direction: newDirection,
                        isMoving: true
                    }
                }

                return {
                    ...e,
                    queue: newQueue
                }
            })
        )
    }

    // Move an elevator to a specific floor
    const moveElevator = (elevatorId, targetFloor) => {
        const elevator = elevators.find(e => e.id === elevatorId)
        if (!elevator || elevator.currentFloor === targetFloor) return

        // In auto mode, add to queue instead of direct movement
        if (isAutoMode) {
            addToElevatorQueue(elevatorId, targetFloor)
            return
        }

        // Manual mode: start floor-by-floor movement
        if (elevator.isMoving) return

        setElevators(prev =>
            prev.map(e =>
                e.id === elevatorId
                    ? {
                        ...e,
                        targetFloor,
                        direction: targetFloor > e.currentFloor ? 'up' : 'down',
                        isMoving: true,
                        queue: [targetFloor]
                    }
                    : e
            )
        )
    }

    // Effect to handle elevator movement (floor-by-floor for both manual and auto modes)
    useEffect(() => {
        const intervals = elevators.map(elevator => {
            if (!elevator.isMoving || elevator.targetFloor === null) return null

            // Move one floor at a time (1 second per floor)
            return setTimeout(() => {
                setElevators(prev =>
                    prev.map(e => {
                        if (e.id !== elevator.id) return e

                        // Move one floor closer to target
                        const currentFloor = e.currentFloor
                        const targetFloor = e.targetFloor
                        const direction = e.direction
                        
                        let nextFloor = currentFloor
                        if (direction === 'up') {
                            nextFloor = currentFloor + 1
                        } else if (direction === 'down') {
                            nextFloor = currentFloor - 1
                        }

                        // Check if we've reached the target floor
                        if (nextFloor === targetFloor) {
                            // Remove reached floor from queue
                            const newQueue = e.queue.slice(1)

                            // If more floors in queue, continue to next target
                            if (newQueue.length > 0) {
                                const nextTarget = newQueue[0]
                                const newDirection = nextTarget > nextFloor ? 'up' : 'down'

                                return {
                                    ...e,
                                    currentFloor: nextFloor,
                                    targetFloor: nextTarget,
                                    direction: newDirection,
                                    queue: newQueue,
                                    isMoving: true
                                }
                            }

                            // No more floors, become idle
                            return {
                                ...e,
                                currentFloor: nextFloor,
                                targetFloor: null,
                                direction: 'idle',
                                isMoving: false,
                                queue: []
                            }
                        }

                        // Continue moving toward target
                        return {
                            ...e,
                            currentFloor: nextFloor,
                            isMoving: true
                        }
                    })
                )
            }, 1000) // 1 second per floor
        })

        return () => {
            intervals.forEach(interval => {
                if (interval) clearTimeout(interval)
            })
        }
    }, [elevators])

    // Assign a call to an elevator (manual mode)
    const assignCall = (callId, elevatorId) => {
        const call = calls.find(c => c.id === callId)
        if (!call) return

        if (isAutoMode) {
            addToElevatorQueue(elevatorId, call.floor)
        } else {
            moveElevator(elevatorId, call.floor)
        }
        
        setCalls(prev => prev.filter(c => c.id !== callId))
    }

    // Auto-assign pending calls using selected scheduling algorithm
    const autoAssignCalls = () => {
        if (!isAutoMode || calls.length === 0) return

        const algorithm = getAlgorithm(schedulingMode)
        
        calls.forEach(call => {
            const bestElevatorId = algorithm(elevators, call.floor, call.direction)
            if (bestElevatorId !== null) {
                addToElevatorQueue(bestElevatorId, call.floor)
            }
        })
        
        setCalls([])
    }

    return {
        elevators,
        calls,
        callElevator,
        moveElevator,
        assignCall,
        autoAssignCalls,
        addToElevatorQueue
    }
}
