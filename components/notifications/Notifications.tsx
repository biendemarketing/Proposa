
import React, { useState, useMemo } from 'react';
import { mockNotifications } from '../../data/mockData';
import { Notification, AppView } from '../../types';
import Card from '../ui/Card';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';

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

const Notifications: React.FC = () => {
    const { navigate } = useAppContext();
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(n => !n.isRead).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        }
        return [...notifications].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }, [notifications, filter]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleNotificationClick = (notification: Notification) => {
        markAsRead(notification.id);
        navigate(AppView.PROPOSAL_ANALYTICS, notification.proposalId);
    };
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, notification: Notification) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleNotificationClick(notification);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Notificaciones</h1>
                    <p className="text-slate-500 mt-1">Revisa todas tus alertas y actualizaciones.</p>
                </div>
                <button
                    onClick={markAllAsRead}
                    disabled={!notifications.some(n => !n.isRead)}
                    className="flex items-center bg-white text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon name="CheckCircle" className="w-5 h-5 mr-2" />
                    Marcar todas como leídas
                </button>
            </div>
            
            <Card>
                <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                    <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        Todas
                    </button>
                    <button onClick={() => setFilter('unread')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'unread' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        No leídas
                    </button>
                </div>

                {filteredNotifications.length > 0 ? (
                    <ul className="divide-y divide-slate-200">
                        {filteredNotifications.map(notification => (
                            <li 
                                key={notification.id}
                                className="p-4 flex items-start gap-4 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded-sm"
                                onClick={() => handleNotificationClick(notification)}
                                onKeyDown={(e) => handleKeyDown(e, notification)}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="w-3 h-6 flex items-center justify-center flex-shrink-0 pt-0.5">
                                    {!notification.isRead && (
                                        <>
                                            <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" aria-hidden="true"></div>
                                            <span className="sr-only">No leído</span>
                                        </>
                                    )}
                                </div>
                                <Icon name={notification.icon} className={`w-6 h-6 flex-shrink-0 ${notification.iconColor}`} />
                                <div className="flex-1">
                                    <p className="text-sm text-slate-700">{notification.text}</p>
                                    <p className="text-xs text-slate-500 mt-1">{timeSince(notification.time)}</p>
                                </div>
                                {!notification.isRead && (
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            markAsRead(notification.id);
                                        }}
                                        className="text-xs font-semibold text-indigo-600 hover:underline flex-shrink-0 self-center"
                                        aria-label={`Marcar como leída la notificación: ${notification.text}`}
                                    >
                                        Marcar leída
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-12">
                        <Icon name="Bell" className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="mt-4 text-lg font-semibold text-slate-700">Todo al día</h3>
                        <p className="text-slate-500 mt-1">No tienes notificaciones {filter === 'unread' ? 'sin leer' : ''}.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Notifications;