/**
 * SCAN Algorithm Implementation (Classic Elevator Algorithm)
 * 
 * The SCAN algorithm moves elevators in one direction until reaching the extreme end,
 * then reverses direction. Unlike LOOK, it always goes to the top/bottom floor.
 * 
 * This implementation uses proper extreme-reaching behavior where elevators
 * complete full sweeps to ensure fairness and prevent starvation.
 * 
 * Benefits over LOOK:
 * - More predictable behavior
 * - Better starvation prevention
 * - Simpler to understand and implement
 * 
 * Benefits over SSTF:
 * - Prevents starvation (SSTF can ignore distant floors)
 * - More fair distribution of service
 * - Better average wait times for all floors
 */

/**
 * Calculate the cost (distance + penalties) for an elevator to serve a call
 * @param {Object} elevator - Elevator object
 * @param {number} callFloor - Floor where call originated
 * @param {string} callDirection - Direction of call ('up' or 'down')
 * @param {number} maxFloor - Maximum floor in the building
 * @returns {number} - Cost to serve this call
 */
const calculateCost = (elevator, callFloor, callDirection, maxFloor) => {
    const { currentFloor, direction } = elevator

    // If elevator is idle, cost is just the distance
    if (direction === 'idle') {
        return Math.abs(currentFloor - callFloor)
    }

    // SCAN: elevator continues to the extreme end before reversing
    if (direction === 'up') {
        if (callFloor >= currentFloor && callDirection === 'up') {
            // Call is ahead in the same direction - can pick up on the way
            return callFloor - currentFloor
        } else {
            // Need to go to top, then come back down
            // Cost: distance to top + distance from top to call floor
            const distanceToTop = maxFloor - currentFloor
            const distanceFromTopToCall = maxFloor - callFloor
            return distanceToTop + distanceFromTopToCall + 100 // Add penalty for direction change
        }
    } else if (direction === 'down') {
        if (callFloor <= currentFloor && callDirection === 'down') {
            // Call is ahead in the same direction - can pick up on the way
            return currentFloor - callFloor
        } else {
            // Need to go to bottom, then come back up
            // Cost: distance to bottom + distance from bottom to call floor
            const distanceToBottom = currentFloor - 1
            const distanceFromBottomToCall = callFloor - 1
            return distanceToBottom + distanceFromBottomToCall + 100 // Add penalty for direction change
        }
    }

    return Math.abs(currentFloor - callFloor)
}

/**
 * SCAN Algorithm: Assigns call to the best elevator
 * Elevators move to the extreme end before reversing
 * 
 * @param {Array} elevators - Array of elevator objects
 * @param {number} callFloor - Floor where call originated
 * @param {string} callDirection - Direction of call ('up' or 'down')
 * @param {number} maxFloor - Maximum floor in the building (default: 20)
 * @returns {number|null} - ID of best elevator, or null if none available
 */
export const scanAlgorithm = (elevators, callFloor, callDirection, maxFloor = 20) => {
    if (!elevators || elevators.length === 0) return null

    let bestElevator = null
    let lowestCost = Infinity

    for (const elevator of elevators) {
        const cost = calculateCost(elevator, callFloor, callDirection, maxFloor)
        
        // Prefer lower cost elevators
        if (cost < lowestCost) {
            lowestCost = cost
            bestElevator = elevator
        }
    }

    return bestElevator ? bestElevator.id : null
}

/**
 * Insert a floor into an elevator's queue for SCAN algorithm
 * Maintains order based on direction and ensures we go to extremes
 * 
 * For SCAN, we MUST go to the extreme (top or bottom) before reversing.
 * This function maintains floors in order of visit based on current direction.
 * 
 * @param {Array} queue - Current queue of floors
 * @param {number} currentFloor - Elevator's current floor
 * @param {string} direction - Current direction ('up', 'down', or 'idle')
 * @param {number} newFloor - Floor to add to queue
 * @returns {Array} - New queue with floor inserted
 */
export const insertIntoQueueSCAN = (queue, currentFloor, direction, newFloor) => {
    // If queue is empty or elevator is idle, just add the floor
    if (queue.length === 0 || direction === 'idle') {
        return [newFloor]
    }

    const newQueue = [...queue]

    // If floor is already in queue, don't add it again
    if (newQueue.includes(newFloor)) {
        return newQueue
    }

    // Insert based on direction to maintain SCAN order
    // SCAN goes to the extreme in current direction, so we sort accordingly
    if (direction === 'up') {
        // Going up: floors should be in ascending order
        // We'll reach them in order from lowest to highest
        newQueue.push(newFloor)
        newQueue.sort((a, b) => a - b) // Sort ascending
        
        // In SCAN, we continue up even past the highest call to reach the top
        // The phantom floor logic in useElevatorSystem.js handles adding the extreme
    } else if (direction === 'down') {
        // Going down: floors should be in descending order
        // We'll reach them in order from highest to lowest
        newQueue.push(newFloor)
        newQueue.sort((a, b) => b - a) // Sort descending
        
        // In SCAN, we continue down even past the lowest call to reach the bottom
        // The phantom floor logic in useElevatorSystem.js handles adding the extreme
    }

    return newQueue
}

