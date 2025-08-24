import React, { useState, useMemo } from 'react';
import { mockProposals } from '../../data/mockData';
import { Proposal, ProposalStatus, AppView } from '../../types';
import { PROPOSAL_STATUS_COLORS } from '../../constants';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';

const ProposalList: React.FC = () => {
    const { navigate, clients } = useAppContext();
    const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');

    const filteredProposals = useMemo(() => {
        return proposals
            .filter(p => statusFilter === 'all' || p.status === statusFilter)
            .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [proposals, searchTerm, statusFilter]);

    const getClientName = (clientId: number) => {
        return clients.find(c => c.id === clientId)?.company || 'Cliente Desconocido';
    };

    const formatCurrency = (value: number, currency: string) => {
        try {
            return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(value);
        } catch (e) {
             return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta propuesta?')) {
            setProposals(proposals.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Propuestas</h1>
                    <p className="text-slate-500 mt-1">Gestiona todas tus propuestas en un solo lugar.</p>
                </div>
                 <button
                    onClick={() => navigate(AppView.PROPOSAL_EDITOR)}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto"
                >
                    <Icon name="Plus" className="w-5 h-5 mr-2" />
                    Nueva Propuesta
                </button>
            </div>

            <Card>
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Buscar propuestas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                        />
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'all')}
                            className="appearance-none w-full sm:w-52 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="all" style={{ backgroundColor: '#334155' }}>Todos los estados</option>
                            {Object.values(ProposalStatus).map(status => (
                                <option key={status} value={status} style={{ backgroundColor: '#334155' }}>{status}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <Icon name="ChevronDown" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Título</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Estado</th>
                                <th scope="col" className="px-6 py-3">Valor</th>
                                <th scope="col" className="px-6 py-3">Vistas</th>
                                <th scope="col" className="px-6 py-3">Última Actividad</th>
                                <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProposals.map(p => (
                                <tr key={p.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{p.title}</td>
                                    <td className="px-6 py-4">{getClientName(p.clientId)}</td>
                                    <td className="px-6 py-4"><Badge color={PROPOSAL_STATUS_COLORS[p.status]}>{p.status}</Badge></td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(p.value, p.currency)}</td>
                                    <td className="px-6 py-4">{p.totalViews}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(p.lastActivity).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button onClick={() => p.publicLink && navigate(`public:${p.publicLink}`)} className="p-2 text-slate-500 hover:text-indigo-600" title="Vista Pública"><Icon name="ExternalLink" className="w-5 h-5" /></button>
                                            <button onClick={() => navigate(AppView.PROPOSAL_ANALYTICS, p.id)} className="p-2 text-slate-500 hover:text-indigo-600" title="Analíticas"><Icon name="BarChart" className="w-5 h-5" /></button>
                                            <button onClick={() => navigate(AppView.PROPOSAL_EDITOR, p)} className="p-2 text-slate-500 hover:text-indigo-600" title="Editar"><Icon name="EditSquare" className="w-5 h-5" /></button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-500 hover:text-red-600" title="Eliminar"><Icon name="Trash2" className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProposalList;