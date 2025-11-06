import { useState } from 'react'
import { useElevatorSystem } from '../hooks/useElevatorSystem'
import ConfigurationPanel from './ConfigurationPanel'
import BuildingVisualization from './BuildingVisualization'
import TabbedControlPanel from './TabbedControlPanel'
import InstructionsPanel from './InstructionsPanel'
import HeroSection from './HeroSection'
import CollapsibleSidebar from './CollapsibleSidebar'
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
        <div className="p-4 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 min-h-screen">
            {/* Collapsible Instructions Sidebar */}
            <CollapsibleSidebar>
                <InstructionsPanel />
            </CollapsibleSidebar>

            <div className="max-w-7xl mx-auto">
                {/* Hero Section with Algorithm Selector */}
                <HeroSection 
                    schedulingMode={schedulingMode}
                    setSchedulingMode={setSchedulingMode}
                />

                {/* Configuration Panel */}
                <ConfigurationPanel 
                    numFloors={numFloors}
                    setNumFloors={setNumFloors}
                    numElevators={numElevators}
                    setNumElevators={setNumElevators}
                />

                {/* Statistics Dashboard */}
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
