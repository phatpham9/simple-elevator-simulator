/**
 * LOOK Algorithm Implementation
 * 
 * The LOOK algorithm moves elevators in one direction, serving all calls in that direction
 * until there are no more requests ahead, then reverses direction.
 * This is similar to SCAN but doesn't go all the way to the top/bottom if no requests exist.
 * 
 * More efficient than SCAN for variable traffic patterns.
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

    // Extract floor numbers from queue (handles object format)
    const getFloor = (item) => (typeof item === 'object' && item !== null) ? item.floor : item
    const queueFloors = queue.map(getFloor)
    const lastQueueFloor = queueFloors.length > 0 ? queueFloors[queueFloors.length - 1] : currentFloor
    
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
        // Calculate cost for this elevator
        const cost = calculateCost(elevator, callFloor, callDirection)
        
        // Skip elevators that would have extremely high cost (incompatible), 
        // UNLESS they're the only option
        const isIncompatible = cost >= 1000
        
        if (isIncompatible) {
            // High cost (needs reversal), but we'll still consider it
            // Only skip if we already have a much better option
            if (lowestCost < 1000) {
                continue // We have a better option, skip this high-cost one
            }
        }
        
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
 * @param {Array} queue - Current queue of floors (may be numbers or objects)
 * @param {number} currentFloor - Elevator's current floor
 * @param {string} direction - Current direction ('up', 'down', or 'idle')
 * @param {number} newFloor - Floor to add to queue
 * @returns {Array} - New queue with floor inserted (maintains input format)
 */
export const insertIntoQueueLOOK = (queue, currentFloor, direction, newFloor) => {
    // If queue is empty or elevator is idle, just add the floor
    if (queue.length === 0 || direction === 'idle') {
        return [newFloor]
    }

    // Handle both number arrays and object arrays
    const isObjectArray = queue.length > 0 && typeof queue[0] === 'object' && queue[0] !== null
    
    if (isObjectArray) {
        // Queue contains objects - extract floors, process, and rebuild
        const floors = queue.map(item => item.floor)
        const newFloors = insertIntoQueueLOOK(floors, currentFloor, direction, newFloor)
        
        // Rebuild with objects (this is handled in useElevatorSystem, so just return floors)
        return newFloors
    }

    const newQueue = [...queue]

    // If floor is already in queue, don't add it again
    if (newQueue.includes(newFloor)) {
        return newQueue
    }

    // Insert based on direction to maintain LOOK order
    if (direction === 'up') {
        // Going up: keep floors in ascending order
        // Only floors >= currentFloor in current direction, then floors < currentFloor
        newQueue.push(newFloor)
        newQueue.sort((a, b) => a - b)
    } else if (direction === 'down') {
        // Going down: keep floors in descending order
        // Only floors <= currentFloor in current direction, then floors > currentFloor
        newQueue.push(newFloor)
        newQueue.sort((a, b) => b - a)
    }

    return newQueue
}

