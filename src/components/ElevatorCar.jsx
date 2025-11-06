import { getElevatorColor } from '../utils/elevatorUtils'

const ElevatorCar = ({ elevator, numFloors, elevatorIndex }) => {
    if (!elevator) return null

    return (
        <div
            className={`absolute left-0 right-0 mx-2 h-14 rounded-md transition-all duration-1000 flex items-center justify-center text-white font-bold shadow-md ${getElevatorColor(elevatorIndex)}`}
            style={{
                top: `${(numFloors - elevator.currentFloor) * 80 + 12}px`,
                opacity: elevator.isMoving ? 0.7 : 1,
                transform: elevator.isMoving ? 'scale(0.95)' : 'scale(1)'
            }}
        >
            {elevator.isMoving ? (
                <>
                    {elevator.direction === 'up' ? '↑' : '↓'}
                </>
            ) : (
                <span>{elevator.currentFloor}</span>
            )}
        </div>
    )
}

export default ElevatorCar
