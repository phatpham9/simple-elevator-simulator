import { useState } from 'react'
import { getElevatorColorClass } from '../utils/elevatorUtils'

const TabbedControlPanel = ({ calls, elevators, assignCall, moveElevator, numFloors, isAutoMode, autoAssignCalls, schedulingMode }) => {
    const [activeTab, setActiveTab] = useState('calls')

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
    
    const tabs = [
        { id: 'calls', label: 'Pending Calls', icon: '📞', count: calls.length },
        { id: 'elevators', label: 'Elevator Controls', icon: '🛗', count: elevators.length }
    ]

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Header with Tabs */}
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="px-4 pt-3 pb-2">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-slate-800">
                            Control Center
                        </h2>
                        {isAutoMode && (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                🤖 {getAlgorithmName(schedulingMode)} Active
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-4 py-2 font-semibold transition-all duration-200 text-sm ${
                                activeTab === tab.id
                                    ? 'text-blue-600'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    activeTab === tab.id
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {tab.count}
                                </span>
                            </span>
                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {activeTab === 'calls' && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-slate-600 text-xs">
                                {calls.length > 0 
                                    ? `${calls.length} call${calls.length !== 1 ? 's' : ''} waiting to be ${isAutoMode ? 'processed' : 'assigned'}`
                                    : 'No pending calls at the moment'
                                }
                            </p>
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
                            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-2">✨</div>
                                <p className="text-slate-500 text-sm">
                                    {isAutoMode 
                                        ? 'All clear! Calls are automatically assigned.'
                                        : 'No pending calls. Use the building visualization to request elevators.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {calls.map(call => (
                                    <div key={call.id} className="border border-slate-200 rounded-lg p-3 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all duration-200">
                                        <div className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                            <span className="text-2xl">
                                                {call.direction === 'up' ? '⬆️' : '⬇️'}
                                            </span>
                                            <div>
                                                <div className="text-sm">Floor {call.floor}</div>
                                                <div className="text-xs text-slate-500 font-normal">
                                                    Going {call.direction}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-slate-600 font-medium">Assign to:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {elevators.map(elev => (
                                                    <button
                                                        key={`assign-${call.id}-${elev.id}`}
                                                        onClick={() => assignCall(call.id, elev.id)}
                                                        className={`px-2 py-1 text-xs font-medium rounded ${getElevatorColorClass(elev.id)} text-white hover:opacity-90 transition-all duration-200 shadow-sm`}
                                                    >
                                                        E{elev.id + 1} <span className="opacity-75">@{elev.currentFloor}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'elevators' && (
                    <div>
                        <p className="text-slate-600 text-xs mb-3">
                            Monitor and control each elevator individually
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {elevators.map(elevator => (
                                <div key={`control-${elevator.id}`} className="border border-slate-200 rounded-lg p-3 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow duration-200">
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
                )}
            </div>
        </div>
    )
}

export default TabbedControlPanel
