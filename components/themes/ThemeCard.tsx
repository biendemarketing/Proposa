
import React, { useState } from 'react';
import { Theme, AppView, Proposal, ProposalStatus } from '../../types';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';
import PublicProposalView from '../proposals/PublicProposalView';
import { mockProposals } from '../../data/mockData';


const ThemePreviewModal: React.FC<{ theme: Theme; onClose: () => void }> = ({ theme, onClose }) => {
    // Create a dummy proposal for previewing the theme
    const proposalForPreview: Proposal = {
        ...(mockProposals.find(p => p.id === 5) || mockProposals[0]), // Use a detailed proposal for better preview
        themeId: theme.id,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full h-full max-w-6xl flex flex-col">
                 <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-sm p-4 flex justify-between items-center rounded-t-lg no-print">
                    <h3 className="font-bold text-white text-lg truncate pr-4">Vista Previa del Tema: {theme.name}</h3>
                    <button onClick={onClose} className="text-white bg-slate-700 rounded-full p-2 hover:bg-slate-600 flex-shrink-0">
                        <Icon name="X" className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-grow h-full overflow-y-auto">
                    <PublicProposalView proposal={proposalForPreview} />
                </div>
            </div>
        </div>
    );
};

interface ThemeCardProps {
    theme: Theme;
    onSetDefault: (id: number) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onSetDefault }) => {
    const { navigate } = useAppContext();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const backgroundSwatchStyle = theme.colors.backgroundType === 'gradient' && theme.colors.backgroundGradient
        ? { background: theme.colors.backgroundGradient }
        : { backgroundColor: theme.colors.background };

    return (
        <>
        {isPreviewOpen && <ThemePreviewModal theme={theme} onClose={() => setIsPreviewOpen(false)} />}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col group transition-shadow hover:shadow-lg">
            <div className="p-4">
                <h3 className="font-bold text-slate-800">{theme.name}</h3>
                {theme.isDefault && <span className="text-xs font-semibold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Padrão</span>}
            </div>

            <div className="px-4 py-6 border-y border-slate-200 cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                <div className="flex items-center justify-between">
                     <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" title={`Primary: ${theme.colors.primary}`} style={{ backgroundColor: theme.colors.primary }}></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" title={`Background: ${theme.colors.background}`} style={backgroundSwatchStyle}></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" title={`Heading: ${theme.colors.heading}`} style={{ backgroundColor: theme.colors.heading }}></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" title={`Text: ${theme.colors.text}`} style={{ backgroundColor: theme.colors.text }}></div>
                    </div>
                     <div className="text-right">
                        <p className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.heading, backgroundColor: 'transparent' }}>Aa</p>
                        <p className="text-md" style={{ fontFamily: theme.fonts.body, color: theme.colors.text, backgroundColor: 'transparent' }}>Aa</p>
                    </div>
                </div>
            </div>

            <div className="p-3 flex items-center justify-between bg-slate-50 rounded-b-xl">
                {!theme.isDefault && (
                    <button onClick={() => onSetDefault(theme.id)} className="text-xs font-semibold text-slate-500 hover:text-indigo-600">
                        Usar como Padrão
                    </button>
                )}
                 <div className="flex-grow"></div>
                <div className="flex items-center space-x-1">
                    <button onClick={() => setIsPreviewOpen(true)} className="p-2 text-slate-400 hover:text-slate-700" title="Vista Previa"><Icon name="Eye" className="w-4 h-4" /></button>
                    <button onClick={() => navigate(AppView.THEME_EDITOR, theme)} className="p-2 text-slate-400 hover:text-slate-700" title="Editar"><Icon name="FileText" className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500" title="Eliminar"><Icon name="Trash2" className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
        </>
    );
};

export default ThemeCard;