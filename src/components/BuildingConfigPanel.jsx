const BuildingConfigPanel = ({ numFloors, setNumFloors, numElevators, setNumElevators }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚙️</span>
                <h2 className="text-xl font-semibold text-slate-700">Building Configuration</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">Customize the building structure</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        🏢 Number of Floors <span className="text-slate-400">(2-24)</span>
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="24"
                        value={numFloors}
                        onChange={e => setNumFloors(Math.min(24, Math.max(2, parseInt(e.target.value) || 2)))}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-400"
                    />
                    <p className="text-xs text-slate-500 mt-2">Height of the building</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        🛗 Number of Elevators <span className="text-slate-400">(2-12)</span>
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="12"
                        value={numElevators}
                        onChange={e => setNumElevators(Math.min(12, Math.max(2, parseInt(e.target.value) || 2)))}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-400"
                    />
                    <p className="text-xs text-slate-500 mt-2">Number of elevator cars</p>
                </div>
            </div>
        </div>
    )
}

export default BuildingConfigPanel
