
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { AppView } from '../types';

interface AppContextType {
    view: AppView | string;
    viewPayload: any;
    navigate: (view: AppView | string, payload?: any) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [view, setView] = useState<AppView | string>(AppView.DASHBOARD);
    const [viewPayload, setViewPayload] = useState<any>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useCallback((newView: AppView | string, payload: any = null) => {
        setView(newView);
        setViewPayload(payload);
        setSidebarOpen(false); // Close sidebar on navigation
    }, []);

    return (
        <AppContext.Provider value={{ view, viewPayload, navigate, isSidebarOpen, setSidebarOpen }}>
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