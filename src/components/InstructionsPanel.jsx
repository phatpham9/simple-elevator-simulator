const InstructionsPanel = () => {
    return (
        <div className="bg-white border rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2">How to use</h2>
            
            <div className="mb-4">
                <h3 className="font-semibold text-sm text-blue-600 mb-1">Manual Mode (Default):</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click the up/down buttons next to a floor to request an elevator</li>
                    <li>Manually assign a call to a specific elevator using the buttons in the Control Panel</li>
                    <li>You can also directly send an elevator to a specific floor using the floor buttons</li>
                </ol>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-sm text-green-600 mb-1">LOOK Algorithm (Automatic):</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Select "Auto - LOOK Algorithm" from the dropdown</li>
                    <li>Click call buttons - elevator automatically assigned based on direction</li>
                    <li>Elevators move in one direction, serving all calls until no more ahead</li>
                    <li>View each elevator's queue to see upcoming stops in optimal order</li>
                </ol>
                <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-900">
                    <strong>Best for:</strong> Minimizing overall travel time, reducing direction changes. 
                    Similar to real elevator systems.
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-sm text-purple-600 mb-1">SSTF Algorithm (Automatic):</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Select "Auto - SSTF Algorithm" from the dropdown</li>
                    <li>Always serves the nearest floor next, regardless of direction</li>
                    <li>Minimizes immediate travel distance for each move</li>
                    <li>May cause longer waits for distant floors (starvation)</li>
                </ol>
                <div className="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-900">
                    <strong>Best for:</strong> Reducing immediate wait times. May be inefficient with many requests.
                    Can cause "starvation" for far floors.
                </div>
            </div>
        </div>
    )
}

export default InstructionsPanel
