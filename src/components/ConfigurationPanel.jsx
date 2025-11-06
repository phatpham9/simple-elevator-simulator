const ConfigurationPanel = ({ numFloors, setNumFloors, numElevators, setNumElevators, schedulingMode, setSchedulingMode }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Configuration</h2>
            <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Floors <span className="text-slate-400">(2-24)</span>
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="24"
                        value={numFloors}
                        onChange={e => setNumFloors(Math.min(24, Math.max(2, parseInt(e.target.value) || 2)))}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-400"
                    />
                </div>

                <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Elevators <span className="text-slate-400">(2-12)</span>
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="12"
                        value={numElevators}
                        onChange={e => setNumElevators(Math.min(12, Math.max(2, parseInt(e.target.value) || 2)))}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-400"
                    />
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Scheduling Algorithm
                    </label>
                    <select
                        value={schedulingMode}
                        onChange={e => setSchedulingMode(e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 font-medium bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-400 shadow-sm"
                    >
                        <option value="manual">Manual Assignment</option>
                        <option value="look">🤖 Auto - LOOK Algorithm</option>
                        <option value="sstf">🤖 Auto - SSTF Algorithm</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ConfigurationPanel
