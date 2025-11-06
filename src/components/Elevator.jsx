import { useState } from 'react'
import { useElevatorSystem } from '../hooks/useElevatorSystem'
import ConfigurationPanel from './ConfigurationPanel'
import BuildingVisualization from './BuildingVisualization'
import ControlPanel from './ControlPanel'
import InstructionsPanel from './InstructionsPanel'

const Elevator = () => {
    // Configuration state
    const [numFloors, setNumFloors] = useState(5)
    const [numElevators, setNumElevators] = useState(3)
    const [schedulingMode, setSchedulingMode] = useState('manual')

    // Use custom hook for elevator system logic
    const { elevators, calls, callElevator, moveElevator, assignCall, autoAssignCalls } = useElevatorSystem(numFloors, numElevators, schedulingMode)
    
    const isAutoMode = schedulingMode !== 'manual'

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Elevator Simulator</h1>

                <ConfigurationPanel 
                    numFloors={numFloors}
                    setNumFloors={setNumFloors}
                    numElevators={numElevators}
                    setNumElevators={setNumElevators}
                    schedulingMode={schedulingMode}
                    setSchedulingMode={setSchedulingMode}
                />

                <BuildingVisualization
                    numFloors={numFloors}
                    numElevators={numElevators}
                    elevators={elevators}
                    calls={calls}
                    callElevator={callElevator}
                />

                <ControlPanel
                    calls={calls}
                    elevators={elevators}
                    assignCall={assignCall}
                    moveElevator={moveElevator}
                    numFloors={numFloors}
                    isAutoMode={isAutoMode}
                    autoAssignCalls={autoAssignCalls}
                    schedulingMode={schedulingMode}
                />

                <InstructionsPanel />
            </div>
        </div>
    )
}

export default Elevator
