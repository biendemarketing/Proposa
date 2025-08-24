import React, { useState, useMemo, useEffect } from 'react';
import { mockThemes, mockTemplates } from '../../data/mockData';
import { Proposal, ProposalBlock, BlockType, AppView, ProposalStatus, BlockContent, TwoColumnItem, FeatureItem, TextWithImageItem, IncludedItem, Template, IconCardItem, ProductCategoryItem, PromoBannerItem, PortfolioItem, GalleryImage, PriceListItem, PriceTablePackage, DarkFooterItem, Client } from '../../types';
import Icon, { ICONS } from '../icons/Icon';
import { generateProposalSection } from '../../services/geminiService';
import { useAppContext } from '../../contexts/AppContext';
import PublicProposalView from './PublicProposalView';
import ClientModal from '../clients/ClientModal';

interface ContentEditorProps {
    proposal?: Proposal;
    template?: Template;
}

const AiGenerateModal: React.FC<{ onGenerate: (content: string) => void; onClose: () => void }> = ({ onGenerate, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        const content = await generateProposalSection(prompt);
        onGenerate(content);
        setIsLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center"><Icon name="Bot" className="mr-2" /> Generar con IA</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><Icon name="X" /></button>
                </div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ej: 'Escribe un resumen ejecutivo para un proyecto de rediseño web enfocado en mejorar la participación del usuario y las tasas de conversión.'"
                    className="w-full h-32 p-2 border border-slate-300 rounded-md mb-4 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="flex justify-end">
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center">
                        {isLoading ? 'Generando...' : 'Generar Contenido'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PreviewModal: React.FC<{ content: Proposal | Template; onClose: () => void; }> = ({ content, onClose }) => {
    const proposalForPreview: Proposal = {
        id: 'id' in content ? content.id : Date.now(),
        title: content.title,
        clientId: 'clientId' in content ? content.clientId : 1,
        status: 'status' in content ? content.status : ProposalStatus.DRAFT,
        blocks: content.blocks,
        themeId: 'themeId' in content ? content.themeId : 1,
        totalViews: 0, value: 0, currency: 'USD', lastActivity: '', createdAt: '',
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full h-full max-w-6xl flex flex-col">
                <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-sm p-4 flex justify-between items-center rounded-t-lg no-print">
                    <h3 className="font-bold text-white text-lg truncate pr-4">Vista Previa: {content.title}</h3>
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

const IconPickerModal: React.FC<{ onSelect: (iconName: string) => void; onClose: () => void; }> = ({ onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Seleccionar un Ícono</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><Icon name="X" /></button>
                </div>
                <div className="overflow-y-auto">
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mt-4 p-4 bg-slate-50 border rounded-lg">
                        {Object.keys(ICONS).map(iconName => (
                            <div key={iconName} onClick={() => { onSelect(iconName); onClose(); }} className="flex flex-col items-center text-center p-2 rounded-md hover:bg-indigo-100 cursor-pointer border border-transparent hover:border-indigo-300" title={iconName}>
                                <Icon name={iconName} className="w-8 h-8 text-slate-600 mb-2" />
                                <span className="text-xs text-slate-500 break-all truncate w-full">{iconName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const EditorInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; }> = ({ label, value, onChange, placeholder }) => (
    <div className="w-full">
        <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
        <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800" />
    </div>
);

const EditorTextarea: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; rows?: number }> = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div className="w-full">
        <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
        <textarea value={value || ''} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800" />
    </div>
);

const BlockEditorWrapper: React.FC<{ title: string; blockId: string; onDelete: (blockId: string) => void; children: React.ReactNode; }> = ({ title, blockId, onDelete, children }) => (
    <div className="relative group p-4 border border-slate-200 rounded-lg bg-slate-50 my-2 transition-shadow hover:shadow-md">
        <div className="flex justify-between items-center mb-3 pb-2 border-b">
            <h4 className="font-semibold text-sm text-slate-700 tracking-wide">{title}</h4>
            <button onClick={() => onDelete(blockId)} className="p-1.5 rounded-md hover:bg-slate-200" title="Eliminar bloque"><Icon name="Trash2" className="w-4 h-4 text-red-500" /></button>
        </div>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const ProposalEditor: React.FC<ContentEditorProps> = ({ proposal: proposalProp, template: templateProp }) => {
    const { navigate, view, clients, addClient } = useAppContext();
    const isTemplateMode = templateProp !== undefined || view === AppView.TEMPLATE_EDITOR;

    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState<ProposalBlock[]>([]);
    const [selectedClient, setSelectedClient] = useState(clients[0]?.id || 0);
    const [selectedThemeId, setSelectedThemeId] = useState(mockThemes.find(t => t.isDefault)?.id || 1);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [templateSelectorVisible, setTemplateSelectorVisible] = useState(!proposalProp && !isTemplateMode);

    useEffect(() => {
        if (isTemplateMode) {
            setTitle(templateProp?.title || 'Nueva Plantilla');
            setBlocks(templateProp?.blocks || []);
            setDescription(templateProp?.description || '');
            setCategory(templateProp?.category || 'General');
        } else {
            setTitle(proposalProp?.title || 'Nueva Propuesta');
            setBlocks(proposalProp?.blocks || []);
            setSelectedClient(proposalProp?.clientId || (clients[0]?.id || 0));
            setSelectedThemeId(proposalProp?.themeId || (mockThemes.find(t => t.isDefault)?.id || 1));
        }
    }, [proposalProp, templateProp, isTemplateMode, clients]);
    
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [iconPickerState, setIconPickerState] = useState<{ isOpen: boolean; onSelect: (iconName: string) => void }>({ isOpen: false, onSelect: () => {} });

    const openIconPicker = (onSelect: (iconName: string) => void) => {
        setIconPickerState({ isOpen: true, onSelect });
    };
    
    const handleSaveNewClient = (client: Client) => {
        addClient(client);
        setSelectedClient(client.id);
        setIsClientModalOpen(false);
    };

    const applyTemplate = (template: Template) => {
        setTitle(template.title);
        setBlocks(JSON.parse(JSON.stringify(template.blocks))); // deep copy
        setTemplateSelectorVisible(false);
    };


    const currentContentState = useMemo(() => {
        if (isTemplateMode) {
            return {
                id: templateProp?.id || Date.now(),
                title,
                description,
                category,
                blocks
            } as Template;
        }
        return {
            id: proposalProp?.id || Date.now(),
            title,
            clientId: selectedClient,
            status: proposalProp?.status || ProposalStatus.DRAFT,
            totalViews: proposalProp?.totalViews || 0,
            value: proposalProp?.value || 0,
            currency: proposalProp?.currency || 'USD',
            lastActivity: new Date().toISOString(),
            createdAt: proposalProp?.createdAt || new Date().toISOString(),
            blocks,
            themeId: selectedThemeId,
            publicLink: proposalProp?.publicLink || `new-${Date.now()}`
        } as Proposal;
    }, [title, selectedClient, blocks, proposalProp, isTemplateMode, templateProp, description, category, selectedThemeId]);

    const updateBlockContent = (blockId: string, newContent: Partial<BlockContent>) => {
        setBlocks(blocks.map(b => b.id === blockId ? { ...b, content: { ...b.content, ...newContent } } : b));
    };

    const addBlock = (type: BlockType) => {
        setTemplateSelectorVisible(false);
        const newBlock: ProposalBlock = { id: `block-${Date.now()}`, type, content: {} };
        // Add default content for each block type to avoid undefined issues
        switch(type) {
            case BlockType.TEXT: newBlock.content = { text: "Escribe tu contenido aquí."}; break;
            case BlockType.IMAGE: newBlock.content = { imageUrl: "https://picsum.photos/1200/600" }; break;
            case BlockType.ITEMS: newBlock.content = { items: [] }; break;
            case BlockType.COVER: newBlock.content = { superTitle: "PROPUESTA", text: "Título", subTitle: "Descripción", imageUrl: "https://i.imgur.com/gY23AhT.jpeg" }; break;
            case BlockType.SECTION_HEADER: newBlock.content = { text: "Encabezado de Sección" }; break;
            case BlockType.TWO_COLUMN_IMAGE_TEXT: newBlock.content = { columns: [{ id: `col-${Date.now()}`, title: "Título Columna", text: "Texto", imageUrl: "https://picsum.photos/800/600" }]}; break;
            case BlockType.FOUR_COLUMN_FEATURES: newBlock.content = { features: [{ id: `feat-${Date.now()}`, title: "Característica", items: ["Item 1"], imageUrl: "https://picsum.photos/400/300" }]}; break;
            case BlockType.FOUR_COLUMN_ICON_CARDS: newBlock.content = { iconCards: [{ id: `ic-${Date.now()}`, title: "Título Tarjeta", text: "Descripción", icon: "Lightbulb" }]}; break;
            case BlockType.TEXT_WITH_RIGHT_IMAGE: newBlock.content = { textWithImage: [{ id: `ti-${Date.now()}`, title: "Título", text: "Texto", imageUrl: "https://picsum.photos/800/800" }]}; break;
            case BlockType.INCLUDED_ITEMS_WITH_PRICE: newBlock.content = { includedItems: [{id:`ii-${Date.now()}`, text: "Servicio incluido", icon: "CheckCircle"}], price: 0, priceTitle: "Costo Total"}; break;
            case BlockType.FOOTER: newBlock.content = { phone: "+1", email: "email@example.com", address: "Dirección", logoUrl: "https://i.imgur.com/xL6Q9kL.png"}; break;
            case BlockType.PRODUCT_CATEGORIES: newBlock.content = { productCategories: [{ id: `pc-${Date.now()}`, title: "Categoría", subtitle: "Productos", imageUrl: "https://picsum.photos/200" }]}; break;
            case BlockType.PROMO_BANNER: newBlock.content = { promoBanners: [{ id: `pb-${Date.now()}`, superTitle: "OFERTA", title: "Título del Banner", linkText: "Ver Más", linkUrl: "#", imageUrl: "https://picsum.photos/600/400", layout: 'left' }]}; break;
            case BlockType.CALL_TO_ACTION: newBlock.content = { title: "Llamada a la Acción", subTitle: "Descripción convincente.", buttonText: "Empezar", buttonUrl: "#", imageUrl: "https://picsum.photos/1200/400" }; break;
            case BlockType.FOOTER_DARK: newBlock.content = { darkFooterItems: [{ id: `df-${Date.now()}`, icon: "Truck", title: "Título", text: "Descripción" }]}; break;
            case BlockType.POST: newBlock.content = { title: "Título del Post", imageUrl: "https://picsum.photos/800/400", body: "Escribe aquí el contenido de tu post o artículo..." }; break;
            case BlockType.PORTFOLIO: newBlock.content = { portfolioItems: [{ id: `pi-${Date.now()}`, title: "Proyecto", description: "Descripción del proyecto.", imageUrl: "https://picsum.photos/600/400" }]}; break;
            case BlockType.GALLERY: newBlock.content = { galleryImages: [{ id: `gi-${Date.now()}`, imageUrl: "https://picsum.photos/400", caption: "Pie de foto" }]}; break;
            case BlockType.PRICE_LIST: newBlock.content = { priceListItems: [{ id: `pl-${Date.now()}`, service: "Servicio", description: "Descripción del servicio.", price: "$100" }]}; break;
            case BlockType.PRICE_TABLE: newBlock.content = { priceTablePackages: [{ id: `pt-${Date.now()}`, name: "Paquete", price: "$50", frequency: "/mes", features: ["Característica 1"], isFeatured: false, buttonText: "Elegir", buttonUrl: "#" }]}; break;
        }
        setBlocks([...blocks, newBlock]);
    };
    
    const deleteBlock = (blockId: string) => {
        setBlocks(blocks.filter(b => b.id !== blockId));
    }
    
    const shareProposal = () => {
        if (!isTemplateMode) {
             navigate(`public:${(currentContentState as Proposal).publicLink}`, currentContentState);
        }
    };
    
    const saveTemplate = () => {
        console.log("Saving template:", currentContentState);
        alert("¡Plantilla guardada exitosamente!");
        navigate(AppView.TEMPLATES);
    }
    
    const saveAsTemplate = () => {
         const newTemplate: Template = {
            id: Date.now(),
            title: `${title} (Copia)`,
            description: "Plantilla creada desde una propuesta.",
            category: "General",
            blocks: blocks
        };
        console.log("Saving new template:", newTemplate);
        alert(`¡Propuesta "${title}" guardada como nueva plantilla!`);
        navigate(AppView.TEMPLATE_EDITOR, newTemplate);
    }

    const downloadPdf = () => {
        setIsPreviewOpen(true);
        setTimeout(() => window.print(), 500);
    }
    
    const renderBlockEditor = (block: ProposalBlock) => {
        switch (block.type) {
             case BlockType.COVER:
                return <BlockEditorWrapper title="Portada" blockId={block.id} onDelete={deleteBlock}>
                    <EditorInput label="Super Título" value={block.content.superTitle!} onChange={e => updateBlockContent(block.id, { superTitle: e.target.value })} />
                    <EditorInput label="Título Principal" value={block.content.text!} onChange={e => updateBlockContent(block.id, { text: e.target.value })} />
                    <EditorTextarea label="Subtítulo / Descripción" value={block.content.subTitle!} onChange={e => updateBlockContent(block.id, { subTitle: e.target.value })} />
                    <EditorInput label="URL de Imagen de Fondo" value={block.content.imageUrl!} onChange={e => updateBlockContent(block.id, { imageUrl: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <EditorInput label="Cliente" value={block.content.client!} onChange={e => updateBlockContent(block.id, { client: e.target.value })} />
                        <EditorInput label="Actividad" value={block.content.activity!} onChange={e => updateBlockContent(block.id, { activity: e.target.value })} />
                        <EditorInput label="Tema" value={block.content.theme!} onChange={e => updateBlockContent(block.id, { theme: e.target.value })} />
                    </div>
                </BlockEditorWrapper>;
            case BlockType.SECTION_HEADER:
                 return <div className="relative group p-2"><input type="text" placeholder="Encabezado de Sección" value={block.content.text || ''} onChange={(e) => updateBlockContent(block.id, { text: e.target.value })} className="text-2xl font-bold w-full border-none focus:ring-0 p-2 text-center font-serif text-yellow-600 bg-transparent" /><button onClick={() => deleteBlock(block.id)} className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100"><Icon name="Trash2" className="w-4 h-4 text-red-500" /></button></div>;
            case BlockType.TEXT:
                 return <BlockEditorWrapper title="Texto" blockId={block.id} onDelete={deleteBlock}>
                    <EditorTextarea label="Contenido de Texto" value={block.content.text || ''} onChange={(e) => updateBlockContent(block.id, { text: e.target.value })} rows={6} />
                 </BlockEditorWrapper>;
            case BlockType.IMAGE:
                return <BlockEditorWrapper title="Imagen" blockId={block.id} onDelete={deleteBlock}>
                    <EditorInput label="URL de Imagen" value={block.content.imageUrl!} onChange={e => updateBlockContent(block.id, { imageUrl: e.target.value })} />
                </BlockEditorWrapper>;
             case BlockType.TWO_COLUMN_IMAGE_TEXT: {
                const columns = block.content.columns || [];
                const handleUpdate = (index: number, newContent: Partial<TwoColumnItem>) => {
                    const newColumns = [...columns]; newColumns[index] = { ...newColumns[index], ...newContent }; updateBlockContent(block.id, { columns: newColumns });
                };
                const handleAdd = () => updateBlockContent(block.id, { columns: [...columns, { id: `col-${Date.now()}`, title: "Nuevo Título", text: "Nuevo texto", imageUrl: "https://picsum.photos/800/600" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { columns: columns.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Dos Columnas (Imagen y Texto)" blockId={block.id} onDelete={deleteBlock}>{columns.map((col, index) => (
                        <div key={col.id} className="p-3 border rounded-md bg-white relative space-y-2"><button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={col.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorTextarea label="Texto" value={col.text} onChange={e => handleUpdate(index, { text: e.target.value })} />
                            <EditorInput label="URL de Imagen" value={col.imageUrl} onChange={e => handleUpdate(index, { imageUrl: e.target.value })} />
                        </div>))}<button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Columna</button>
                </BlockEditorWrapper>;
            }
            case BlockType.FOUR_COLUMN_FEATURES: {
                const features = block.content.features || [];
                const handleUpdateFeature = (fIndex: number, newContent: Partial<FeatureItem>) => {
                    const newFeatures = [...features]; newFeatures[fIndex] = { ...newFeatures[fIndex], ...newContent }; updateBlockContent(block.id, { features: newFeatures });
                };
                const handleAddItem = (fIndex: number) => {
                    const newFeatures = [...features]; newFeatures[fIndex].items = [...newFeatures[fIndex].items, 'Nuevo Item']; updateBlockContent(block.id, { features: newFeatures });
                };
                const handleUpdateItem = (fIndex: number, iIndex: number, text: string) => {
                    const newFeatures = [...features]; newFeatures[fIndex].items[iIndex] = text; updateBlockContent(block.id, { features: newFeatures });
                };
                const handleRemoveItem = (fIndex: number, iIndex: number) => {
                    const newFeatures = [...features]; newFeatures[fIndex].items = newFeatures[fIndex].items.filter((_, idx) => idx !== iIndex); updateBlockContent(block.id, { features: newFeatures });
                };
                const handleAddFeature = () => updateBlockContent(block.id, { features: [...features, { id: `feat-${Date.now()}`, title: "Nueva Característica", items: ["Item 1"], imageUrl: "https://picsum.photos/400/300" }] });
                const handleRemoveFeature = (index: number) => updateBlockContent(block.id, { features: features.filter((_, i) => i !== index) });

                return <BlockEditorWrapper title="Cuatro Columnas (Características)" blockId={block.id} onDelete={deleteBlock}>
                    {features.map((feat, fIndex) => (
                        <div key={feat.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemoveFeature(fIndex)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={feat.title} onChange={e => handleUpdateFeature(fIndex, { title: e.target.value })} />
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Icono (Opcional)</label>
                                <button onClick={() => openIconPicker((iconName) => handleUpdateFeature(fIndex, { icon: iconName }))} className="flex items-center w-full text-left p-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                                    {feat.icon ? <><Icon name={feat.icon} className="w-5 h-5 mr-2 text-indigo-600" /> <span className="text-slate-800">{feat.icon}</span></> : <span className="text-slate-400">Seleccionar un ícono</span>}
                                </button>
                            </div>
                            <EditorInput label="URL de Imagen" value={feat.imageUrl} onChange={e => handleUpdateFeature(fIndex, { imageUrl: e.target.value })} />
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Items</label>
                                <div className="space-y-1">
                                    {feat.items.map((item, iIndex) => (
                                        <div key={iIndex} className="flex items-center gap-2">
                                            <input type="text" value={item} onChange={e => handleUpdateItem(fIndex, iIndex, e.target.value)} className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800" />
                                            <button onClick={() => handleRemoveItem(fIndex, iIndex)} className="p-1.5 rounded-md hover:bg-slate-200"><Icon name="Trash2" className="w-4 h-4 text-red-500" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => handleAddItem(fIndex)} className="mt-2 text-xs text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-3 h-3 mr-1"/>Añadir Item</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddFeature} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Característica</button>
                </BlockEditorWrapper>;
            }
             case BlockType.TEXT_WITH_RIGHT_IMAGE: {
                const items = block.content.textWithImage || [];
                const handleUpdate = (index: number, newContent: Partial<TextWithImageItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { textWithImage: newItems });
                };
                const handleAdd = () => updateBlockContent(block.id, { textWithImage: [...items, { id: `ti-${Date.now()}`, title: "Nuevo Título", text: "Nuevo texto", imageUrl: "https://picsum.photos/800/800" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { textWithImage: items.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Texto con Imagen" blockId={block.id} onDelete={deleteBlock}>
                    {items.map((item, index) => (
                        <div key={item.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={item.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Icono (Opcional)</label>
                                <button onClick={() => openIconPicker((iconName) => handleUpdate(index, { icon: iconName }))} className="flex items-center w-full text-left p-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                                    {item.icon ? <><Icon name={item.icon} className="w-5 h-5 mr-2 text-indigo-600" /> <span className="text-slate-800">{item.icon}</span></> : <span className="text-slate-400">Seleccionar un ícono</span>}
                                </button>
                            </div>
                            <EditorTextarea label="Texto" value={item.text} onChange={e => handleUpdate(index, { text: e.target.value })} />
                            <EditorInput label="URL de Imagen" value={item.imageUrl} onChange={e => handleUpdate(index, { imageUrl: e.target.value })} />
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Sección</button>
                </BlockEditorWrapper>;
            }
            case BlockType.INCLUDED_ITEMS_WITH_PRICE: {
                const items = block.content.includedItems || [];
                const handleUpdateItem = (index: number, newContent: Partial<IncludedItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { includedItems: newItems });
                };
                const handleAddItem = () => updateBlockContent(block.id, { includedItems: [...items, { id: `ii-${Date.now()}`, text: "Nuevo Servicio", icon: "CheckCircle" }] });
                const handleRemoveItem = (index: number) => updateBlockContent(block.id, { includedItems: items.filter((_, i) => i !== index) });
                
                return <BlockEditorWrapper title="Items Incluidos con Precio" blockId={block.id} onDelete={deleteBlock}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <EditorInput label="Título del Precio" value={block.content.priceTitle!} onChange={e => updateBlockContent(block.id, { priceTitle: e.target.value })} />
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Precio</label>
                            <input type="number" value={block.content.price || 0} onChange={e => updateBlockContent(block.id, { price: parseFloat(e.target.value) })} className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800" />
                        </div>
                    </div>
                    <EditorTextarea label="Subtítulo del Precio" value={block.content.priceSubtitle!} onChange={e => updateBlockContent(block.id, { priceSubtitle: e.target.value })} rows={2}/>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mt-3 mb-2">Items Incluidos</label>
                        <div className="space-y-2">
                            {items.map((item, index) => (
                                <div key={item.id} className="flex items-end gap-2 p-2 border rounded-md bg-white">
                                    <div className="w-1/3">
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Icono</label>
                                        <button onClick={() => openIconPicker((iconName) => handleUpdateItem(index, { icon: iconName }))} className="flex items-center w-full text-left p-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                                           <Icon name={item.icon} className="w-5 h-5 mr-2 text-indigo-600" /> <span className="text-slate-800 truncate">{item.icon}</span>
                                        </button>
                                    </div>
                                    <div className="flex-grow">
                                       <EditorInput label="Texto" value={item.text} onChange={e => handleUpdateItem(index, { text: e.target.value })} />
                                    </div>
                                    <button onClick={() => handleRemoveItem(index)} className="p-1.5 rounded-md hover:bg-slate-200 mb-1 flex-shrink-0"><Icon name="Trash2" className="w-4 h-4 text-red-500" /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddItem} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Item</button>
                    </div>
                </BlockEditorWrapper>;
            }
             case BlockType.FOOTER:
                return <BlockEditorWrapper title="Pie de Página" blockId={block.id} onDelete={deleteBlock}>
                    <EditorInput label="Teléfono" value={block.content.phone!} onChange={e => updateBlockContent(block.id, { phone: e.target.value })} />
                    <EditorInput label="Email" value={block.content.email!} onChange={e => updateBlockContent(block.id, { email: e.target.value })} />
                    <EditorInput label="Dirección" value={block.content.address!} onChange={e => updateBlockContent(block.id, { address: e.target.value })} />
                    <EditorInput label="URL del Logo" value={block.content.logoUrl!} onChange={e => updateBlockContent(block.id, { logoUrl: e.target.value })} />
                </BlockEditorWrapper>;
            case BlockType.FOUR_COLUMN_ICON_CARDS: {
                const cards = block.content.iconCards || [];
                const handleUpdate = (index: number, newContent: Partial<IconCardItem>) => {
                    const newCards = [...cards]; newCards[index] = { ...newCards[index], ...newContent }; updateBlockContent(block.id, { iconCards: newCards });
                };
                const handleAdd = () => updateBlockContent(block.id, { iconCards: [...cards, { id: `ic-${Date.now()}`, title: "Nuevo Título", text: "Nueva descripción", icon: "Lightbulb" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { iconCards: cards.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Tarjetas de Íconos" blockId={block.id} onDelete={deleteBlock}>{cards.map((card, index) => (
                        <div key={card.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={card.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorTextarea label="Texto" value={card.text} onChange={e => handleUpdate(index, { text: e.target.value })} rows={2}/>
                             <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Icono</label>
                                <button onClick={() => openIconPicker((iconName) => handleUpdate(index, { icon: iconName }))} className="flex items-center w-full text-left p-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                                   <Icon name={card.icon} className="w-5 h-5 mr-2 text-indigo-600" /> <span className="text-slate-800 truncate">{card.icon}</span>
                                </button>
                            </div>
                        </div>))}<button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Tarjeta</button>
                </BlockEditorWrapper>;
            }
            case BlockType.PRODUCT_CATEGORIES: {
                const items = block.content.productCategories || [];
                const handleUpdate = (index: number, newContent: Partial<ProductCategoryItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { productCategories: newItems });
                };
                const handleAdd = () => updateBlockContent(block.id, { productCategories: [...items, { id: `pc-${Date.now()}`, title: "Categoría", subtitle: "Productos", imageUrl: "https://picsum.photos/200" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { productCategories: items.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Categorías de Productos" blockId={block.id} onDelete={deleteBlock}>
                    {items.map((item, index) => (
                        <div key={item.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={item.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorInput label="Subtítulo" value={item.subtitle} onChange={e => handleUpdate(index, { subtitle: e.target.value })} />
                            <EditorInput label="URL de Imagen" value={item.imageUrl} onChange={e => handleUpdate(index, { imageUrl: e.target.value })} />
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Categoría</button>
                </BlockEditorWrapper>;
            }
            case BlockType.PROMO_BANNER: {
                 const items = block.content.promoBanners || [];
                const handleUpdate = (index: number, newContent: Partial<PromoBannerItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { promoBanners: newItems });
                };
                const handleAdd = () => updateBlockContent(block.id, { promoBanners: [...items, { id: `pb-${Date.now()}`, superTitle: "OFERTA", title: "Título del Banner", linkText: "Ver Más", linkUrl: "#", imageUrl: "https://picsum.photos/600/400", layout: 'left' }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { promoBanners: items.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Banners Promocionales" blockId={block.id} onDelete={deleteBlock}>
                    {items.map((item, index) => (
                        <div key={item.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Super Título" value={item.superTitle} onChange={e => handleUpdate(index, { superTitle: e.target.value })} />
                            <EditorInput label="Título" value={item.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorInput label="Texto del Enlace" value={item.linkText} onChange={e => handleUpdate(index, { linkText: e.target.value })} />
                            <EditorInput label="URL del Enlace" value={item.linkUrl} onChange={e => handleUpdate(index, { linkUrl: e.target.value })} />
                            <EditorInput label="URL de Imagen" value={item.imageUrl} onChange={e => handleUpdate(index, { imageUrl: e.target.value })} />
                             <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Diseño</label>
                                <select value={item.layout || 'left'} onChange={e => handleUpdate(index, { layout: e.target.value as 'left' | 'center' | 'right' })} className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800">
                                    <option value="left">Izquierda</option>
                                    <option value="center">Centro</option>
                                    <option value="right">Derecha</option>
                                </select>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Banner</button>
                </BlockEditorWrapper>;
            }
            case BlockType.CALL_TO_ACTION: {
                return <BlockEditorWrapper title="Llamada a la Acción (CTA)" blockId={block.id} onDelete={deleteBlock}>
                    <EditorInput label="Título" value={block.content.title!} onChange={e => updateBlockContent(block.id, { title: e.target.value })} />
                    <EditorTextarea label="Subtítulo" value={block.content.subTitle!} onChange={e => updateBlockContent(block.id, { subTitle: e.target.value })} />
                    <EditorInput label="Texto del Botón" value={block.content.buttonText!} onChange={e => updateBlockContent(block.id, { buttonText: e.target.value })} />
                    <EditorInput label="URL del Botón" value={block.content.buttonUrl!} onChange={e => updateBlockContent(block.id, { buttonUrl: e.target.value })} />
                    <EditorInput label="URL de Imagen de Fondo" value={block.content.imageUrl!} onChange={e => updateBlockContent(block.id, { imageUrl: e.target.value })} />
                </BlockEditorWrapper>;
            }
             case BlockType.FOOTER_DARK: {
                const items = block.content.darkFooterItems || [];
                const handleUpdate = (index: number, newContent: Partial<DarkFooterItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { darkFooterItems: newItems });
                };
                const handleAdd = () => updateBlockContent(block.id, { darkFooterItems: [...items, { id: `df-${Date.now()}`, icon: "Truck", title: "Título", text: "Descripción" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { darkFooterItems: items.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Pie de Página Oscuro" blockId={block.id} onDelete={deleteBlock}>
                    {items.map((item, index) => (
                        <div key={item.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={item.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorTextarea label="Texto" value={item.text} onChange={e => handleUpdate(index, { text: e.target.value })} rows={2} />
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Icono</label>
                                <button onClick={() => openIconPicker((iconName) => handleUpdate(index, { icon: iconName }))} className="flex items-center w-full text-left p-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                                   <Icon name={item.icon} className="w-5 h-5 mr-2 text-indigo-600" /> <span className="text-slate-800 truncate">{item.icon}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Item</button>
                </BlockEditorWrapper>;
            }
             case BlockType.POST:
                return <BlockEditorWrapper title="Post / Artículo" blockId={block.id} onDelete={deleteBlock}>
                    <EditorInput label="Título" value={block.content.title!} onChange={e => updateBlockContent(block.id, { title: e.target.value })} />
                    <EditorInput label="URL de Imagen Destacada" value={block.content.imageUrl!} onChange={e => updateBlockContent(block.id, { imageUrl: e.target.value })} />
                    <EditorTextarea label="Cuerpo del Post" value={block.content.body!} onChange={e => updateBlockContent(block.id, { body: e.target.value })} rows={10} />
                </BlockEditorWrapper>;
             case BlockType.PORTFOLIO: {
                const items = block.content.portfolioItems || [];
                const handleUpdate = (index: number, newContent: Partial<PortfolioItem>) => {
                    const newItems = [...items]; newItems[index] = { ...newItems[index], ...newContent }; updateBlockContent(block.id, { portfolioItems: newItems });
                };
                const handleAdd = () => updateBlockContent(block.id, { portfolioItems: [...items, { id: `pi-${Date.now()}`, title: "Proyecto", description: "Descripción del proyecto.", imageUrl: "https://picsum.photos/600/400" }] });
                const handleRemove = (index: number) => updateBlockContent(block.id, { portfolioItems: items.filter((_, i) => i !== index) });
                return <BlockEditorWrapper title="Portafolio" blockId={block.id} onDelete={deleteBlock}>
                    {items.map((item, index) => (
                        <div key={item.id} className="p-3 border rounded-md bg-white relative space-y-2">
                            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                            <EditorInput label="Título" value={item.title} onChange={e => handleUpdate(index, { title: e.target.value })} />
                            <EditorTextarea label="Descripción" value={item.description} onChange={e => handleUpdate(index, { description: e.target.value })} rows={2} />
                            <EditorInput label="URL de Imagen" value={item.imageUrl} onChange={e => handleUpdate(index, { imageUrl: e.target.value })} />
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Proyecto</button>
                </BlockEditorWrapper>;
            }
             case BlockType.PRICE_TABLE: {
                const packages = block.content.priceTablePackages || [];
                const handleUpdatePackage = (pIndex: number, newContent: Partial<PriceTablePackage>) => {
                    const newPackages = [...packages]; newPackages[pIndex] = { ...newPackages[pIndex], ...newContent }; updateBlockContent(block.id, { priceTablePackages: newPackages });
                };
                const handleUpdateFeature = (pIndex: number, fIndex: number, text: string) => {
                    const newPackages = [...packages]; newPackages[pIndex].features[fIndex] = text; updateBlockContent(block.id, { priceTablePackages: newPackages });
                };
                 const handleAddFeature = (pIndex: number) => {
                    const newPackages = [...packages]; newPackages[pIndex].features.push("Nueva Característica"); updateBlockContent(block.id, { priceTablePackages: newPackages });
                };
                 const handleRemoveFeature = (pIndex: number, fIndex: number) => {
                    const newPackages = [...packages]; newPackages[pIndex].features = newPackages[pIndex].features.filter((_, i) => i !== fIndex); updateBlockContent(block.id, { priceTablePackages: newPackages });
                };
                const handleAddPackage = () => updateBlockContent(block.id, { priceTablePackages: [...packages, { id: `pt-${Date.now()}`, name: "Paquete", price: "$50", frequency: "/mes", features: ["Característica 1"], isFeatured: false, buttonText: "Elegir", buttonUrl: "#" }] });
                const handleRemovePackage = (index: number) => updateBlockContent(block.id, { priceTablePackages: packages.filter((_, i) => i !== index) });

                return <BlockEditorWrapper title="Tabla de Precios" blockId={block.id} onDelete={deleteBlock}>
                    {packages.map((pkg, pIndex) => (
                        <div key={pkg.id} className="p-3 border rounded-md bg-white relative space-y-2">
                             <button onClick={() => handleRemovePackage(pIndex)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"><Icon name="X" className="w-4 h-4" /></button>
                             <EditorInput label="Nombre Paquete" value={pkg.name} onChange={e => handleUpdatePackage(pIndex, { name: e.target.value })} />
                             <EditorInput label="Precio" value={pkg.price} onChange={e => handleUpdatePackage(pIndex, { price: e.target.value })} />
                             <EditorInput label="Frecuencia" value={pkg.frequency} onChange={e => handleUpdatePackage(pIndex, { frequency: e.target.value })} />
                             <EditorInput label="Texto Botón" value={pkg.buttonText} onChange={e => handleUpdatePackage(pIndex, { buttonText: e.target.value })} />
                             <label><input type="checkbox" checked={pkg.isFeatured} onChange={e => handleUpdatePackage(pIndex, { isFeatured: e.target.checked })} /> Destacado</label>
                             <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Características</label>
                                {pkg.features.map((feat, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-2 mb-1">
                                        <input type="text" value={feat} onChange={e => handleUpdateFeature(pIndex, fIndex, e.target.value)} className="w-full text-sm p-2 border border-slate-300 rounded-md bg-white"/>
                                        <button onClick={() => handleRemoveFeature(pIndex, fIndex)}><Icon name="Trash2" className="w-4 h-4 text-red-500"/></button>
                                    </div>
                                ))}
                                <button onClick={() => handleAddFeature(pIndex)} className="text-xs text-indigo-600">+ Añadir Característica</button>
                             </div>
                        </div>
                    ))}
                    <button onClick={handleAddPackage} className="mt-2 text-sm text-indigo-600 font-semibold flex items-center"><Icon name="Plus" className="w-4 h-4 mr-1"/>Añadir Paquete</button>
                </BlockEditorWrapper>;
            }
            default:
                 return <BlockEditorWrapper title={block.type} blockId={block.id} onDelete={deleteBlock}><p className="text-sm text-slate-500">Editor para este tipo de bloque no implementado.</p></BlockEditorWrapper>
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            {isClientModalOpen && <ClientModal client={null} onClose={() => setIsClientModalOpen(false)} onSave={handleSaveNewClient} />}
            {isAiModalOpen && <AiGenerateModal onGenerate={() => {}} onClose={() => setIsAiModalOpen(false)} />}
            {isPreviewOpen && <PreviewModal content={currentContentState} onClose={() => setIsPreviewOpen(false)} />}
            {iconPickerState.isOpen && <IconPickerModal onSelect={iconPickerState.onSelect} onClose={() => setIconPickerState({ isOpen: false, onSelect: () => {} })} />}

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl sm:text-3xl font-bold text-slate-800 border-none focus:ring-0 p-0 bg-transparent font-serif w-full"
                    placeholder={isTemplateMode ? 'Título de la Plantilla' : 'Título de la Propuesta'}
                />
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button onClick={() => setIsPreviewOpen(true)} className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"><Icon name="Eye" className="w-4 h-4 mr-2" />Vista Previa</button>
                    {!isTemplateMode && <button onClick={downloadPdf} className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"><Icon name="FileDown" className="w-4 h-4 mr-2" />Descargar</button>}
                    {isTemplateMode ? (
                        <button onClick={saveTemplate} className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar Plantilla</button>
                    ) : (
                        <button onClick={shareProposal} className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Compartir</button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-8 space-y-4">
                 {isTemplateMode ? (
                     <div className="space-y-4 pb-4 border-b">
                        <EditorInput label="Descripción de la Plantilla" value={description} onChange={e => setDescription(e.target.value)} placeholder="Ej: Para propuestas de marketing digital B2B" />
                        <EditorInput label="Categoría" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ej: Marketing" />
                     </div>
                 ) : (
                     <div className="space-y-4 pb-4 border-b">
                        <div className="flex items-center flex-wrap gap-4">
                            <label htmlFor="client" className="font-semibold text-slate-700">Cliente:</label>
                            <select
                                id="client"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(Number(e.target.value))}
                                className="border border-slate-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800 flex-grow"
                            >
                                {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
                            </select>
                            <button onClick={() => setIsClientModalOpen(true)} className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                                <Icon name="UserPlus" className="w-4 h-4 mr-1" />
                                Nuevo
                            </button>
                        </div>
                         <div>
                            <label className="font-semibold text-slate-700 mb-2 block">Tema:</label>
                            <div className="flex items-center gap-3 flex-wrap">
                                {mockThemes.map(t => {
                                     const bgStyle = t.colors.backgroundType === 'gradient' ? { background: t.colors.backgroundGradient } : { backgroundColor: t.colors.background };
                                    return (
                                        <button key={t.id} onClick={() => setSelectedThemeId(t.id)} className={`w-10 h-10 rounded-full focus:outline-none transition-transform transform hover:scale-110 ${selectedThemeId === t.id ? 'ring-2 ring-offset-2 ring-indigo-500' : 'ring-1 ring-slate-200'}`} style={bgStyle} title={t.name}>
                                            <div className="w-4 h-4 rounded-full m-1" style={{backgroundColor: t.colors.primary}}></div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                     </div>
                 )}

                {templateSelectorVisible && (
                    <div className="my-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Empezar desde una Plantilla</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {mockTemplates.map(template => (
                                <div key={template.id} className="border rounded-lg p-4 text-center hover:shadow-lg hover:border-indigo-300 cursor-pointer transition-all" onClick={() => applyTemplate(template)}>
                                    <Icon name="LayoutTemplate" className="w-8 h-8 mx-auto text-indigo-500 mb-2"/>
                                    <p className="font-semibold text-sm">{template.title}</p>
                                    <p className="text-xs text-slate-500">{template.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            
                {blocks.map(block => <div key={block.id}>{renderBlockEditor(block)}</div>)}
            
                <div className="flex items-center justify-center flex-wrap gap-2 pt-4 border-t mt-4">
                    <span className="text-sm font-medium text-slate-500 mr-2">Añadir Bloque:</span>
                    <button onClick={() => addBlock(BlockType.COVER)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Portada</button>
                    <button onClick={() => addBlock(BlockType.SECTION_HEADER)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Encabezado</button>
                    <button onClick={() => addBlock(BlockType.TEXT)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Texto</button>
                    <button onClick={() => addBlock(BlockType.IMAGE)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Imagen</button>
                    <button onClick={() => addBlock(BlockType.TWO_COLUMN_IMAGE_TEXT)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">2 Columnas</button>
                    <button onClick={() => addBlock(BlockType.FOUR_COLUMN_FEATURES)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">4 Columnas</button>
                    <button onClick={() => addBlock(BlockType.TEXT_WITH_RIGHT_IMAGE)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Texto + Imagen</button>
                    <button onClick={() => addBlock(BlockType.FOUR_COLUMN_ICON_CARDS)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Tarjetas (Ícono)</button>
                    <button onClick={() => addBlock(BlockType.PRODUCT_CATEGORIES)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Cat. Productos</button>
                    <button onClick={() => addBlock(BlockType.PROMO_BANNER)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Banners</button>
                    <button onClick={() => addBlock(BlockType.CALL_TO_ACTION)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">CTA</button>
                    <button onClick={() => addBlock(BlockType.POST)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Post</button>
                    <button onClick={() => addBlock(BlockType.PORTFOLIO)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Portafolio</button>
                    <button onClick={() => addBlock(BlockType.PRICE_TABLE)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Tabla Precios</button>
                    <button onClick={() => addBlock(BlockType.INCLUDED_ITEMS_WITH_PRICE)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Precio</button>
                    <button onClick={() => addBlock(BlockType.FOOTER)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Pie de Página</button>
                    <button onClick={() => addBlock(BlockType.FOOTER_DARK)} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Pie Página Oscuro</button>
                </div>
            </div>

            {!isTemplateMode && (
                <div className="mt-6 flex justify-end">
                    <button onClick={saveAsTemplate} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        Guardar como Plantilla
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProposalEditor;