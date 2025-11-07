const AlgorithmAndBuildingPanel = ({ 
    schedulingMode, 
    setSchedulingMode, 
    numFloors, 
    setNumFloors, 
    numElevators, 
    setNumElevators 
}) => {
    const getAlgorithmInfo = (mode) => {
        switch (mode) {
            case 'look':
                return {
                    name: 'LOOK Algorithm',
                    emoji: '🎯',
                    color: 'green',
                    description: 'Efficient directional scheduling - serves all calls in one direction before reversing',
                    badge: 'Optimized'
                }
            case 'sstf':
                return {
                    name: 'SSTF Algorithm',
                    emoji: '⚡',
                    color: 'purple',
                    description: 'Shortest Seek Time First - always serves the nearest floor next',
                    badge: 'Fast Response'
                }
            default:
                return {
                    name: 'Manual Mode',
                    emoji: '👆',
                    color: 'blue',
                    description: 'Full manual control - you assign each call to specific elevators',
                    badge: 'Manual'
                }
        }
    }

    return (
        <div className="space-y-6">
            {/* Algorithm Selection Section */}
            <div>
                <h3 className="text-base font-bold mb-3 text-slate-800 flex items-center gap-2">
                    🎛️ Algorithm Selection
                </h3>
                <div className="space-y-3">
                    {['manual', 'look', 'sstf'].map((mode) => {
                        const modeInfo = getAlgorithmInfo(mode)
                        const isActive = schedulingMode === mode
                        return (
                            <button
                                key={mode}
                                onClick={() => setSchedulingMode(mode)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl">{modeInfo.emoji}</span>
                                    <span className="font-semibold text-sm">{modeInfo.name}</span>
                                    {isActive && (
                                        <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">
                                            Active
                                        </span>
                                    )}
                                </div>
                                <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                                    {modeInfo.description}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Building Configuration Section */}
            <div className="pt-4 border-t border-slate-200">
                <h3 className="text-base font-bold mb-3 text-slate-800 flex items-center gap-2">
                    ⚙️ Building Configuration
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            🏢 Number of Floors
                        </label>
                        <input
                            type="number"
                            min="2"
                            max="24"
                            value={numFloors}
                            onChange={e => setNumFloors(Math.min(24, Math.max(2, parseInt(e.target.value) || 2)))}
                            className="w-full border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Range: 2-24 floors</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            🛗 Number of Elevators
                        </label>
                        <input
                            type="number"
                            min="2"
                            max="12"
                            value={numElevators}
                            onChange={e => setNumElevators(Math.min(12, Math.max(2, parseInt(e.target.value) || 2)))}
                            className="w-full border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Range: 2-12 elevators</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlgorithmAndBuildingPanel
