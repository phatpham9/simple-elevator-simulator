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
    const lastQueueFloor = queue.length > 0 ? queue[queue.length - 1] : currentFloor
    
    // If call is in the same direction as elevator
    if (direction === 'up' && callFloor >= currentFloor && callDirection === 'up') {
        return callFloor - currentFloor
    }
    if (direction === 'down' && callFloor <= currentFloor && callDirection === 'down') {
        return currentFloor - callFloor
    }

    // Call is not in current direction - calculate distance including direction change
    if (direction === 'up') {
        return (lastQueueFloor - currentFloor) + (lastQueueFloor - callFloor)
    } else {
        return (currentFloor - lastQueueFloor) + Math.abs(lastQueueFloor - callFloor)
    }
}

/**
 * LOOK Algorithm: Assigns call to the best elevator
 * Considers position, direction, and current queue
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
        // Find position to insert (floors should be in ascending order)
        const insertIndex = newQueue.findIndex(floor => floor > newFloor)
        if (insertIndex === -1) {
            newQueue.push(newFloor)
        } else {
            newQueue.splice(insertIndex, 0, newFloor)
        }
    } else {
        // direction === 'down'
        // Find position to insert (floors should be in descending order)
        const insertIndex = newQueue.findIndex(floor => floor < newFloor)
        if (insertIndex === -1) {
            newQueue.push(newFloor)
        } else {
            newQueue.splice(insertIndex, 0, newFloor)
        }
    }

    return newQueue
}
