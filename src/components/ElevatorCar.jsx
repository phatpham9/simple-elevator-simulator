import { getElevatorColorClass } from '../utils/elevatorUtils'

const ElevatorCar = ({ elevator, numFloors, elevatorIndex }) => {
    if (!elevator) return null

    return (
        <div
            className={`absolute left-0 right-0 mx-2 h-16 rounded-xl transition-all duration-1000 flex items-center justify-center text-white font-bold shadow-xl ${getElevatorColorClass(elevatorIndex)} ring-2 ring-white`}
            style={{
                top: `${(numFloors - elevator.currentFloor) * 80 + 8}px`,
                opacity: elevator.isMoving ? 0.9 : 1,
                transform: elevator.isMoving ? 'scale(0.98)' : 'scale(1)',
                boxShadow: elevator.isMoving 
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
            }}
        >
            {elevator.isMoving ? (
                <div className="flex items-center gap-2">
                    <span className="text-2xl animate-pulse">
                        {elevator.direction === 'up' ? '↑' : '↓'}
                    </span>
                    <span className="text-sm">{elevator.currentFloor}</span>
                </div>
            ) : (
                <span className="text-xl">{elevator.currentFloor}</span>
            )}
        </div>
    )
}

export default ElevatorCar
