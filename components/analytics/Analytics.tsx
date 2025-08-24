import React, { useState } from 'react';
import { mockGlobalAnalyticsData } from '../../data/mockData';
import Card from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, Legend, Cell, PieChart, Pie } from 'recharts';
import Icon from '../icons/Icon';

const AnalyticsKpiCard: React.FC<{ kpi: { title: string; value: string; icon: string; iconTextColor: string;} }> = ({ kpi }) => (
    <Card className="p-5 relative overflow-hidden">
        <Icon 
            name={kpi.icon} 
            className={`absolute -bottom-4 -right-4 w-24 h-24 ${kpi.iconTextColor} opacity-10`}
        />
        <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500">{kpi.title}</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">{kpi.value}</p>
        </div>
    </Card>
);


const Analytics: React.FC = () => {
    const [dateRange, setDateRange] = useState('30d');

    const kpiData = [
        { title: 'Valor Promedio / Prop.', value: '$8,500', icon: 'DollarSign', iconTextColor: 'text-green-500' },
        { title: 'Ciclo de Cierre Prom.', value: '14 días', icon: 'Clock', iconTextColor: 'text-yellow-500' },
        { title: 'Ingresos Totales', value: '$65,400', icon: 'BarChart', iconTextColor: 'text-blue-500' },
        { title: 'Tasa de Éxito', value: '62%', icon: 'CheckCircle', iconTextColor: 'text-indigo-500' }
    ];

    const COLORS = ['#4f46e5', '#818cf8', '#a78bfa', '#c4b5fd', '#60a5fa', '#f87171'];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">Analíticas Globales</h1>
                    <p className="text-slate-500 mt-1">Obtén una visión completa del rendimiento de tu negocio.</p>
                </div>
                <div className="relative">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="appearance-none w-full sm:w-auto bg-white text-slate-800 border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="30d">Últimos 30 días</option>
                        <option value="90d">Últimos 3 meses</option>
                        <option value="year">Este año</option>
                    </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <Icon name="ChevronDown" className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => (
                    <AnalyticsKpiCard key={kpi.title} kpi={kpi} />
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="p-6 lg:col-span-3">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Propuestas a lo Largo del Tiempo</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockGlobalAnalyticsData.proposalsOverTime}>
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                            <Legend />
                            <Bar dataKey="sent" fill="#818cf8" name="Enviadas" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="approved" fill="#4f46e5" name="Aprobadas" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="p-6 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Distribución por Estado</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockGlobalAnalyticsData.statusDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                legendType="circle"
                            >
                                {mockGlobalAnalyticsData.statusDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip />
                             <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
             <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Rendimiento por Cliente (Valor Aprobado)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockGlobalAnalyticsData.topClients}>
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" tickFormatter={(value: number) => `$${value/1000}k`} />
                        <Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value: number) => `$${value.toLocaleString()}`} />
                         <Bar dataKey="value" name="Valor Aprobado" radius={[4, 4, 0, 0]}>
                            {mockGlobalAnalyticsData.topClients.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default Analytics;