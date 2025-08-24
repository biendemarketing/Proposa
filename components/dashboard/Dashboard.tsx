
import React from 'react';
import { mockKpis, mockRecentActivity } from '../../data/mockData';
import Card from '../ui/Card';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';
import { AppView, Kpi, RecentActivity } from '../../types';

const KpiCard: React.FC<{ kpi: Kpi }> = ({ kpi }) => {
    const isPositive = kpi.change >= 0;
    return (
        <Card className="p-5 relative overflow-hidden">
             {kpi.icon && kpi.iconTextColor && (
                <Icon 
                    name={kpi.icon} 
                    className={`absolute -bottom-6 -right-6 w-28 h-28 ${kpi.iconTextColor} opacity-10`}
                />
            )}
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-sm font-medium text-slate-500 truncate">{kpi.title}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-2">{kpi.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{kpi.description}</p>
                </div>
                <div className={`flex-shrink-0 flex items-center text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? (
                        <Icon name="ChevronUp" className="w-4 h-4" />
                    ) : (
                        <Icon name="ChevronDown" className="w-4 h-4" />
                    )}
                    <span className="ml-1">{Math.abs(kpi.change)}{kpi.title.includes('Tasa') ? '%' : ''}</span>
                </div>
            </div>
        </Card>
    );
};

const RecentActivityItem: React.FC<{ activity: RecentActivity }> = ({ activity }) => {
    const { navigate } = useAppContext();
    const iconMap = {
        approved: { name: 'CheckCircle', color: 'text-green-500' },
        commented: { name: 'MessageSquare', color: 'text-yellow-500' },
        viewed: { name: 'Eye', color: 'text-purple-500' }
    };
    const { name, color } = iconMap[activity.type] || { name: 'FileText', color: 'text-slate-500' };

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Icon name={name} className={`w-6 h-6 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                        La propuesta "{activity.proposalTitle}" {activity.actionText}.
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                        por {activity.clientName}
                    </p>
                </div>
                <div 
                    className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:underline cursor-pointer"
                    onClick={() => navigate(AppView.PROPOSALS, activity.proposalId)}
                >
                    Ver
                </div>
            </div>
        </li>
    );
};


const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1">Aquí tienes un resumen de la actividad de tus propuestas.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {mockKpis.map((kpi, index) => (
                    <KpiCard key={index} kpi={kpi} />
                ))}
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Actividad Reciente</h2>
                <ul className="divide-y divide-slate-200">
                    {mockRecentActivity.map(activity => (
                        <RecentActivityItem key={activity.id} activity={activity} />
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default Dashboard;