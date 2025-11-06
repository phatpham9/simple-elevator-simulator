import ElevatorCar from './ElevatorCar'
import { generateFloors } from '../utils/elevatorUtils'

const BuildingVisualization = ({ numFloors, numElevators, elevators, calls, callElevator }) => {
    const floors = generateFloors(numFloors)

    return (
        <div className="bg-white border-4 border-gray-800 rounded-lg shadow mb-6 overflow-hidden">
            <div className="flex">
                {/* Left column - floor numbers */}
                <div className="w-16 shrink-0 border-r border-gray-300">
                    <div className="h-12 flex items-center justify-center font-bold bg-gray-100 border-b border-gray-300">
                        Floor
                    </div>
                    {floors.map(floor => (
                        <div key={`floor-${floor}`} className="h-20 flex items-center justify-center font-medium border-b last:border-b-0 border-gray-300">
                            {floor}
                        </div>
                    ))}
                </div>

                {/* Middle column - call buttons */}
                <div className="w-16 shrink-0 border-r border-gray-300">
                    <div className="h-12 flex items-center justify-center font-bold bg-gray-100 border-b border-gray-300">
                        Call
                    </div>
                    {floors.map(floor => (
                        <div key={`buttons-${floor}`} className="h-20 flex flex-col items-center justify-center space-y-1 border-b last:border-b-0 border-gray-300">
                            {floor < numFloors && (
                                <button
                                    onClick={() => callElevator(floor, 'up')}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${calls.some(c => c.floor === floor && c.direction === 'up')
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    ↑
                                </button>
                            )}

                            {floor > 1 && (
                                <button
                                    onClick={() => callElevator(floor, 'down')}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${calls.some(c => c.floor === floor && c.direction === 'down')
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    ↓
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Elevator shafts */}
                <div className="flex-1 flex">
                    {Array(numElevators).fill().map((_, elevIndex) => (
                        <div
                            key={`shaft-${elevIndex}`}
                            className="flex-1 border-r last:border-r-0 border-gray-300 relative"
                        >
                            <div className="h-12 flex items-center justify-center font-bold bg-gray-100 border-b border-gray-300">
                                Elevator {elevIndex + 1}
                            </div>

                            {/* Elevator shaft */}
                            <div className="relative">
                                {floors.map(floor => (
                                    <div
                                        key={`cell-${elevIndex}-${floor}`}
                                        className="h-20 border-b last:border-b-0 border-gray-300"
                                    />
                                ))}

                                {/* Elevator car */}
                                <ElevatorCar 
                                    elevator={elevators[elevIndex]} 
                                    numFloors={numFloors} 
                                    elevatorIndex={elevIndex}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BuildingVisualization
