const ConfigurationPanel = ({ numFloors, setNumFloors, numElevators, setNumElevators, schedulingMode, setSchedulingMode }) => {
    return (
        <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow mb-6">
            <div>
                <label className="block text-sm font-medium mb-1">Floors (2-24):</label>
                <input
                    type="number"
                    min="2"
                    max="24"
                    value={numFloors}
                    onChange={e => setNumFloors(Math.min(24, Math.max(2, parseInt(e.target.value) || 2)))}
                    className="border rounded p-2 w-24"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Elevators (2-12):</label>
                <input
                    type="number"
                    min="2"
                    max="12"
                    value={numElevators}
                    onChange={e => setNumElevators(Math.min(12, Math.max(2, parseInt(e.target.value) || 2)))}
                    className="border rounded p-2 w-24"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Scheduling Mode:</label>
                <select
                    value={schedulingMode}
                    onChange={e => setSchedulingMode(e.target.value)}
                    className="border rounded p-2 min-w-[180px] cursor-pointer bg-white hover:border-gray-400 transition-colors h-[42px]"
                >
                    <option value="manual">Manual Assignment</option>
                    <option value="look">Auto - LOOK Algorithm</option>
                    <option value="sstf">Auto - SSTF Algorithm</option>
                </select>
            </div>
        </div>
    )
}

export default ConfigurationPanel
