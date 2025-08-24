import React from 'react';
import { Client, Proposal } from '../../types';
import Icon from '../icons/Icon';

interface ClientCardProps {
    client: Client;
    proposals: Proposal[];
    onEdit: (client: Client) => void;
    onDelete: (clientId: number) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, proposals, onEdit, onDelete }) => {
    
    const clientProposals = proposals.filter(p => p.clientId === client.id);
    const totalValue = clientProposals.reduce((sum, p) => sum + p.value, 0);

    const formatCurrency = (value: number) => {
         try {
            return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
        } catch (e) {
             return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col group transition-shadow hover:shadow-lg p-5">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-slate-800">{client.name}</h3>
                    <p className="text-sm text-slate-500">{client.company}</p>
                </div>
                <div className="flex items-center space-x-1">
                    <button onClick={() => onEdit(client)} className="p-2 text-slate-400 hover:text-indigo-600" title="Editar Cliente">
                        <Icon name="EditSquare" className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(client.id)} className="p-2 text-slate-400 hover:text-red-500" title="Eliminar Cliente">
                        <Icon name="Trash2" className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-around text-center">
                <div>
                    <p className="text-xs text-slate-500">Propuestas</p>
                    <p className="text-xl font-bold text-slate-700">{clientProposals.length}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Valor Total</p>
                    <p className="text-xl font-bold text-slate-700">{formatCurrency(totalValue)}</p>
                </div>
            </div>
             <div className="mt-4 text-xs text-slate-400">
                <p className="truncate"><strong>Email:</strong> {client.email}</p>
                <p><strong>Tel:</strong> {client.phone}</p>
             </div>
        </div>
    );
};

export default ClientCard;