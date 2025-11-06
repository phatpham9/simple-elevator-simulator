import { useState, useEffect } from 'react'

/**
 * Custom hook to manage elevator system state and logic
 */
export const useElevatorSystem = (numFloors, numElevators) => {
    const [elevators, setElevators] = useState([])
    const [calls, setCalls] = useState([])

    // Initialize/reset elevators when configuration changes
    useEffect(() => {
        setElevators(
            Array(numElevators).fill().map((_, index) => ({
                id: index,
                currentFloor: 1,
                targetFloor: null,
                direction: 'idle',
                isMoving: false
            }))
        )
        setCalls([])
    }, [numFloors, numElevators])

    // Call an elevator (add to queue)
    const callElevator = (floor, direction) => {
        if (!calls.some(c => c.floor === floor && c.direction === direction)) {
            setCalls(prev => [...prev, { id: Date.now(), floor, direction }])
        }
    }

    // Move an elevator to a specific floor
    const moveElevator = (elevatorId, targetFloor) => {
        const elevator = elevators.find(e => e.id === elevatorId)
        if (!elevator || elevator.isMoving || elevator.currentFloor === targetFloor) return

        setElevators(prev =>
            prev.map(e =>
                e.id === elevatorId
                    ? {
                        ...e,
                        targetFloor,
                        direction: targetFloor > e.currentFloor ? 'up' : 'down',
                        isMoving: true
                    }
                    : e
            )
        )

        // Calculate movement time based on floors to travel
        const travelTime = Math.abs(targetFloor - elevator.currentFloor) * 1000

        // Update position after animation
        setTimeout(() => {
            setElevators(prev =>
                prev.map(e =>
                    e.id === elevatorId
                        ? {
                            ...e,
                            currentFloor: targetFloor,
                            targetFloor: null,
                            direction: 'idle',
                            isMoving: false
                        }
                        : e
                )
            )
        }, travelTime)
    }

    // Assign a call to an elevator
    const assignCall = (callId, elevatorId) => {
        const call = calls.find(c => c.id === callId)
        if (!call) return

        moveElevator(elevatorId, call.floor)
        setCalls(prev => prev.filter(c => c.id !== callId))
    }

    return {
        elevators,
        calls,
        callElevator,
        moveElevator,
        assignCall
    }
}
