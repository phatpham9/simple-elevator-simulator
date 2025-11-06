// Utility functions for the elevator simulator
import { colors } from '../styles/designSystem'

/**
 * Get elevator color based on index (using design system)
 */
export const getElevatorColor = (index) => {
    return colors.elevators[index % colors.elevators.length]
}

/**
 * Get elevator color as Tailwind class
 */
export const getElevatorColorClass = (index) => {
    const colorMap = [
        'bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500',
        'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-fuchsia-500'
    ]
    return colorMap[index % colorMap.length]
}

/**
 * Generate floor numbers from top to bottom
 */
export const generateFloors = (numFloors) => {
    return Array.from({ length: numFloors }, (_, i) => numFloors - i)
}
