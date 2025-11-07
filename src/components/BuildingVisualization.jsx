import ElevatorCar from './ElevatorCar'
import { generateFloors } from '../utils/elevatorUtils'

const BuildingVisualization = ({ numFloors, numElevators, elevators, calls, callElevator }) => {
    const floors = generateFloors(numFloors)

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-300 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-3">
                <h2 className="text-lg font-bold text-white">Building Visualization</h2>
                <p className="text-slate-300 text-xs">Click call buttons to request an elevator</p>
            </div>
            <div className="flex">
                {/* Left column - floor numbers */}
                <div className="w-20 shrink-0 border-r-2 border-slate-200 bg-slate-50">
                    <div className="h-14 flex items-center justify-center font-bold text-slate-600 bg-slate-100 border-b-2 border-slate-200">
                        Floor
                    </div>
                    {floors.map(floor => (
                        <div key={`floor-${floor}`} className="h-20 flex items-center justify-center font-semibold text-slate-700 text-lg border-b border-slate-200 last:border-b-0">
                            {floor}
                        </div>
                    ))}
                </div>

                {/* Middle column - call buttons */}
                <div className="w-20 shrink-0 border-r-2 border-slate-200 bg-slate-50">
                    <div className="h-14 flex items-center justify-center font-bold text-slate-600 bg-slate-100 border-b-2 border-slate-200">
                        Call
                    </div>
                    {floors.map(floor => (
                        <div key={`buttons-${floor}`} className="h-20 flex flex-col items-center justify-center space-y-1.5 border-b border-slate-200 last:border-b-0">
                            {floor < numFloors && (
                                <button
                                    onClick={() => callElevator(floor, 'up')}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-md
                        ${calls.some(c => c.floor === floor && c.direction === 'up')
                                            ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                                        }`}
                                >
                                    ↑
                                </button>
                            )}

                            {floor > 1 && (
                                <button
                                    onClick={() => callElevator(floor, 'down')}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-md
                        ${calls.some(c => c.floor === floor && c.direction === 'down')
                                            ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                                        }`}
                                >
                                    ↓
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Elevator shafts */}
                <div className="flex-1 flex bg-slate-50">
                    {Array(numElevators).fill().map((_, elevIndex) => (
                        <div
                            key={`shaft-${elevIndex}`}
                            className="flex-1 border-r-2 last:border-r-0 border-slate-200 relative"
                        >
                            <div className="h-14 flex items-center justify-center font-bold text-slate-700 bg-slate-100 border-b-2 border-slate-200">
                                Elevator {elevIndex + 1}
                            </div>

                            {/* Elevator shaft */}
                            <div className="relative bg-gradient-to-b from-slate-50 to-slate-100">
                                {floors.map(floor => (
                                    <div
                                        key={`cell-${elevIndex}-${floor}`}
                                        className="h-20 border-b border-slate-200 last:border-b-0"
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
