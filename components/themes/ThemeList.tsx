
import React, { useState } from 'react';
import { mockThemes } from '../../data/mockData';
import { Theme, AppView } from '../../types';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';
import ThemeCard from './ThemeCard';

const ThemeList: React.FC = () => {
    const { navigate } = useAppContext();
    const [themes, setThemes] = useState<Theme[]>(mockThemes);

    const handleSetDefault = (id: number) => {
        setThemes(themes.map(t => ({ ...t, isDefault: t.id === id })));
        // In a real app, this would be a backend call
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">Temas</h1>
                    <p className="text-slate-500 mt-1">Define y gestiona la apariencia de tus propuestas.</p>
                </div>
                 <button
                    onClick={() => navigate(AppView.THEME_EDITOR)}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto"
                >
                    <Icon name="Plus" className="w-5 h-5 mr-2" />
                    Crear Tema
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {themes.map(theme => (
                    <ThemeCard key={theme.id} theme={theme} onSetDefault={handleSetDefault} />
                ))}
            </div>

             {themes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">No se encontraron temas. ¡Crea tu primer tema!</p>
                </div>
            )}
        </div>
    );
};

export default ThemeList;
