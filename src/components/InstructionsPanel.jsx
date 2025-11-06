const InstructionsPanel = () => {
    return (
        <div className="bg-white border rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2">How to use</h2>
            <ol className="list-decimal list-inside space-y-1">
                <li>Adjust the number of floors and elevators using the controls at the top</li>
                <li>Click the up/down buttons next to a floor to request an elevator</li>
                <li>Assign a call to a specific elevator using the buttons in the Control Panel</li>
                <li>You can also directly send an elevator to a specific floor using the floor buttons</li>
            </ol>
        </div>
    )
}

export default InstructionsPanel
