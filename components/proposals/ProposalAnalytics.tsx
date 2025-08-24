
import React from 'react';
import { mockProposals, mockAnalyticsData } from '../../data/mockData';
import Card from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';
import { AppView } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

interface ProposalAnalyticsProps {
    proposalId: number;
}

const ProposalAnalytics: React.FC<ProposalAnalyticsProps> = ({ proposalId }) => {
    const { navigate } = useAppContext();
    const proposal = mockProposals.find(p => p.id === proposalId);

    if (!proposal) {
        return <div>Propuesta no encontrada.</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                 <button onClick={() => navigate(AppView.PROPOSALS)} className="text-indigo-600 hover:text-indigo-800 mb-2">&larr; Volver a Propuestas</button>
                <h1 className="text-3xl font-bold text-slate-800">Analíticas para "{proposal.title}"</h1>
                <p className="text-slate-500 mt-1">Entiende cómo tu cliente está interactuando con la propuesta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-5 text-center">
                    <h3 className="text-lg font-medium text-slate-500">Vistas Totales</h3>
                    <p className="text-5xl font-bold text-indigo-600 mt-2">{proposal.totalViews}</p>
                </Card>
                 <Card className="p-5 text-center">
                    <h3 className="text-lg font-medium text-slate-500">Visitantes Únicos</h3>
                    <p className="text-5xl font-bold text-indigo-600 mt-2">{Math.floor(proposal.totalViews * 0.8)}</p>
                </Card>
                 <Card className="p-5 text-center">
                    <h3 className="text-lg font-medium text-slate-500">Tiempo Prom.</h3>
                    <p className="text-5xl font-bold text-indigo-600 mt-2">3m 45s</p>
                </Card>
            </div>
            
            <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Vistas a lo largo del tiempo</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalyticsData.viewsOverTime}>
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                        <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card className="p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Embudo de Conversión</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <FunnelChart>
                            <Tooltip />
                            <Funnel dataKey="value" data={mockAnalyticsData.funnel} isAnimationActive>
                                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </Card>
                 <Card className="p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Secciones más Vistas</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockAnalyticsData.sectionEngagement} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={100} stroke="#64748b" />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                            <Bar dataKey="time" fill="#818cf8" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="time" position="right" formatter={(value: number) => `${value}s`} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default ProposalAnalytics;