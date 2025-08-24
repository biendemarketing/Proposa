
import React, { useState, useMemo } from 'react';
import { mockComments } from '../../data/mockData';
import { Comment, AppView } from '../../types';
import Card from '../ui/Card';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';

const Comments: React.FC = () => {
    const { navigate } = useAppContext();
    const [comments, setComments] = useState<Comment[]>(mockComments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all');

    const filteredComments = useMemo(() => {
        return comments
            .filter(c => statusFilter === 'all' || c.status === statusFilter)
            .filter(c => 
                c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [comments, searchTerm, statusFilter]);

    const handleResolve = (id: number) => {
        setComments(comments.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
    };
    
    const timeSince = (dateString: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " años";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " meses";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " días";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " horas";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutos";
        return Math.floor(seconds) + " segundos";
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 font-serif">Comentarios</h1>
                <p className="text-slate-500 mt-1">Gestiona toda la comunicación de tus propuestas.</p>
            </div>

            <Card>
                 <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Buscar en comentarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                        />
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Todos</button>
                        <button onClick={() => setStatusFilter('open')} className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'open' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Abiertos</button>
                        <button onClick={() => setStatusFilter('resolved')} className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'resolved' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Resueltos</button>
                    </div>
                </div>

                <ul className="divide-y divide-slate-200">
                    {filteredComments.map(comment => (
                        <li key={comment.id} className="p-4 hover:bg-slate-50">
                            <div className="flex items-start space-x-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${comment.authorType === 'client' ? 'bg-amber-100' : 'bg-indigo-100'}`}>
                                    <Icon name={comment.authorType === 'client' ? 'User' : 'Briefcase'} className={`w-5 h-5 ${comment.authorType === 'client' ? 'text-amber-600' : 'text-indigo-600'}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-slate-800">{comment.author}</p>
                                            <p className="text-xs text-slate-500">
                                                en <span className="font-medium text-indigo-600 cursor-pointer" onClick={() => navigate(AppView.PROPOSALS, comment.proposalId)}>{comment.proposalTitle}</span>
                                            </p>
                                        </div>
                                        <p className="text-xs text-slate-400">hace {timeSince(comment.timestamp)}</p>
                                    </div>
                                    <p className="text-slate-600 mt-2">{comment.content}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    {comment.status === 'open' ? (
                                        <button onClick={() => handleResolve(comment.id)} className="flex items-center text-sm text-green-600 font-semibold hover:text-green-800" title="Marcar como resuelto">
                                            <Icon name="CheckCircle" className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <span className="flex items-center text-sm text-slate-500">
                                            <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-1" />
                                            Resuelto
                                        </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default Comments;
