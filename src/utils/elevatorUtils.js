// Utility functions for the elevator simulator

/**
 * Get elevator color based on index
 */
export const getElevatorColor = (index) => {
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-fuchsia-500'
    ]
    return colors[index % colors.length]
}

/**
 * Generate floor numbers from top to bottom
 */
export const generateFloors = (numFloors) => {
    return Array.from({ length: numFloors }, (_, i) => numFloors - i)
}
