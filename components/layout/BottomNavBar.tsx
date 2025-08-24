import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Icon from '../icons/Icon';
import { AppView } from '../../types';

const BottomNavBar: React.FC = () => {
    const { view, navigate } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { view: AppView.DASHBOARD, icon: 'Building2', label: 'Dashboard' },
        { view: AppView.COMMENTS, icon: 'MessageSquare', label: 'Comentarios' },
        { view: AppView.ANALYTICS, icon: 'BarChart', label: 'Analíticas' },
        { view: AppView.CLIENTS, icon: 'Users', label: 'Clientes' },
    ];
    
    const leftNavItems = navItems.slice(0, 2);
    const rightNavItems = navItems.slice(2);

    const handleActionClick = (view: AppView, payload?: any) => {
        navigate(view, payload);
        setIsMenuOpen(false);
    };

    return (
        <>
            {isMenuOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}></div>}
            <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl z-50 h-16">
                <div className="flex justify-around items-center h-full relative">
                    {/* Botones de navegación del lado izquierdo */}
                    {leftNavItems.map(item => (
                        <button
                            key={item.view}
                            onClick={() => navigate(item.view)}
                            className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 pt-2 ${
                                view === item.view ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                            }`}
                        >
                            <Icon name={item.icon} className="w-6 h-6 mb-0.5" />
                            <span className="text-[11px] font-medium">{item.label}</span>
                        </button>
                    ))}

                    {/* Espacio para el botón central */}
                    <div className="w-1/4 h-full"></div>

                    {/* Botones de navegación del lado derecho */}
                    {rightNavItems.map(item => (
                        <button
                            key={item.view}
                            onClick={() => navigate(item.view)}
                            className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 pt-2 ${
                                view === item.view ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                            }`}
                        >
                            <Icon name={item.icon} className="w-6 h-6 mb-0.5" />
                            <span className="text-[11px] font-medium">{item.label}</span>
                        </button>
                    ))}

                    {/* Botón central 'Crear' */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-50">
                        <div className={`relative transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-40' : 'h-14'}`}>
                            {isMenuOpen && (
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                                   <button onClick={() => handleActionClick(AppView.CLIENTS)} className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-3 py-2 rounded-full shadow-lg">
                                        <span>Nuevo Cliente</span>
                                        <div className="bg-indigo-100 p-1.5 rounded-full"><Icon name="UserPlus" className="w-5 h-5 text-indigo-600" /></div>
                                    </button>
                                   <button onClick={() => handleActionClick(AppView.PROPOSAL_EDITOR)} className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-3 py-2 rounded-full shadow-lg">
                                        <span>Nueva Propuesta</span>
                                        <div className="bg-indigo-100 p-1.5 rounded-full"><Icon name="FilePlus" className="w-5 h-5 text-indigo-600" /></div>
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300"
                                aria-label="Crear"
                            >
                                <Icon name={isMenuOpen ? 'X' : 'Plus'} className={`w-7 h-7 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default BottomNavBar;