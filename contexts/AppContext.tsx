import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { AppView, Client, User } from '../types';
import { mockClients } from '../data/mockData';

type Theme = 'light' | 'dark';

interface AppContextType {
    // State
    view: AppView | string;
    viewPayload: any;
    isSidebarOpen: boolean;
    clients: Client[];
    isAuthenticated: boolean;
    user: User | null;
    theme: Theme;

    // Actions
    navigate: (view: AppView | string, payload?: any) => void;
    setSidebarOpen: (isOpen: boolean) => void;
    addClient: (client: Client) => void;
    updateClient: (client: Client) => void;
    deleteClient: (clientId: number) => void;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    register: (name: string, email: string, pass: string) => boolean;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Navigation State
    const [view, setView] = useState<AppView | string>(AppView.LANDING);
    const [viewPayload, setViewPayload] = useState<any>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Theme State
    const [theme, setTheme] = useState<Theme>('dark');

    // Data State
    const [clients, setClients] = useState<Client[]>(mockClients);

    useEffect(() => {
        const storedTheme = localStorage.getItem('proposa-theme') as Theme | null;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('proposa-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const navigate = useCallback((newView: AppView | string, payload: any = null) => {
        setView(newView);
        setViewPayload(payload);
        setSidebarOpen(false); // Close sidebar on navigation
    }, []);

    // Auth Actions
    const login = useCallback((email: string, pass: string): boolean => {
        // Mock login logic
        if (email === 'user@proposa.com' && pass === 'password123') {
            const loggedInUser: User = { id: 1, name: 'Carlos Vega', email: 'user@proposa.com' };
            setUser(loggedInUser);
            setIsAuthenticated(true);
            navigate(AppView.DASHBOARD);
            return true;
        }
        return false;
    }, [navigate]);

    const register = useCallback((name: string, email: string, pass: string): boolean => {
        // Mock register logic
        const newUser: User = { id: Date.now(), name, email };
        setUser(newUser);
        setIsAuthenticated(true);
        navigate(AppView.DASHBOARD);
        return true;
    }, [navigate]);

    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        navigate(AppView.LOGIN);
    }, [navigate]);

    // Client Actions
    const addClient = useCallback((client: Client) => {
        setClients(prev => [...prev, client]);
    }, []);

    const updateClient = useCallback((client: Client) => {
        setClients(prev => prev.map(c => c.id === client.id ? client : c));
    }, []);

    const deleteClient = useCallback((clientId: number) => {
        setClients(prev => prev.filter(c => c.id !== clientId));
    }, []);

    const contextValue: AppContextType = {
        view,
        viewPayload,
        navigate,
        isSidebarOpen,
        setSidebarOpen,
        clients,
        addClient,
        updateClient,
        deleteClient,
        isAuthenticated,
        user,
        login,
        logout,
        register,
        theme,
        toggleTheme,
    };

    return (
        <AppContext.Provider value={contextValue}>
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