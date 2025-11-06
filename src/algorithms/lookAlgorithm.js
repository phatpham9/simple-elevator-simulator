/**
 * LOOK Algorithm Implementation
 * 
 * The LOOK algorithm moves elevators in one direction, serving all calls in that direction
 * until there are no more requests ahead, then reverses direction.
 * This is similar to SCAN but doesn't go all the way to the top/bottom if no requests exist.
 */

/**
 * Calculate the cost (distance) for an elevator to serve a call
 * Takes into account current position, direction, and queue
 */
const calculateCost = (elevator, callFloor, callDirection) => {
    const { currentFloor, direction, queue } = elevator

    // If elevator is idle, cost is just the distance
    if (direction === 'idle') {
        return Math.abs(currentFloor - callFloor)
    }

    // If elevator is moving, consider its direction and queue
    // Extract floor number from queue (handles both old number format and new object format)
    const getFloor = (item) => (typeof item === 'object' && item !== null) ? item.floor : item
    const lastQueueFloor = queue.length > 0 ? getFloor(queue[queue.length - 1]) : currentFloor
    
    // Prefer calls in the same direction as the elevator is moving
    // If call is in the same direction as elevator and ahead of it
    if (direction === 'up' && callFloor >= currentFloor && callDirection === 'up') {
        // Low cost - elevator can pick this up on the way
        return callFloor - currentFloor
    }
    if (direction === 'down' && callFloor <= currentFloor && callDirection === 'down') {
        // Low cost - elevator can pick this up on the way
        return currentFloor - callFloor
    }

    // Call is not in current direction or behind the elevator
    // High penalty: elevator must finish current direction, then come back
    if (direction === 'up') {
        // Going up, need to finish queue, then come down
        return (lastQueueFloor - currentFloor) + (lastQueueFloor - callFloor) + 1000
    } else {
        // Going down, need to finish queue, then go up
        return (currentFloor - lastQueueFloor) + Math.abs(lastQueueFloor - callFloor) + 1000
    }
}

/**
 * LOOK Algorithm: Assigns call to the best elevator
 * Considers position, direction, and current queue
 * Only assigns to elevators that are idle or moving in a compatible direction
 * 
 * @param {Array} elevators - Array of elevator objects
 * @param {number} callFloor - Floor where call originated
 * @param {string} callDirection - Direction of call ('up' or 'down')
 * @returns {number|null} - ID of best elevator, or null if none available
 */
export const lookAlgorithm = (elevators, callFloor, callDirection) => {
    if (!elevators || elevators.length === 0) return null

    let bestElevator = null
    let lowestCost = Infinity

    for (const elevator of elevators) {
        // Skip elevators that are busy with incompatible calls
        if (elevator.direction !== 'idle' && elevator.queue && elevator.queue.length > 0) {
            // Check the call directions in the queue
            const queueHasDirectionCalls = elevator.queue.some(q => q.callDirection !== null && q.callDirection !== undefined)
            
            if (queueHasDirectionCalls) {
                // Find the primary direction of calls in queue
                const queueCallDirections = elevator.queue
                    .filter(q => q.callDirection)
                    .map(q => q.callDirection)
                
                // If queue has calls in a specific direction, only accept same-direction calls
                if (queueCallDirections.length > 0) {
                    const primaryDirection = queueCallDirections[0] // First call's direction
                    
                    // If incoming call direction doesn't match queue's direction, skip
                    if (callDirection && primaryDirection !== callDirection) {
                        continue // Skip this elevator
                    }
                }
            }
            
            // Additional check: for LOOK, only accept calls ahead in the direction of travel
            if (elevator.direction === 'up') {
                // Elevator going up - only accept calls that are ahead
                if (callFloor < elevator.currentFloor) {
                    continue // Skip this elevator - call is behind
                }
                // If call is UP and ahead, or DOWN but we'll get it on way up, accept
                // But if queue has DOWN calls, only accept if floor is ahead and compatible
                if (callDirection === 'down' && callFloor > elevator.currentFloor) {
                    // DOWN call ahead while going up - only if no other commitments
                    const hasUpCalls = elevator.queue.some(q => q.callDirection === 'up')
                    if (hasUpCalls) {
                        continue // Already committed to UP calls, skip this DOWN call
                    }
                }
            } else if (elevator.direction === 'down') {
                // Elevator going down - only accept calls that are ahead (below)
                if (callFloor > elevator.currentFloor) {
                    continue // Skip this elevator - call is behind
                }
                // If call is DOWN and ahead, accept
                // But if queue has UP calls, skip DOWN calls
                if (callDirection === 'up' && callFloor < elevator.currentFloor) {
                    // UP call ahead (below) while going down - only if no other commitments
                    const hasDownCalls = elevator.queue.some(q => q.callDirection === 'down')
                    if (hasDownCalls) {
                        continue // Already committed to DOWN calls, skip this UP call
                    }
                }
            }
        }

        const cost = calculateCost(elevator, callFloor, callDirection)
        
        if (cost < lowestCost) {
            lowestCost = cost
            bestElevator = elevator
        }
    }

    return bestElevator ? bestElevator.id : null
}

/**
 * Insert a floor into an elevator's queue in optimal order
 * For LOOK algorithm: maintains order based on direction
 * 
 * @param {Array} queue - Current queue of floors
 * @param {number} currentFloor - Elevator's current floor
 * @param {string} direction - Current direction ('up', 'down', or 'idle')
 * @param {number} newFloor - Floor to add to queue
 * @returns {Array} - New queue with floor inserted
 */
export const insertIntoQueueLOOK = (queue, currentFloor, direction, newFloor) => {
    // If queue is empty or elevator is idle, just add the floor
    if (queue.length === 0 || direction === 'idle') {
        return [newFloor]
    }

    const newQueue = [...queue]

    // If floor is already in queue, don't add it again
    if (newQueue.includes(newFloor)) {
        return newQueue
    }

    // Insert based on direction to maintain LOOK order
    if (direction === 'up') {
        // Going up: insert floors in ascending order
        // Only insert if floor is ahead in the direction of travel
        const insertIndex = newQueue.findIndex(floor => floor > newFloor)
        if (insertIndex === -1) {
            // Floor is higher than all in queue, add at end
            newQueue.push(newFloor)
        } else {
            // Insert in sorted position
            newQueue.splice(insertIndex, 0, newFloor)
        }
    } else {
        // Going down: insert floors in descending order
        // Find the correct position to maintain descending order
        let insertIndex = -1
        for (let i = 0; i < newQueue.length; i++) {
            if (newQueue[i] < newFloor) {
                insertIndex = i
                break
            }
        }
        
        if (insertIndex === -1) {
            // Floor is lower than all in queue, add at end
            newQueue.push(newFloor)
        } else {
            // Insert in sorted position
            newQueue.splice(insertIndex, 0, newFloor)
        }
    }

    return newQueue
}
