/**
 * SSTF (Shortest Seek Time First) Algorithm Implementation
 * 
 * The SSTF algorithm always serves the nearest call next, regardless of direction.
 * This minimizes immediate travel time but can cause starvation for distant floors.
 * 
 * Key characteristics:
 * - Always picks the closest floor from current position
 * - Ignores call direction (picks nearest regardless of up/down request)
 * - Can be inefficient if new nearby calls keep arriving
 * - May cause longer wait times for far floors (starvation problem)
 * 
 * Educational value: Demonstrates the starvation problem in scheduling algorithms
 */

/**
 * SSTF Algorithm: Assigns call to the nearest available elevator
 * Simply finds the elevator closest to the call floor
 * 
 * @param {Array} elevators - Array of elevator objects
 * @param {number} callFloor - Floor where call originated
 * @returns {number|null} - ID of nearest elevator, or null if none available
 */
export const sstfAlgorithm = (elevators, callFloor) => {
    if (!elevators || elevators.length === 0) return null

    let nearestElevator = null
    let minDistance = Infinity

    for (const elevator of elevators) {
        // Calculate distance from elevator's CURRENT position to call floor
        // For SSTF, we always use current floor, not target or queue
        const distance = Math.abs(elevator.currentFloor - callFloor)
        
        if (distance < minDistance) {
            minDistance = distance
            nearestElevator = elevator
        }
    }

    return nearestElevator ? nearestElevator.id : null
}

/**
 * Insert a floor into an elevator's queue for SSTF
 * Always inserts in order of distance from current position
 * 
 * @param {Array} queue - Current queue of floors (numbers or objects)
 * @param {number} currentFloor - Elevator's current floor
 * @param {number} newFloor - Floor to add to queue
 * @returns {Array} - New queue with floor inserted, sorted by distance
 */
export const insertIntoQueueSSTF = (queue, currentFloor, newFloor) => {
    // If queue is empty, just add the floor
    if (queue.length === 0) {
        return [newFloor]
    }

    // Handle both number arrays and object arrays
    const isObjectArray = queue.length > 0 && typeof queue[0] === 'object' && queue[0] !== null
    
    if (isObjectArray) {
        // Queue contains objects - extract floors, process, and rebuild
        const floors = queue.map(item => item.floor)
        const newFloors = insertIntoQueueSSTF(floors, currentFloor, newFloor)
        
        // Rebuild with objects (this is handled in useElevatorSystem, so just return floors)
        return newFloors
    }

    const newQueue = [...queue]

    // If floor is already in queue, don't add it again
    if (newQueue.includes(newFloor)) {
        return newQueue
    }

    // For SSTF, we insert based on distance from current floor
    newQueue.push(newFloor)
    
    // Sort by distance from current floor (nearest first)
    newQueue.sort((a, b) => {
        const distA = Math.abs(a - currentFloor)
        const distB = Math.abs(b - currentFloor)
        return distA - distB
    })

    return newQueue
}

