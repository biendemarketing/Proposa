
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Client, Template, Theme, Proposal, ProposalStatus, AppView } from '../../types';
import { mockTemplates, mockThemes } from '../../data/mockData';
import Icon from '../icons/Icon';
import ClientModal from '../clients/ClientModal';

interface NewProposalModalProps {
    clients: Client[];
}

const NewProposalModal: React.FC<NewProposalModalProps> = ({ clients }) => {
    const { setCreateProposalModalOpen, navigate, setClientModalOpen, setEditingClient } = useAppContext();
    const [title, setTitle] = useState('');
    const [selectedClientId, setSelectedClientId] = useState<string | number>(clients.length > 0 ? clients[0].id : 'new');
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | 'blank'>('blank');
    const [selectedThemeId, setSelectedThemeId] = useState<number>(mockThemes.find(t => t.isDefault)?.id || mockThemes[0].id);

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'new') {
            setEditingClient(null);
            setClientModalOpen(true);
        } else {
            setSelectedClientId(Number(value));
        }
    };
    
    const handleCreateProposal = () => {
        if (!title.trim() || selectedClientId === 'new') {
            alert('Por favor, introduce un título y selecciona un cliente.');
            return;
        }

        const selectedTemplate = mockTemplates.find(t => t.id === selectedTemplateId);

        const newProposal: Partial<Proposal> = {
            title,
            clientId: selectedClientId as number,
            blocks: selectedTemplate ? JSON.parse(JSON.stringify(selectedTemplate.blocks)) : [],
            themeId: selectedThemeId,
            status: ProposalStatus.DRAFT,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
        };

        navigate(AppView.PROPOSAL_EDITOR, newProposal);
        setCreateProposalModalOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Nueva Propuesta</h2>
                    <button onClick={() => setCreateProposalModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                        <Icon name="X" />
                    </button>
                </div>
                
                <div className="overflow-y-auto pr-2 space-y-6">
                    {/* Título y Cliente */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Título de la Propuesta</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Rediseño Web Corporativo" className="w-full p-2 border border-slate-300 rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
                            <select value={selectedClientId} onChange={handleClientChange} className="w-full p-2 border border-slate-300 rounded-md">
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.company})</option>)}
                                <option value="new">-- Añadir Nuevo Cliente --</option>
                            </select>
                        </div>
                    </div>

                    {/* Selector de Plantilla */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-700 mb-2">Empezar desde Plantilla</h3>
                        <div className="flex overflow-x-auto space-x-3 pb-3">
                            <div onClick={() => setSelectedTemplateId('blank')} className={`cursor-pointer p-3 border-2 rounded-lg flex-shrink-0 w-40 text-center ${selectedTemplateId === 'blank' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'}`}>
                                <Icon name="FilePlus" className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                <span className="font-semibold text-sm text-slate-700">Empezar desde cero</span>
                            </div>
                            {mockTemplates.map(template => (
                                <div key={template.id} onClick={() => setSelectedTemplateId(template.id)} className={`cursor-pointer p-3 border-2 rounded-lg flex-shrink-0 w-40 ${selectedTemplateId === template.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'}`}>
                                    <p className="font-semibold text-sm text-slate-800 truncate">{template.title}</p>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{template.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selector de Tema */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-700 mb-2">Seleccionar Tema Visual</h3>
                        <div className="flex overflow-x-auto space-x-3 pb-3">
                            {mockThemes.map(theme => (
                                <div key={theme.id} onClick={() => setSelectedThemeId(theme.id)} className={`cursor-pointer p-3 border-2 rounded-lg flex-shrink-0 w-40 ${selectedThemeId === theme.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'}`}>
                                    <p className="font-semibold text-sm text-slate-800 truncate">{theme.name}</p>
                                     <div className="flex space-x-1 mt-2">
                                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                                        <div className="w-5 h-5 rounded-full" style={theme.colors.backgroundType === 'gradient' ? {background: theme.colors.backgroundGradient} : { backgroundColor: theme.colors.background }}></div>
                                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.colors.heading }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                    <button onClick={() => setCreateProposalModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                        Cancelar
                    </button>
                    <button onClick={handleCreateProposal} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                        Crear Propuesta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProposalModal;
