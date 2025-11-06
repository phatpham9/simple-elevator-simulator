import { getElevatorColorClass } from '../utils/elevatorUtils'

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
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
                Control Panel
                {isAutoMode && (
                    <span className="ml-3 text-base font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        🤖 {getAlgorithmName(schedulingMode)} Active
                    </span>
                )}
            </h2>
            <p className="text-slate-500 text-sm mb-6">Monitor elevator status and manage pending calls</p>

            {/* Pending Calls Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-700">
                        Pending Calls
                        <span className="ml-2 text-sm font-normal text-slate-500">({calls.length})</span>
                    </h3>
                    {isAutoMode && calls.length > 0 && (
                        <button
                            onClick={autoAssignCalls}
                            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            ⚡ Auto-Assign All
                        </button>
                    )}
                </div>
                {calls.length === 0 ? (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                        <p className="text-slate-400">
                            {isAutoMode 
                                ? '✨ No pending calls - calls are automatically assigned'
                                : '📞 No pending calls'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {calls.map(call => (
                            <div key={call.id} className="border-2 border-slate-200 rounded-lg p-4 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow duration-200">
                                <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">
                                        {call.direction === 'up' ? '⬆️' : '⬇️'}
                                    </span>
                                    Floor {call.floor}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {elevators.map(elev => (
                                        <button
                                            key={`assign-${call.id}-${elev.id}`}
                                            onClick={() => assignCall(call.id, elev.id)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${getElevatorColorClass(elev.id)} text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-sm`}
                                        >
                                            E{elev.id + 1} <span className="opacity-75">@{elev.currentFloor}</span>
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
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Elevator Status & Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {elevators.map(elevator => (
                        <div key={`control-${elevator.id}`} className="border-2 border-slate-200 rounded-lg p-4 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-5 h-5 rounded-full ${getElevatorColorClass(elevator.id)} shadow-md ring-2 ring-white`}></div>
                                <div className="font-semibold text-slate-800">Elevator {elevator.id + 1}</div>
                                <div className="text-sm text-slate-500 ml-auto font-medium">
                                    {elevator.isMoving
                                        ? `→ ${elevator.targetFloor}`
                                        : `@ ${elevator.currentFloor}`}
                                </div>
                            </div>

                            {/* Show queue in auto mode */}
                            {isAutoMode && elevator.queue && elevator.queue.length > 0 && (
                                <div className="mb-3 p-3 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                                    <div className="font-semibold text-blue-900 mb-2 text-xs">📋 Queue:</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {elevator.queue.map((queueItem, idx) => {
                                            const floor = queueItem.floor || queueItem
                                            const callDir = queueItem.callDirection
                                            return (
                                                <span 
                                                    key={`queue-${elevator.id}-${idx}`}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                                                        idx === 0 
                                                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200' 
                                                            : 'bg-blue-100 text-blue-900 border border-blue-200'
                                                    }`}
                                                >
                                                    {floor}{callDir ? (callDir === 'up' ? '↑' : '↓') : ''}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Manual controls - only show when not moving or not in auto mode */}
                            {(!isAutoMode || !elevator.isMoving) && (
                                <div className="grid grid-cols-4 gap-1.5">
                                    {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => {
                                        const isInQueue = isAutoMode && elevator.queue.some(q => (q.floor || q) === floor)
                                        return (
                                            <button
                                                key={`move-${elevator.id}-${floor}`}
                                                onClick={() => moveElevator(elevator.id, floor)}
                                                disabled={floor === elevator.currentFloor || isInQueue}
                                                className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all duration-200
                            ${floor === elevator.currentFloor
                                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                                                        : isInQueue
                                                            ? 'bg-blue-100 text-blue-400 cursor-not-allowed border border-blue-200'
                                                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm active:scale-95'}`}
                                            >
                                                {floor}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Status message for auto mode */}
                            {isAutoMode && elevator.isMoving && (
                                <div className="mt-3 text-xs text-slate-600 font-medium text-center bg-slate-50 py-2 rounded-lg border border-slate-200">
                                    {elevator.direction === 'up' ? '⬆️' : '⬇️'} Moving {elevator.direction}...
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
