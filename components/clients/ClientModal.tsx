
import React, { useState, useEffect } from 'react';
import { Client } from '../../types';
import Icon from '../icons/Icon';

interface ClientModalProps {
    client: Partial<Client> | null;
    onClose: () => void;
    onSave: (client: Client) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ client, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Client>>({
        name: '',
        company: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.company) {
            alert('Nombre y Empresa son campos obligatorios.');
            return;
        }
        onSave({
            id: formData.id || Date.now(),
            ...formData
        } as Client);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800">
                            {client?.id ? 'Editar Cliente' : 'Nuevo Cliente'}
                        </h2>
                        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800">
                            <Icon name="X" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Notas</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full p-2 border border-slate-300 rounded-md" />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                            Guardar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientModal;
