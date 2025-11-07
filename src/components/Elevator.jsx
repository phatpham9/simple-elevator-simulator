import { useState } from 'react'
import { useElevatorSystem } from '../hooks/useElevatorSystem'
import BuildingVisualization from './BuildingVisualization'
import TabbedControlPanel from './TabbedControlPanel'
import CollapsibleSidebar from './CollapsibleSidebar'
import ConfigPanel from './ConfigPanel'
import StatisticsDashboard from './StatisticsDashboard'

const Elevator = () => {
    // Configuration state
    const [numFloors, setNumFloors] = useState(5)
    const [numElevators, setNumElevators] = useState(3)
    const [schedulingMode, setSchedulingMode] = useState('manual')

    // Use custom hook for elevator system logic
    const { elevators, calls, callElevator, moveElevator, assignCall, autoAssignCalls } = useElevatorSystem(numFloors, numElevators, schedulingMode)
    
    const isAutoMode = schedulingMode !== 'manual'

    return (
        <div className="p-3 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 min-h-screen">
            {/* Collapsible Settings Sidebar */}
            <CollapsibleSidebar>
                <ConfigPanel 
                    schedulingMode={schedulingMode}
                    setSchedulingMode={setSchedulingMode}
                    numFloors={numFloors}
                    setNumFloors={setNumFloors}
                    numElevators={numElevators}
                    setNumElevators={setNumElevators}
                />
            </CollapsibleSidebar>

            <div className="max-w-7xl mx-auto space-y-4">
                {/* Compact Header */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <span className="text-3xl">🛗</span>
                                <span>Elevator Simulator</span>
                            </h1>
                            <p className="text-blue-100 text-sm mt-1">
                                {schedulingMode === 'manual' ? '👆 Manual Mode' : 
                                 schedulingMode === 'look' ? '🎯 LOOK Algorithm' : 
                                 '⚡ SSTF Algorithm'} • {numFloors} Floors • {numElevators} Elevators
                            </p>
                        </div>
                        <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                schedulingMode === 'look' ? 'bg-green-500' :
                                schedulingMode === 'sstf' ? 'bg-purple-500' :
                                'bg-blue-500'
                            } shadow-lg`}>
                                {schedulingMode === 'manual' ? 'Manual' : 
                                 schedulingMode === 'look' ? 'Optimized' : 
                                 'Fast Response'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Statistics Dashboard - Compact */}
                <StatisticsDashboard 
                    elevators={elevators}
                    calls={calls}
                    isAutoMode={isAutoMode}
                />

                {/* Building Visualization */}
                <BuildingVisualization
                    numFloors={numFloors}
                    numElevators={numElevators}
                    elevators={elevators}
                    calls={calls}
                    callElevator={callElevator}
                />

                {/* Tabbed Control Panel */}
                <TabbedControlPanel
                    calls={calls}
                    elevators={elevators}
                    assignCall={assignCall}
                    moveElevator={moveElevator}
                    numFloors={numFloors}
                    isAutoMode={isAutoMode}
                    autoAssignCalls={autoAssignCalls}
                    schedulingMode={schedulingMode}
                />
            </div>
        </div>
    )
}

export default Elevator
