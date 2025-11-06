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
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-6 overflow-hidden hover:shadow-xl transition-shadow duration-200">
            {/* Header with Tabs */}
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="px-6 pt-4 pb-2">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Control Center
                        </h2>
                        {isAutoMode && (
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                🤖 {getAlgorithmName(schedulingMode)} Active
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-3 font-semibold transition-all duration-200 ${
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
            <div className="p-6">
                {activeTab === 'calls' && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-slate-600 text-sm">
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
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                                <div className="text-6xl mb-3">✨</div>
                                <p className="text-slate-500 font-medium">
                                    {isAutoMode 
                                        ? 'All clear! Calls are automatically assigned as they come in.'
                                        : 'No pending calls. Use the building visualization to request elevators.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {calls.map(call => (
                                    <div key={call.id} className="border-2 border-slate-200 rounded-lg p-4 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all duration-200 hover:scale-102">
                                        <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <span className="text-3xl">
                                                {call.direction === 'up' ? '⬆️' : '⬇️'}
                                            </span>
                                            <div>
                                                <div>Floor {call.floor}</div>
                                                <div className="text-xs text-slate-500 font-normal">
                                                    Going {call.direction}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-slate-600 font-medium">Assign to:</p>
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'elevators' && (
                    <div>
                        <p className="text-slate-600 text-sm mb-4">
                            Monitor and control each elevator individually
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {elevators.map(elevator => (
                                <div key={`control-${elevator.id}`} className="border-2 border-slate-200 rounded-lg p-4 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-6 h-6 rounded-full ${getElevatorColorClass(elevator.id)} shadow-md ring-2 ring-white`}></div>
                                        <div className="font-semibold text-slate-800">Elevator {elevator.id + 1}</div>
                                        <div className="text-sm text-slate-500 ml-auto font-medium bg-slate-100 px-2 py-1 rounded">
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
                                        <div>
                                            <p className="text-xs text-slate-600 mb-2 font-medium">Send to floor:</p>
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
                )}
            </div>
        </div>
    )
}

export default TabbedControlPanel
