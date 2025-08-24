
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { NAVIGATION_ITEMS, SETTINGS_ITEM } from '../../constants';
import Icon from '../icons/Icon';

const Sidebar: React.FC = () => {
    const { view, navigate, isSidebarOpen, user } = useAppContext();

    const NavItem: React.FC<{ item: { view: string; label: string; icon: string; } }> = ({ item }) => {
        const isActive = view === item.view;
        return (
            <li>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(item.view);
                    }}
                    className={`flex items-center px-3 py-2.5 my-1 rounded-lg transition-colors duration-200 ${
                        isActive
                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                    <Icon name={item.icon} className="w-5 h-5" />
                    <span className="ml-4 text-sm font-medium">{item.label}</span>
                </a>
            </li>
        );
    };

    return (
        <aside className={`w-64 bg-white text-slate-800 flex flex-col p-4 border-r border-slate-200 transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 lg:flex lg:static fixed inset-y-0 left-0`}>
            <div className="flex items-center mb-6 pl-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Icon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold ml-3 tracking-tight text-slate-800">Proposa</h1>
            </div>
            
            <nav className="flex-1">
                <ul>
                    {NAVIGATION_ITEMS.map((item) => (
                        <NavItem key={item.view} item={item} />
                    ))}
                </ul>
            </nav>
            
            <div className="border-t pt-2">
                 <ul>
                    <NavItem item={SETTINGS_ITEM} />
                </ul>
                {user && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                            <img
                                className="w-9 h-9 rounded-full"
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                alt="User Avatar"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
