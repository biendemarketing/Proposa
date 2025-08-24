import React, { useState, useEffect, useMemo } from 'react';
import { Theme, AppView, Proposal, ProposalStatus } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import { mockProposals, mockThemes } from '../../data/mockData';
import PublicProposalView from '../proposals/PublicProposalView';
import Icon from '../icons/Icon';

interface ThemeEditorProps {
    theme?: Theme;
}

const PREDEFINED_GRADIENTS: Record<string, string> = {
    'Amanecer': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
    'Océano': 'linear-gradient(to right, #2193b0, #6dd5ed)',
    'Neón': 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
    'Púrpura Intenso': 'linear-gradient(to right, #8e2de2, #4a00e0)',
    'Atardecer': 'linear-gradient(to right, #ff7e5f, #feb47b)',
    'Noche Estrellada': 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
};

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme: themeProp }) => {
    const { navigate } = useAppContext();
    const [theme, setTheme] = useState<Theme>(
        themeProp || {
            id: Date.now(),
            name: 'Nuevo Tema',
            colors: {
                primary: '#4f46e5',
                background: '#f8fafc',
                text: '#334155',
                heading: '#1e293b',
                cardBackground: '#ffffff',
                backgroundType: 'solid',
                backgroundGradient: '',
            },
            fonts: {
                heading: 'var(--font-sans)',
                body: 'var(--font-sans)',
            }
        }
    );

    useEffect(() => {
        // Ensure theme object has the new properties
        if (!theme.colors.backgroundType) {
            setTheme(prev => ({
                ...prev,
                colors: {
                    ...prev.colors,
                    backgroundType: 'solid',
                    backgroundGradient: ''
                }
            }));
        }
    }, [theme]);

    const handleColorChange = (key: keyof Theme['colors'], value: string) => {
        setTheme(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
    };

    const handleFontChange = (key: keyof Theme['fonts'], value: string) => {
        setTheme(prev => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));
    };
    
    const handleBackgroundTypeChange = (type: 'solid' | 'gradient') => {
        setTheme(prev => ({ ...prev, colors: { ...prev.colors, backgroundType: type } }));
    };

    const handleGradientChange = (gradient: string) => {
        setTheme(prev => ({...prev, colors: {...prev.colors, backgroundGradient: gradient}}));
    };

    const proposalForPreview: Proposal = useMemo(() => ({
        ...(mockProposals.find(p => p.id === 5) || mockProposals[0]),
        themeId: theme.id,
    }), [theme.id]);

    const handleSave = () => {
        // In a real app, this would save to a backend.
        console.log("Saving theme:", theme);
        alert("¡Tema guardado exitosamente!");
        navigate(AppView.THEMES);
    };

    const ColorInput: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => (
        <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700">
                {label}
                <span className="text-xs text-slate-500 font-mono">{value}</span>
            </label>
            <div className="relative mt-1">
                <input
                    type="color"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-10 rounded-md border border-slate-300" style={{ backgroundColor: value }} />
            </div>
        </div>
    );
    
    return (
        <div className="flex flex-col lg:flex-row h-full gap-6">
            {/* Control Panel */}
            <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="h-full overflow-y-auto pr-2 space-y-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Editor de Temas</h1>
                        <p className="text-sm text-slate-500">Personaliza la apariencia de tus propuestas.</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Tema</label>
                        <input
                            type="text"
                            value={theme.name}
                            onChange={e => setTheme(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2 border border-slate-300 rounded-md"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-b pb-2">Colores</h3>
                        <ColorInput label="Color Primario (Acentos)" value={theme.colors.primary} onChange={val => handleColorChange('primary', val)} />
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Fondo Principal</label>
                            <div className="flex items-center gap-2 mb-3">
                                <button onClick={() => handleBackgroundTypeChange('solid')} className={`px-3 py-1 text-sm rounded-full ${theme.colors.backgroundType === 'solid' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Sólido</button>
                                <button onClick={() => handleBackgroundTypeChange('gradient')} className={`px-3 py-1 text-sm rounded-full ${theme.colors.backgroundType === 'gradient' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Gradiente</button>
                            </div>
                            {theme.colors.backgroundType === 'solid' ? (
                                <ColorInput label="Color de Fondo" value={theme.colors.background} onChange={val => handleColorChange('background', val)} />
                            ) : (
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Selecciona un Gradiente</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(PREDEFINED_GRADIENTS).map(([name, gradient]) => (
                                            <div key={name} title={name} onClick={() => handleGradientChange(gradient)}
                                                className={`h-12 w-full rounded-md cursor-pointer border-2 ${theme.colors.backgroundGradient === gradient ? 'border-indigo-500' : 'border-transparent'}`}
                                                style={{ background: gradient }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <ColorInput label="Texto Principal" value={theme.colors.text} onChange={val => handleColorChange('text', val)} />
                        <ColorInput label="Encabezados" value={theme.colors.heading} onChange={val => handleColorChange('heading', val)} />
                        <ColorInput label="Fondo de Tarjetas" value={theme.colors.cardBackground} onChange={val => handleColorChange('cardBackground', val)} />
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-b pb-2">Tipografías</h3>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Encabezados</label>
                            <select value={theme.fonts.heading} onChange={e => handleFontChange('heading', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                                <option value="var(--font-sans)">Plus Jakarta Sans</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Cuerpo del Texto</label>
                             <select value={theme.fonts.body} onChange={e => handleFontChange('body', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                                <option value="var(--font-sans)">Plus Jakarta Sans</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <button onClick={() => navigate(AppView.THEMES)} className="text-sm font-semibold text-slate-600 hover:text-slate-800">Cancelar</button>
                        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700">Guardar Tema</button>
                    </div>
                </div>
            </div>

            {/* Live Preview */}
            <div className="flex-1 min-h-[600px] lg:min-h-0 bg-slate-200 rounded-xl overflow-hidden shadow-inner">
                 <div className="h-full w-full transform scale-[0.9] origin-top rounded-xl overflow-y-auto">
                     <PublicProposalView proposal={{...proposalForPreview, themeId: 999}} />
                 </div>
            </div>
        </div>
    );
};

export default ThemeEditor;