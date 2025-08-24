
import React, { useState, useCallback } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ProposalList from './components/proposals/ProposalList';
import ProposalEditor from './components/proposals/ProposalEditor';
import { AppView, Proposal, Template, Theme, Client } from './types';
import ProposalAnalytics from './components/proposals/ProposalAnalytics';
import PublicProposalView from './components/proposals/PublicProposalView';
import TemplateList from './components/templates/TemplateList';
import ThemeList from './components/themes/ThemeList';
import ThemeEditor from './components/themes/ThemeEditor';
import MediaLibrary from './components/media/MediaLibrary';
import BottomNavBar from './components/layout/BottomNavBar';
import Clients from './components/clients/Clients';
import Analytics from './components/analytics/Analytics';
import Comments from './components/comments/Comments';
import Settings from './components/settings/Settings';
import { mockClients } from './data/mockData';
import NewProposalModal from './components/proposals/NewProposalModal';
import ClientModal from './components/clients/ClientModal';


const MainApp: React.FC = () => {
    const { 
        view, 
        viewPayload, 
        isSidebarOpen, 
        setSidebarOpen,
        isCreateProposalModalOpen, 
        setCreateProposalModalOpen,
        isClientModalOpen, 
        setClientModalOpen,
        editingClient, 
        setEditingClient 
    } = useAppContext();
    
    const [clients, setClients] = useState<Client[]>(mockClients);

    const handleSaveClient = useCallback((client: Client) => {
        if (clients.some(c => c.id === client.id)) {
            setClients(clients.map(c => c.id === client.id ? client : c));
        } else {
            setClients(prevClients => [...prevClients, client]);
        }
        setClientModalOpen(false);
        setEditingClient(null);
    }, [clients, setClientModalOpen, setEditingClient]);

    const handleDeleteClient = useCallback((clientId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente? Esto no eliminará sus propuestas.')) {
            setClients(clients.filter(c => c.id !== clientId));
        }
    }, [clients]);


    const renderView = () => {
        if (view.startsWith('public:')) {
            const token = view.split(':')[1];
            return <PublicProposalView token={token} proposal={viewPayload as Proposal} />;
        }
        
        switch (view) {
            case AppView.DASHBOARD: return <Dashboard />;
            case AppView.PROPOSALS: return <ProposalList />;
            case AppView.PROPOSAL_EDITOR: return <ProposalEditor proposal={viewPayload as Proposal | undefined} />;
            case AppView.PROPOSAL_ANALYTICS: return <ProposalAnalytics proposalId={viewPayload as number} />;
            case AppView.TEMPLATES: return <TemplateList />;
            case AppView.TEMPLATE_EDITOR: return <ProposalEditor template={viewPayload as Template | undefined} />;
            case AppView.THEMES: return <ThemeList />;
            case AppView.THEME_EDITOR: return <ThemeEditor theme={viewPayload as Theme | undefined} />;
            case AppView.MEDIA: return <MediaLibrary />;
            case AppView.CLIENTS: return <Clients clients={clients} onDelete={handleDeleteClient} />;
            case AppView.COMMENTS: return <Comments />;
            case AppView.ANALYTICS: return <Analytics />;
            case AppView.SETTINGS: return <Settings />;
            case AppView.MEMBERS: return <Settings initialTab="members" />;
            default: return <Dashboard />;
        }
    };

    if (view.startsWith('public:')) {
        return <div className="min-h-screen bg-slate-100">{renderView()}</div>;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
             {isSidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden" aria-hidden="true"></div>
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
                    {renderView()}
                </main>
            </div>
            <BottomNavBar />
            {isCreateProposalModalOpen && <NewProposalModal clients={clients} />}
            {isClientModalOpen && <ClientModal client={editingClient} onClose={() => { setClientModalOpen(false); setEditingClient(null); }} onSave={handleSaveClient} />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
};

export default App;
