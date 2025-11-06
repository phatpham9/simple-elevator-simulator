const HeroSection = ({ schedulingMode, setSchedulingMode }) => {
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

    const info = getAlgorithmInfo(schedulingMode)
    
    return (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px),
                                     repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)`
                }} />
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <span className="text-5xl">{info.emoji}</span>
                            <span>Elevator Simulator</span>
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Experience different elevator scheduling algorithms in action
                        </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        info.color === 'green' ? 'bg-green-500' :
                        info.color === 'purple' ? 'bg-purple-500' :
                        'bg-blue-500'
                    } shadow-lg`}>
                        {info.badge}
                    </span>
                </div>

                {/* Algorithm Selector */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <label className="block text-sm font-semibold text-blue-100 mb-3">
                        🎛️ Select Algorithm
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['manual', 'look', 'sstf'].map((mode) => {
                            const modeInfo = getAlgorithmInfo(mode)
                            const isActive = schedulingMode === mode
                            return (
                                <button
                                    key={mode}
                                    onClick={() => setSchedulingMode(mode)}
                                    className={`text-left p-4 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-white text-slate-800 shadow-xl scale-105 ring-4 ring-white/50'
                                            : 'bg-white/20 text-white hover:bg-white/30 hover:scale-102'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{modeInfo.emoji}</span>
                                        <span className="font-bold">{modeInfo.name}</span>
                                    </div>
                                    <p className={`text-xs ${isActive ? 'text-slate-600' : 'text-blue-100'}`}>
                                        {modeInfo.description}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Current Algorithm Info */}
                <div className="mt-4 text-center">
                    <p className="text-blue-100 text-sm">
                        Currently using: <span className="font-bold text-white">{info.name}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
