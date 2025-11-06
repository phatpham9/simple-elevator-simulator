import { getElevatorColor } from '../utils/elevatorUtils'

const ControlPanel = ({ calls, elevators, assignCall, moveElevator, numFloors, isAutoMode, autoAssignCalls, schedulingMode }) => {
    const getAlgorithmName = (mode) => {
        switch (mode) {
            case 'look':
                return 'LOOK'
            case 'sstf':
                return 'SSTF'
            default:
                return ''
        }
    }
    
    return (
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-bold mb-3">
                Control Panel
                {isAutoMode && (
                    <span className="ml-2 text-sm font-normal text-green-600">
                        ({getAlgorithmName(schedulingMode)} Algorithm Active)
                    </span>
                )}
            </h2>

            {/* Pending Calls Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Pending Calls ({calls.length})</h3>
                    {isAutoMode && calls.length > 0 && (
                        <button
                            onClick={autoAssignCalls}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Auto-Assign All
                        </button>
                    )}
                </div>
                {calls.length === 0 ? (
                    <p className="text-gray-500 italic">
                        {isAutoMode 
                            ? 'No pending calls - calls are automatically assigned'
                            : 'No pending calls'}
                    </p>
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
                                            className={`px-2 py-1 text-xs rounded-full ${getElevatorColor(elev.id)} text-white hover:opacity-90`}
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
                <h3 className="font-medium mb-2">Elevator Status & Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {elevators.map(elevator => (
                        <div key={`control-${elevator.id}`} className="border rounded p-3 bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-4 h-4 rounded-full ${getElevatorColor(elevator.id)}`}></div>
                                <div className="font-medium">Elevator {elevator.id + 1}</div>
                                <div className="text-xs text-gray-500 ml-auto">
                                    {elevator.isMoving
                                        ? `→ ${elevator.targetFloor}`
                                        : `@ ${elevator.currentFloor}`}
                                </div>
                            </div>

                            {/* Show queue in auto mode */}
                            {isAutoMode && elevator.queue && elevator.queue.length > 0 && (
                                <div className="mb-2 p-2 bg-blue-50 rounded text-xs">
                                    <div className="font-medium text-blue-900 mb-1">Queue:</div>
                                    <div className="flex flex-wrap gap-1">
                                        {elevator.queue.map((floor, idx) => (
                                            <span 
                                                key={`queue-${elevator.id}-${idx}`}
                                                className={`px-2 py-0.5 rounded ${
                                                    idx === 0 
                                                        ? 'bg-blue-600 text-white font-medium' 
                                                        : 'bg-blue-200 text-blue-900'
                                                }`}
                                            >
                                                {floor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Manual controls - only show when not moving or not in auto mode */}
                            {(!isAutoMode || !elevator.isMoving) && (
                                <div className="grid grid-cols-4 gap-1">
                                    {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => (
                                        <button
                                            key={`move-${elevator.id}-${floor}`}
                                            onClick={() => moveElevator(elevator.id, floor)}
                                            disabled={floor === elevator.currentFloor || (isAutoMode && elevator.queue.includes(floor))}
                                            className={`px-2 py-1 text-xs rounded
                            ${floor === elevator.currentFloor
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : isAutoMode && elevator.queue.includes(floor)
                                                        ? 'bg-blue-200 cursor-not-allowed'
                                                        : 'bg-gray-200 hover:bg-gray-300'}`}
                                        >
                                            {floor}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Status message for auto mode */}
                            {isAutoMode && elevator.isMoving && (
                                <div className="mt-2 text-xs text-gray-500 italic text-center">
                                    {elevator.direction === 'up' ? '↑' : '↓'} Moving {elevator.direction}...
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
