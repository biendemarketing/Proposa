
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { AppView, Client } from '../types';

interface AppContextType {
    view: AppView | string;
    viewPayload: any;
    navigate: (view: AppView | string, payload?: any) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    isCreateProposalModalOpen: boolean;
    setCreateProposalModalOpen: (isOpen: boolean) => void;
    isClientModalOpen: boolean;
    setClientModalOpen: (isOpen: boolean) => void;
    editingClient: Client | null;
    setEditingClient: (client: Client | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [view, setView] = useState<AppView | string>(AppView.DASHBOARD);
    const [viewPayload, setViewPayload] = useState<any>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    // State for modals
    const [isCreateProposalModalOpen, setCreateProposalModalOpen] = useState(false);
    const [isClientModalOpen, setClientModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const navigate = useCallback((newView: AppView | string, payload: any = null) => {
        setView(newView);
        setViewPayload(payload);
        setSidebarOpen(false); // Close sidebar on navigation
    }, []);

    const value = {
        view,
        viewPayload,
        navigate,
        isSidebarOpen,
        setSidebarOpen,
        isCreateProposalModalOpen,
        setCreateProposalModalOpen,
        isClientModalOpen,
        setClientModalOpen,
        editingClient,
        setEditingClient,
    };

    return (
        <AppContext.Provider value={value}>
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
