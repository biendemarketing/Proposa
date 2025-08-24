import React, { useState, useMemo } from 'react';
import { mockMediaFiles } from '../../data/mockData';
import { MediaFile } from '../../types';
import Icon from '../icons/Icon';
import Card from '../ui/Card';
import MediaCard from './MediaCard';

const MediaLibrary: React.FC = () => {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const filteredAndSortedFiles = useMemo(() => {
        return mediaFiles
            .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });
    }, [mediaFiles, searchTerm, sortOrder]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Medios</h1>
                    <p className="text-slate-500 mt-1">Gestiona todos tus archivos e imágenes.</p>
                </div>
                <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
                    <Icon name="Plus" className="w-5 h-5 mr-2" />
                    Subir Archivo
                </button>
            </div>

            <Card className="p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Buscar archivos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="appearance-none w-full sm:w-52 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="newest">Más recientes</option>
                            <option value="oldest">Más antiguos</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <Icon name="ChevronDown" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredAndSortedFiles.map(file => (
                    <MediaCard key={file.id} file={file} />
                ))}
            </div>

            {filteredAndSortedFiles.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">No se encontraron archivos. ¡Intenta ajustar tu búsqueda!</p>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;