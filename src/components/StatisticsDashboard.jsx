import { useEffect, useState } from 'react'

const StatisticsDashboard = ({ elevators, calls, isAutoMode }) => {
    const [stats, setStats] = useState({
        totalTrips: 0,
        activeElevators: 0,
        pendingCalls: 0,
        idleElevators: 0
    })

    useEffect(() => {
        const activeElevators = elevators.filter(e => e.isMoving).length
        const idleElevators = elevators.filter(e => !e.isMoving).length
        const totalTrips = elevators.reduce((sum, e) => {
            // Count queue length as potential trips
            return sum + (e.queue ? e.queue.length : 0)
        }, 0)

        setStats({
            totalTrips,
            activeElevators,
            pendingCalls: calls.length,
            idleElevators
        })
    }, [elevators, calls])

    const statCards = [
        {
            label: 'Active Elevators',
            value: stats.activeElevators,
            total: elevators.length,
            icon: '🚀',
            color: 'blue',
            description: 'Currently moving'
        },
        {
            label: 'Idle Elevators',
            value: stats.idleElevators,
            total: elevators.length,
            icon: '💤',
            color: 'slate',
            description: 'Waiting for requests'
        },
        {
            label: 'Pending Calls',
            value: stats.pendingCalls,
            icon: '📞',
            color: 'amber',
            description: isAutoMode ? 'Being processed' : 'Awaiting assignment'
        },
        {
            label: 'Queued Stops',
            value: stats.totalTrips,
            icon: '📋',
            color: 'green',
            description: 'Scheduled destinations'
        }
    ]

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-700',
                icon: 'text-blue-600'
            },
            slate: {
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                text: 'text-slate-700',
                icon: 'text-slate-600'
            },
            amber: {
                bg: 'bg-amber-50',
                border: 'border-amber-200',
                text: 'text-amber-700',
                icon: 'text-amber-600'
            },
            green: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-700',
                icon: 'text-green-600'
            }
        }
        return colors[color] || colors.blue
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    📊 System Statistics
                </h2>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    Live
                </span>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {statCards.map((stat, index) => {
                    const colors = getColorClasses(stat.color)
                    return (
                        <div
                            key={index}
                            className={`${colors.bg} ${colors.border} border rounded-lg p-3 transition-all duration-200 hover:shadow-md`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-2xl ${colors.icon}`}>{stat.icon}</span>
                                {stat.total !== undefined && (
                                    <span className="text-xs text-slate-500">
                                        /{stat.total}
                                    </span>
                                )}
                            </div>
                            <div className={`text-2xl font-bold ${colors.text}`}>
                                {stat.value}
                            </div>
                            <div className="text-xs font-semibold text-slate-700">
                                {stat.label}
                            </div>
                            <div className="text-xs text-slate-500">
                                {stat.description}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Additional System Info - Compact */}
            <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-4 gap-3 text-center">
                    <div>
                        <div className="text-xs text-slate-500">Mode</div>
                        <div className="text-xs font-semibold text-slate-700">
                            {isAutoMode ? '🤖 Auto' : '👆 Manual'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500">Units</div>
                        <div className="text-xs font-semibold text-slate-700">
                            {elevators.length}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500">Efficiency</div>
                        <div className="text-xs font-semibold text-slate-700">
                            {elevators.length > 0 
                                ? Math.round((stats.activeElevators / elevators.length) * 100)
                                : 0}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500">Status</div>
                        <div className="text-xs font-semibold text-slate-700">
                            {stats.pendingCalls > 0 ? '🟡 Busy' : '🟢 Ready'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticsDashboard
