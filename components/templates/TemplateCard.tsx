import React, { useState } from 'react';
import { Template, BlockType, Proposal, ProposalStatus, AppView } from '../../types';
import Icon from '../icons/Icon';
import PublicProposalView from '../proposals/PublicProposalView';
import { useAppContext } from '../../contexts/AppContext';

const PreviewModal: React.FC<{ template: Template; onClose: () => void; }> = ({ template, onClose }) => {
    const proposalForPreview: Proposal = {
        id: template.id, title: template.title, blocks: template.blocks,
        clientId: 1, status: ProposalStatus.DRAFT, totalViews: 0, value: 0, currency: 'USD', lastActivity: '', createdAt: '',
    };
    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full h-full max-w-6xl flex flex-col">
                <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-sm p-4 flex justify-between items-center rounded-t-lg no-print">
                    <h3 className="font-bold text-white text-lg truncate pr-4">Vista Previa: {template.title}</h3>
                    <button onClick={onClose} className="text-white bg-slate-700 rounded-full p-2 hover:bg-slate-600 flex-shrink-0">
                        <Icon name="X" className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-grow h-full overflow-y-auto">
                    <PublicProposalView proposal={proposalForPreview} />
                </div>
            </div>
        </div>
    )
}


const TemplateCard: React.FC<{ template: Template }> = ({ template }) => {
    const { navigate } = useAppContext();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    
    const handleUseTemplate = () => {
        const newProposalFromTemplate: Partial<Proposal> = {
            title: `Nueva Propuesta (de ${template.title})`,
            blocks: JSON.parse(JSON.stringify(template.blocks)), // Deep copy blocks
            status: ProposalStatus.DRAFT,
        };
        navigate(AppView.PROPOSAL_EDITOR, newProposalFromTemplate);
    };

    const renderMiniPreview = (block: any) => {
        switch (block.type) {
            case BlockType.COVER:
                return <div className="h-full w-full bg-slate-700 flex flex-col justify-center items-center text-center p-2 text-white" style={{ backgroundImage: `url(${block.content.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="text-xs font-bold">{block.content.superTitle}</div>
                    <div className="text-xl font-black">{block.content.text}</div>
                </div>;
            case BlockType.SECTION_HEADER:
                return <div className="text-yellow-400 text-center font-bold text-lg py-4">{block.content.text}</div>;
            case BlockType.TWO_COLUMN_IMAGE_TEXT:
                return <div className="flex gap-2 p-2">
                    <div className="flex-1 bg-slate-800 rounded-sm p-1"><div className="w-full h-8 bg-slate-700 mb-1"></div><div className="h-1 w-3/4 bg-slate-600"></div></div>
                    <div className="flex-1 bg-slate-800 rounded-sm p-1"><div className="w-full h-8 bg-slate-700 mb-1"></div><div className="h-1 w-3/4 bg-slate-600"></div></div>
                </div>;
            default:
                return <div className="h-8 bg-slate-800 m-2 rounded-sm"></div>
        }
    }

    return (
        <>
        {isPreviewOpen && <PreviewModal template={template} onClose={() => setIsPreviewOpen(false)} />}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col group transition-shadow hover:shadow-lg">
            <div className="relative h-48 bg-slate-900 rounded-t-xl overflow-hidden cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                <div className="absolute inset-0 transform scale-[0.15] origin-top-left">
                    <div className="w-[1280px] h-[720px] bg-slate-900">
                         {template.blocks.slice(0, 3).map(block => <div key={block.id}>{renderMiniPreview(block)}</div>)}
                    </div>
                </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white font-semibold flex items-center bg-black/50 px-3 py-1 rounded-full text-sm">
                        <Icon name="Eye" className="w-4 h-4 mr-2" />
                        Vista Previa
                    </div>
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-indigo-600 uppercase flex items-center"><Icon name="Shapes" className="w-3 h-3 mr-1.5"/>{template.category}</p>
                    <h3 className="font-bold text-slate-800 mt-1">{template.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{template.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                     <button onClick={handleUseTemplate} className="flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                        <Icon name="CopyPlus" className="w-4 h-4 mr-2" />
                        Usar
                    </button>
                    <div className="flex items-center space-x-1">
                         <button onClick={() => navigate(AppView.TEMPLATE_EDITOR, template)} className="p-2 text-slate-400 hover:text-slate-700" title="Editar"><Icon name="FileText" className="w-4 h-4" /></button>
                         <button className="p-2 text-slate-400 hover:text-slate-700" title="Duplicar"><Icon name="Copy" className="w-4 h-4" /></button>
                         <button className="p-2 text-slate-400 hover:text-red-500" title="Eliminar"><Icon name="Trash2" className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default TemplateCard;