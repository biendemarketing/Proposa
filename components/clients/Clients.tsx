import React, { useState, useMemo } from 'react';
import { mockProposals } from '../../data/mockData';
import { Client } from '../../types';
import Icon from '../icons/Icon';
import Card from '../ui/Card';
import ClientCard from './ClientCard';
import ClientModal from './ClientModal';
import { useAppContext } from '../../contexts/AppContext';

const Clients: React.FC = () => {
    const { clients, addClient, updateClient, deleteClient } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const filteredClients = useMemo(() => {
        return clients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clients, searchTerm]);

    const handleOpenModal = (client: Client | null = null) => {
        setEditingClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingClient(null);
        setIsModalOpen(false);
    };

    const handleSaveClient = (client: Client) => {
        if (clients.some(c => c.id === client.id)) {
            updateClient(client);
        } else {
            addClient(client);
        }
        handleCloseModal();
    };

    const handleDeleteClient = (clientId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente? Esto no eliminará sus propuestas.')) {
            deleteClient(clientId);
        }
    };

    return (
        <div className="space-y-6">
            {isModalOpen && <ClientModal client={editingClient} onClose={handleCloseModal} onSave={handleSaveClient} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">Clientes</h1>
                    <p className="text-slate-500 mt-1">Gestiona todos tus contactos y clientes.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto"
                >
                    <Icon name="Plus" className="w-5 h-5 mr-2" />
                    Nuevo Cliente
                </button>
            </div>

            <Card className="p-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Buscar clientes por nombre o empresa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Search" className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredClients.map(client => (
                    <ClientCard
                        key={client.id}
                        client={client}
                        proposals={mockProposals}
                        onEdit={handleOpenModal}
                        onDelete={handleDeleteClient}
                    />
                ))}
            </div>

            {filteredClients.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">No se encontraron clientes. ¡Intenta ajustar tu búsqueda o añade uno nuevo!</p>
                </div>
            )}
        </div>
    );
};

export default Clients;