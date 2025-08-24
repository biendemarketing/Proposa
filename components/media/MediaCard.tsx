import React from 'react';
import { MediaFile } from '../../types';
import Icon from '../icons/Icon';

interface MediaCardProps {
    file: MediaFile;
}

const MediaCard: React.FC<MediaCardProps> = ({ file }) => {
    const getFileIcon = (type: MediaFile['type']) => {
        switch (type) {
            case 'pdf': return 'FileText';
            case 'document': return 'FileText';
            default: return 'Image';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col group transition-shadow hover:shadow-lg relative">
            <div className="aspect-video bg-slate-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                    <Icon name={getFileIcon(file.type)} className="w-16 h-16 text-slate-300" />
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <p className="font-semibold text-slate-800 text-sm truncate" title={file.name}>{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{file.size}</p>
                </div>
            </div>
            <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-indigo-600 hover:bg-white" title="Vista Previa"><Icon name="Eye" className="w-4 h-4" /></button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-indigo-600 hover:bg-white" title="Copiar Enlace"><Icon name="Copy" className="w-4 h-4" /></button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 hover:bg-white" title="Eliminar"><Icon name="Trash2" className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

export default MediaCard;
