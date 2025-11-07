import { getElevatorColorClass } from '../utils/elevatorUtils'

const TabbedControlPanel = ({ elevators, moveElevator, numFloors, isAutoMode, schedulingMode }) => {
    // Removed calls and assignCall since they moved to the sidebar

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
        <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            🛗 Elevator Controls
                        </h2>
                        {isAutoMode && (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                🤖 {getAlgorithmName(schedulingMode)} Active
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-slate-600 text-xs mb-3">
                    Monitor and control each elevator individually
                </p>
                <div className="flex gap-3">
                    {elevators.map(elevator => (
                        <div key={`control-${elevator.id}`} className="flex-1 border border-slate-200 rounded-lg p-3 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-5 h-5 rounded-full ${getElevatorColorClass(elevator.id)} shadow-sm ring-2 ring-white`}></div>
                                <div className="font-semibold text-slate-800 text-sm">Elevator {elevator.id + 1}</div>
                                <div className="text-xs text-slate-500 ml-auto font-medium bg-slate-100 px-2 py-0.5 rounded">
                                    {elevator.isMoving
                                        ? `→ ${elevator.targetFloor}`
                                        : `@ ${elevator.currentFloor}`}
                                </div>
                            </div>
                                    {/* Show queue in auto mode */}
                                    {isAutoMode && elevator.queue && elevator.queue.length > 0 && (
                                        <div className="mb-2 p-2 bg-blue-50 border border-blue-100 rounded shadow-sm">
                                            <div className="font-semibold text-blue-900 mb-1.5 text-xs">📋 Queue:</div>
                                            <div className="flex flex-wrap gap-1">
                                                {elevator.queue.map((queueItem, idx) => {
                                                    const floor = queueItem.floor || queueItem
                                                    const callDir = queueItem.callDirection
                                                    return (
                                                        <span 
                                                            key={`queue-${elevator.id}-${idx}`}
                                                            className={`px-2 py-0.5 rounded text-xs font-medium transition-all duration-200 ${
                                                                idx === 0 
                                                                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-200' 
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
                                        <div>
                                            <p className="text-xs text-slate-600 mb-1.5 font-medium">Send to floor:</p>
                                            <div className="grid grid-cols-4 gap-1">
                                                {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => {
                                                    const isInQueue = isAutoMode && elevator.queue.some(q => (q.floor || q) === floor)
                                                    return (
                                                        <button
                                                            key={`move-${elevator.id}-${floor}`}
                                                            onClick={() => moveElevator(elevator.id, floor)}
                                                            disabled={floor === elevator.currentFloor || isInQueue}
                                                            className={`px-2 py-1 text-xs rounded font-medium transition-all duration-200
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
                                        </div>
                                    )}

                                    {/* Status message for auto mode */}
                                    {isAutoMode && elevator.isMoving && (
                                        <div className="mt-2 text-xs text-slate-600 font-medium text-center bg-slate-50 py-1.5 rounded border border-slate-200">
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

export default TabbedControlPanel
