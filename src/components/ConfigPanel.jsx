const ConfigPanel = ({ 
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
                <h2 className="text-xl font-bold mb-3 text-slate-800 flex items-center gap-2">
                    🎛️ Algorithm Selection
                </h2>
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
                <h2 className="text-xl font-bold mb-3 text-slate-800 flex items-center gap-2">
                    ⚙️ Building Configuration
                </h2>
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

            {/* Instructions Section */}
            <div className="pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold mb-3 text-slate-800 flex items-center gap-2">
                    📖 Instructions
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-sm text-blue-700 mb-2 flex items-center gap-2">
                            🔵 Manual Mode:
                        </h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 ml-2">
                            <li>Click up/down buttons to request an elevator</li>
                            <li>Assign calls to elevators in Control Panel</li>
                            <li>Send elevators directly to specific floors</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-2">
                            🟢 LOOK Algorithm:
                        </h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 ml-2">
                            <li>Automatically assigns elevators by direction</li>
                            <li>Serves all calls in one direction first</li>
                            <li>Minimizes direction changes</li>
                        </ol>
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-900">
                            <strong>💡 Best for:</strong> Overall efficiency
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm text-purple-700 mb-2 flex items-center gap-2">
                            🟣 SSTF Algorithm:
                        </h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 ml-2">
                            <li>Always serves nearest floor next</li>
                            <li>Minimizes immediate travel distance</li>
                            <li>May cause longer waits for distant floors</li>
                        </ol>
                        <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-900">
                            <strong>💡 Best for:</strong> Quick response times
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                        <h3 className="font-semibold text-sm text-slate-700 mb-2">
                            💡 Tips:
                        </h3>
                        <ul className="space-y-1 text-xs text-slate-700">
                            <li className="flex gap-2">
                                <span>•</span>
                                <span>Monitor system performance in Statistics Dashboard</span>
                            </li>
                            <li className="flex gap-2">
                                <span>•</span>
                                <span>Use tabbed Control Panel to manage calls and elevators</span>
                            </li>
                            <li className="flex gap-2">
                                <span>•</span>
                                <span>Click settings button (⚙️) to access this panel anytime</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigPanel
