import { getElevatorColor } from '../utils/elevatorUtils'

const ControlPanel = ({ calls, elevators, assignCall, moveElevator, numFloors }) => {
    return (
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-bold mb-3">Control Panel</h2>

            {/* Pending Calls Section */}
            <div className="mb-4">
                <h3 className="font-medium mb-2">Pending Calls ({calls.length})</h3>
                {calls.length === 0 ? (
                    <p className="text-gray-500 italic">No pending calls</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {calls.map(call => (
                            <div key={call.id} className="border rounded p-2 bg-gray-50">
                                <div className="font-medium">Floor {call.floor} ({call.direction === 'up' ? '↑' : '↓'})</div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {elevators.map(elev => (
                                        <button
                                            key={`assign-${call.id}-${elev.id}`}
                                            onClick={() => assignCall(call.id, elev.id)}
                                            disabled={elev.isMoving}
                                            className={`px-2 py-1 text-xs rounded-full ${getElevatorColor(elev.id)} text-white
                            ${elev.isMoving ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                                        >
                                            E{elev.id + 1} ({elev.currentFloor})
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Elevator Controls Section */}
            <div>
                <h3 className="font-medium mb-2">Elevator Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {elevators.map(elevator => (
                        <div key={`control-${elevator.id}`} className="border rounded p-3 bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-4 h-4 rounded-full ${getElevatorColor(elevator.id)}`}></div>
                                <div className="font-medium">Elevator {elevator.id + 1}</div>
                                <div className="text-sm text-gray-500 ml-auto">
                                    {elevator.isMoving
                                        ? `Moving to floor ${elevator.targetFloor}`
                                        : `At floor ${elevator.currentFloor}`}
                                </div>
                            </div>

                            {!elevator.isMoving && (
                                <div className="grid grid-cols-4 gap-1">
                                    {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => (
                                        <button
                                            key={`move-${elevator.id}-${floor}`}
                                            onClick={() => moveElevator(elevator.id, floor)}
                                            disabled={floor === elevator.currentFloor}
                                            className={`px-2 py-1 text-xs rounded
                            ${floor === elevator.currentFloor
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-gray-200 hover:bg-gray-300'}`}
                                        >
                                            {floor}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ControlPanel
