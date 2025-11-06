const InstructionsPanel = () => {
    return (
        <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                📖 How to use
            </h2>
            
            <div className="mb-6">
                <h3 className="font-semibold text-base text-blue-700 mb-2 flex items-center gap-2">
                    🔵 Manual Mode (Default):
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 ml-2">
                    <li>Click the up/down buttons next to a floor to request an elevator</li>
                    <li>Manually assign a call to a specific elevator using the buttons in the Control Panel</li>
                    <li>You can also directly send an elevator to a specific floor using the floor buttons</li>
                </ol>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-base text-green-700 mb-2 flex items-center gap-2">
                    🟢 LOOK Algorithm (Automatic):
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 ml-2">
                    <li>Select "Auto - LOOK Algorithm" from the dropdown</li>
                    <li>Click call buttons - elevator automatically assigned based on direction</li>
                    <li>Elevators move in one direction, serving all calls until no more ahead</li>
                    <li>View each elevator's queue to see upcoming stops in optimal order</li>
                </ol>
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 shadow-sm">
                    <strong className="text-green-800">💡 Best for:</strong> Minimizing overall travel time, reducing direction changes. 
                    Similar to real elevator systems.
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-base text-purple-700 mb-2 flex items-center gap-2">
                    🟣 SSTF Algorithm (Automatic):
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 ml-2">
                    <li>Select "Auto - SSTF Algorithm" from the dropdown</li>
                    <li>Always serves the nearest floor next, regardless of direction</li>
                    <li>Minimizes immediate travel distance for each move</li>
                    <li>May cause longer waits for distant floors (starvation)</li>
                </ol>
                <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900 shadow-sm">
                    <strong className="text-purple-800">💡 Best for:</strong> Reducing immediate wait times. May be inefficient with many requests.
                    Can cause "starvation" for far floors.
                </div>
            </div>
        </div>
    )
}

export default InstructionsPanel
