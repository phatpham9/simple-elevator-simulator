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
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    📊 System Statistics
                </h2>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Live Updates
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                    const colors = getColorClasses(stat.color)
                    return (
                        <div
                            key={index}
                            className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-105`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-3xl ${colors.icon}`}>{stat.icon}</span>
                                {stat.total !== undefined && (
                                    <span className="text-xs text-slate-500">
                                        of {stat.total}
                                    </span>
                                )}
                            </div>
                            <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                                {stat.value}
                                {stat.total !== undefined && (
                                    <span className="text-lg text-slate-400">/{stat.total}</span>
                                )}
                            </div>
                            <div className="text-sm font-semibold text-slate-700 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-slate-500">
                                {stat.description}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Additional System Info */}
            <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-xs text-slate-500 mb-1">System Mode</div>
                        <div className="text-sm font-semibold text-slate-700">
                            {isAutoMode ? '🤖 Automatic' : '👆 Manual'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 mb-1">Total Elevators</div>
                        <div className="text-sm font-semibold text-slate-700">
                            {elevators.length} Units
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 mb-1">Efficiency</div>
                        <div className="text-sm font-semibold text-slate-700">
                            {elevators.length > 0 
                                ? Math.round((stats.activeElevators / elevators.length) * 100)
                                : 0}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 mb-1">Status</div>
                        <div className="text-sm font-semibold text-slate-700">
                            {stats.pendingCalls > 0 ? '🟡 Busy' : '🟢 Ready'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticsDashboard
