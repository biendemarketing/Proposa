import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView, Proposal, Client } from '../../types';
import Icon from '../icons/Icon';
import { NAVIGATION_ITEMS, SETTINGS_ITEM } from '../../constants';
import { mockProposals, mockNotifications } from '../../data/mockData';

const timeSince = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `hace ${Math.floor(interval)}a`;
    interval = seconds / 2592000;
    if (interval > 1) return `hace ${Math.floor(interval)}m`;
    interval = seconds / 86400;
    if (interval > 1) return `hace ${Math.floor(interval)}d`;
    interval = seconds / 3600;
    if (interval > 1) return `hace ${Math.floor(interval)}h`;
    interval = seconds / 60;
    if (interval > 1) return `hace ${Math.floor(interval)}min`;
    return `hace ${Math.floor(seconds)}s`;
};

const SearchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { navigate, clients } = useAppContext();
    const [query, setQuery] = useState('');

    const filteredProposals = useMemo(() =>
        query.length > 1
            ? mockProposals.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
            : [],
        [query]
    );

    const filteredClients = useMemo(() =>
        query.length > 1
            ? clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase()))
            : [],
        [query, clients]
    );

    const handleNavigate = (view: AppView, payload?: any) => {
        navigate(view, payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto" onClick={e => e.stopPropagation()}>
                <div className="relative">
                     <input
                        type="text"
                        placeholder="Buscar propuestas, clientes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 text-base border-b border-slate-200 focus:ring-0 focus:border-indigo-500 rounded-t-xl"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Search" className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                 <div className="max-h-[60vh] overflow-y-auto">
                    {query.length > 1 && (
                        <>
                            {filteredProposals.length > 0 && (
                                <div className="p-4">
                                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Propuestas</h3>
                                    <ul className="space-y-1">
                                        {filteredProposals.map(p => (
                                            <li key={`prop-${p.id}`} onClick={() => handleNavigate(AppView.PROPOSAL_EDITOR, p)} className="p-2 hover:bg-slate-100 rounded-md cursor-pointer text-sm text-slate-700">{p.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                             {filteredClients.length > 0 && (
                                <div className="p-4">
                                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Clientes</h3>
                                     <ul className="space-y-1">
                                        {filteredClients.map(c => (
                                            <li key={`client-${c.id}`} onClick={() => handleNavigate(AppView.CLIENTS)} className="p-2 hover:bg-slate-100 rounded-md cursor-pointer text-sm text-slate-700">{c.name} - {c.company}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {filteredProposals.length === 0 && filteredClients.length === 0 && (
                                <p className="p-4 text-center text-sm text-slate-500">No se encontraron resultados.</p>
                            )}
                        </>
                    )}
                     {query.length <= 1 && (
                        <p className="p-8 text-center text-sm text-slate-400">Escribe al menos 2 caracteres para buscar.</p>
                    )}
                 </div>
            </div>
        </div>
    );
};


const Header: React.FC = () => {
    const { view, viewPayload, setSidebarOpen, navigate } = useAppContext();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getTitle = () => {
        if (view === AppView.PROPOSAL_EDITOR) return viewPayload ? "Editar Propuesta" : "Crear Propuesta";
        if (view === AppView.TEMPLATE_EDITOR) return viewPayload ? "Editar Plantilla" : "Crear Plantilla";
        if (view === AppView.THEME_EDITOR) return viewPayload ? "Editar Tema" : "Crear Tema";
        if (view === AppView.PROPOSAL_ANALYTICS) return "Analíticas de Propuesta";
        
        const allNavItems = [...NAVIGATION_ITEMS, SETTINGS_ITEM, { view: AppView.MEMBERS, label: 'Miembros', icon: 'Users' }];
        const navItem = allNavItems.find(item => item.view === view);
        return navItem ? navItem.label : 'Dashboard';
    }

    return (
        <>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
        <header className="bg-white/95 backdrop-blur-sm p-4 flex justify-between items-center border-b border-slate-200 sticky top-0 z-20 h-16">
            <div className="flex items-center">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden mr-4 p-2 text-slate-600 hover:text-slate-900"
                    aria-label="Abrir menú"
                >
                    <Icon name="Menu" className="w-6 h-6" />
                </button>
                 <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">{getTitle()}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative w-40 sm:w-64">
                    <button onClick={() => setIsSearchOpen(true)} className="w-full text-left pl-10 pr-4 py-2 text-sm border bg-slate-100 border-slate-200 rounded-lg text-slate-500">
                        Buscar...
                    </button>
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Search" className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                
                <div className="relative" ref={notificationsRef}>
                    <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full relative">
                        <Icon name="Bell" className="w-6 h-6" />
                        <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    {isNotificationsOpen && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-30">
                            <div className="p-3 border-b font-semibold text-slate-800">Notificaciones</div>
                            <ul className="max-h-96 overflow-y-auto">
                                {mockNotifications.map(n => (
                                    <li key={n.id} className="flex items-start p-3 hover:bg-slate-50">
                                        <Icon name={n.icon} className={`w-5 h-5 mt-1 mr-3 flex-shrink-0 ${n.iconColor}`} />
                                        <div>
                                            <p className="text-sm text-slate-700">{n.text}</p>
                                            <p className="text-xs text-slate-400">{timeSince(n.time)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-2 bg-slate-50 text-center">
                                <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline">Ver todas</a>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="relative" ref={profileRef}>
                    <button onClick={() => setIsProfileOpen(prev => !prev)}>
                        <img
                            className="w-9 h-9 rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-indigo-500 transition-shadow"
                            src="https://picsum.photos/seed/user/100/100"
                            alt="User Avatar"
                        />
                    </button>
                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-30 py-1">
                           <a href="#" onClick={(e) => { e.preventDefault(); navigate(AppView.SETTINGS); setIsProfileOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Mi Perfil</a>
                           <div className="my-1 h-px bg-slate-200"></div>
                           <a href="#" onClick={(e) => { e.preventDefault(); alert("Cerrando sesión..."); setIsProfileOpen(false); }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <Icon name="LogOut" className="w-4 h-4 mr-2" />
                                Cerrar Sesión
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;