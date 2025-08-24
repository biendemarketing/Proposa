import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { AppView, Client } from '../types';
import { mockClients } from '../data/mockData';

interface AppContextType {
    view: AppView | string;
    viewPayload: any;
    navigate: (view: AppView | string, payload?: any) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    clients: Client[];
    addClient: (client: Client) => void;
    updateClient: (client: Client) => void;
    deleteClient: (clientId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [view, setView] = useState<AppView | string>(AppView.DASHBOARD);
    const [viewPayload, setViewPayload] = useState<any>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>(mockClients);

    const navigate = useCallback((newView: AppView | string, payload: any = null) => {
        setView(newView);
        setViewPayload(payload);
        setSidebarOpen(false); // Close sidebar on navigation
    }, []);

    const addClient = useCallback((client: Client) => {
        setClients(prev => [...prev, client]);
    }, []);

    const updateClient = useCallback((client: Client) => {
        setClients(prev => prev.map(c => c.id === client.id ? client : c));
    }, []);

    const deleteClient = useCallback((clientId: number) => {
        setClients(prev => prev.filter(c => c.id !== clientId));
    }, []);

    return (
        <AppContext.Provider value={{ 
            view, 
            viewPayload, 
            navigate, 
            isSidebarOpen, 
            setSidebarOpen,
            clients,
            addClient,
            updateClient,
            deleteClient
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};