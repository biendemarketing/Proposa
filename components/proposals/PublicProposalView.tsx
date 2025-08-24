import React, { useState } from 'react';
import { mockProposals, mockThemes } from '../../data/mockData';
import { Proposal, BlockType, TwoColumnItem, FeatureItem, TextWithImageItem, IncludedItem, IconCardItem, ProductCategoryItem, PromoBannerItem, DarkFooterItem, PortfolioItem, PriceTablePackage } from '../../types';
import Icon from '../icons/Icon';
import ApprovalModal from './ApprovalModal';
import { useAppContext } from '../../contexts/AppContext';

interface PublicProposalViewProps {
    token?: string;
    proposal?: Proposal;
}

const PublicProposalView: React.FC<PublicProposalViewProps> = ({ token, proposal: proposalProp }) => {
    const { clients } = useAppContext();
    const [proposal] = useState<Proposal | undefined>(
        proposalProp || mockProposals.find(p => p.publicLink === token)
    );
    const [isApprovalModalOpen, setApprovalModalOpen] = useState(false);
    
    const theme = mockThemes.find(t => t.id === proposal?.themeId) || mockThemes.find(t => t.isDefault) || mockThemes[0];
    
    const themeStyles: React.CSSProperties = {
        '--primary-color': theme.colors.primary,
        '--bg-color': theme.colors.background,
        '--text-color': theme.colors.text,
        '--heading-color': theme.colors.heading,
        '--card-bg-color': theme.colors.cardBackground,
        '--font-heading': theme.fonts.heading,
        '--font-body': theme.fonts.body,
    } as React.CSSProperties;

    const backgroundStyle = theme.colors.backgroundType === 'gradient' && theme.colors.backgroundGradient
        ? { background: theme.colors.backgroundGradient }
        : { backgroundColor: 'var(--bg-color)' };


    if (!proposal) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold">Propuesta no encontrada</h1>
                    <p className="text-slate-400">El enlace puede ser inválido o haber expirado.</p>
                </div>
            </div>
        );
    }

    const clientName = clients.find(c => c.id === proposal.clientId)?.company || "Valioso Cliente";

    const renderBlock = (block: any) => {
        switch (block.type) {
            case BlockType.COVER:
                const { superTitle, text, subTitle, imageUrl, client, activity, theme } = block.content;
                return (
                    <div className="h-screen min-h-[700px] w-full flex flex-col justify-center items-center text-center p-8 text-[var(--heading-color)] relative"
                         style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black opacity-60"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <img src="https://i.imgur.com/xL6Q9kL.png" alt="LatiK Logo" className="w-32 mb-8" />
                            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-color)'}} className="text-4xl md:text-5xl font-bold tracking-wider uppercase">{superTitle}</h2>
                            <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-6xl md:text-8xl font-black my-4">{text}</h1>
                            <div className="w-32 h-1 my-8" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl w-full my-8">
                                <div><strong className="block" style={{ color: 'var(--primary-color)'}}>Cliente:</strong> {client}</div>
                                <div><strong className="block" style={{ color: 'var(--primary-color)'}}>Actividad:</strong> {activity}</div>
                                <div><strong className="block" style={{ color: 'var(--primary-color)'}}>Tema:</strong> {theme}</div>
                            </div>
                            <p className="max-w-4xl text-lg leading-relaxed mt-8">{subTitle}</p>
                        </div>
                    </div>
                );
            case BlockType.SECTION_HEADER:
                return <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-color)'}} className="text-4xl md:text-5xl font-bold text-center my-16 md:my-24 tracking-wider px-4">{block.content.text}</h2>;
            
            case BlockType.TWO_COLUMN_IMAGE_TEXT:
                return (
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-8">
                        {block.content.columns?.map((col: TwoColumnItem) => (
                            <div key={col.id} className="border border-white/10 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--card-bg-color)'}}>
                                <img src={col.imageUrl} alt={col.title} className="w-full h-64 object-cover" />
                                <div className="p-8">
                                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }} className="text-2xl font-bold mb-4">{col.title}</h3>
                                    <p className="leading-relaxed" style={{ color: 'var(--text-color)' }}>{col.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case BlockType.FOUR_COLUMN_FEATURES:
                 return (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-8">
                        {block.content.features?.map((feat: FeatureItem) => (
                            <div key={feat.id} className="border border-white/10 rounded-lg p-6 flex flex-col" style={{ backgroundColor: 'var(--card-bg-color)'}}>
                                <img src={feat.imageUrl} alt={feat.title} className="w-full h-40 object-cover rounded-md mb-6" />
                                <div className="flex items-center mb-4">
                                    {feat.icon && <Icon name={feat.icon} className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />}
                                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}} className="text-xl font-bold">{feat.title}</h3>
                                </div>
                                <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--text-color)' }}>
                                    {feat.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                 );
            
            case BlockType.FOUR_COLUMN_ICON_CARDS:
                return (
                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-8">
                        {block.content.iconCards?.map((card: IconCardItem) => (
                             <div key={card.id} className="border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center" style={{ backgroundColor: 'var(--card-bg-color)'}}>
                                <Icon name={card.icon} className="w-10 h-10 mb-6" style={{ color: 'var(--primary-color)'}} />
                                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}}>{card.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>{card.text}</p>
                            </div>
                        ))}
                    </div>
                );

            case BlockType.TEXT_WITH_RIGHT_IMAGE:
                return (
                    <div className="space-y-16 max-w-6xl mx-auto px-8">
                        {block.content.textWithImage?.map((item: TextWithImageItem, index: number) => (
                             <div key={item.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                                 <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                                     <div className="flex items-center mb-4">
                                        {item.icon && <Icon name={item.icon} className="w-8 h-8 mr-4 flex-shrink-0" style={{ color: 'var(--primary-color)'}} />}
                                        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}} className="text-3xl font-bold">{item.title}</h3>
                                     </div>
                                     <p className="leading-relaxed" style={{ color: 'var(--text-color)'}}>{item.text}</p>
                                 </div>
                                 <div className={index % 2 !== 0 ? 'md:col-start-1' : ''}>
                                     <img src={item.imageUrl} alt={item.title} className="rounded-lg shadow-2xl" />
                                 </div>
                             </div>
                        ))}
                    </div>
                );
            case BlockType.INCLUDED_ITEMS_WITH_PRICE:
                const { includedItems, price, priceTitle, priceSubtitle } = block.content;
                return (
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-8 items-center">
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}} className="text-3xl font-bold mb-6">Otros Servicios Incluidos</h3>
                            <ul className="space-y-4">
                               {includedItems?.map((item: IncludedItem) => (
                                   <li key={item.id} className="flex items-center text-lg" style={{ color: 'var(--heading-color)'}}>
                                       <Icon name={item.icon} className="w-6 h-6 mr-4" style={{ color: 'var(--primary-color)'}} />
                                       <span>{item.text}</span>
                                   </li>
                               ))}
                            </ul>
                        </div>
                        <div className="border-2 rounded-lg p-8 text-center flex flex-col justify-center h-full" style={{ borderColor: 'var(--primary-color)', backgroundColor: 'var(--card-bg-color)'}}>
                           <Icon name="DollarSign" className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--primary-color)'}}/>
                           <h4 className="text-2xl font-semibold" style={{ color: 'var(--heading-color)'}}>{priceTitle}</h4>
                           <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-color)'}} className="text-5xl font-bold my-4">RD ${price?.toLocaleString()}</p>
                           <p style={{ color: 'var(--text-color)'}}>{priceSubtitle}</p>
                        </div>
                    </div>
                );
            case BlockType.PRODUCT_CATEGORIES:
                 return <div className="max-w-6xl mx-auto px-8 flex justify-center gap-8 flex-wrap">
                    {block.content.productCategories?.map((cat: ProductCategoryItem) => (
                        <div key={cat.id} className="text-center">
                            <div className="w-40 h-40 rounded-full flex items-center justify-center p-4 mb-4 shadow-lg bg-blue-100" >
                                <img src={cat.imageUrl} alt={cat.title} className="max-w-full max-h-full object-contain" />
                            </div>
                            <h3 className="font-semibold" style={{color: 'var(--heading-color)'}}>{cat.title}</h3>
                            <p className="text-sm" style={{color: 'var(--text-color)'}}>{cat.subtitle}</p>
                        </div>
                    ))}
                </div>;
            case BlockType.PROMO_BANNER:
                return <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
                    {block.content.promoBanners?.map((banner: PromoBannerItem) => {
                        const layoutClasses = {
                            left: 'justify-start text-left',
                            center: 'justify-center text-center',
                            right: 'justify-end text-right'
                        };
                        const layoutClass = layoutClasses[banner.layout || 'left'];

                        return (
                            <div key={banner.id} className={`rounded-lg p-8 flex items-center relative min-h-[300px] ${layoutClass}`} style={{ backgroundColor: '#fff1f2' }}>
                                 <img src={banner.imageUrl} className="absolute inset-0 w-full h-full object-cover rounded-lg" alt={banner.title} />
                                 <div className="absolute inset-0 bg-white/30 rounded-lg"></div>
                                 <div className="relative z-10 w-full" style={{ color: 'var(--text-color)' }}>
                                    <p className="font-semibold text-sm">{banner.superTitle}</p>
                                    <h3 className="text-3xl font-bold my-2" style={{fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}}>{banner.title}</h3>
                                    <a href={banner.linkUrl} className="font-semibold border-b-2 pb-1 inline-block" style={{borderColor: 'var(--text-color)'}}>{banner.linkText}</a>
                                 </div>
                            </div>
                        )
                    })}
                </div>;
             case BlockType.CALL_TO_ACTION:
                return <div className="w-full flex flex-col justify-center items-center text-center p-12 text-white relative min-h-[400px]" style={{ backgroundImage: `url(${block.content.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                     <div className="absolute inset-0 bg-black opacity-70"></div>
                     <div className="relative z-10">
                        <h2 className="text-5xl font-bold" style={{fontFamily: 'var(--font-heading)', color: 'var(--heading-color)'}}>{block.content.title}</h2>
                        <p className="max-w-2xl text-lg my-4" style={{color: 'var(--text-color)'}}>{block.content.subTitle}</p>
                        <a href={block.content.buttonUrl} className="inline-block text-white font-bold px-8 py-3 rounded-md text-lg hover:opacity-90 transition-opacity" style={{backgroundColor: 'var(--primary-color)'}}>{block.content.buttonText}</a>
                     </div>
                </div>;
            case BlockType.FOOTER_DARK:
                 return <div className="py-16 px-8" style={{backgroundColor: '#1f2937'}}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
                        {block.content.darkFooterItems?.map((item: DarkFooterItem) => (
                            <div key={item.id} className="flex items-start">
                                <Icon name={item.icon} className="w-8 h-8 mr-4 flex-shrink-0" style={{color: 'var(--primary-color)'}} />
                                <div>
                                    <h4 className="font-bold text-lg mb-1" style={{color: 'var(--heading-color)'}}>{item.title}</h4>
                                    <p className="text-sm" style={{color: 'var(--text-color)'}}>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>;
             case BlockType.PORTFOLIO:
                return <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
                    {block.content.portfolioItems?.map((item: PortfolioItem) => (
                        <div key={item.id} className="rounded-lg overflow-hidden group" style={{backgroundColor: 'var(--card-bg-color)'}}>
                           <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                           <div className="p-6">
                               <h3 className="font-bold text-xl mb-2" style={{color: 'var(--heading-color)'}}>{item.title}</h3>
                               <p className="text-sm" style={{color: 'var(--text-color)'}}>{item.description}</p>
                           </div>
                        </div>
                    ))}
                </div>;
            case BlockType.PRICE_TABLE:
                 return <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-8 items-start">
                    {block.content.priceTablePackages?.map((pkg: PriceTablePackage) => (
                        <div key={pkg.id} className={`rounded-xl p-8 border ${pkg.isFeatured ? 'border-transparent' : 'border-white/10'}`} style={{backgroundColor: pkg.isFeatured ? 'var(--primary-color)' : 'var(--card-bg-color)'}}>
                           <h3 className="font-bold text-2xl" style={{color: pkg.isFeatured ? 'var(--bg-color)' : 'var(--heading-color)'}}>{pkg.name}</h3>
                           <p className="text-4xl font-bold my-4" style={{color: pkg.isFeatured ? 'var(--bg-color)' : 'var(--heading-color)'}}>{pkg.price} <span className="text-lg font-normal">{pkg.frequency}</span></p>
                           <ul className="space-y-3 my-8" style={{color: pkg.isFeatured ? 'var(--bg-color)' : 'var(--text-color)'}}>
                               {pkg.features.map(feat => <li key={feat} className="flex items-center"><Icon name="CheckCircle" className="w-5 h-5 mr-3"/><span>{feat}</span></li>)}
                           </ul>
                           <a href={pkg.buttonUrl} className={`block w-full text-center font-bold py-3 rounded-lg`} style={{backgroundColor: pkg.isFeatured ? 'var(--bg-color)' : 'var(--primary-color)', color: pkg.isFeatured ? 'var(--primary-color)' : 'var(--bg-color)'}}>{pkg.buttonText}</a>
                        </div>
                    ))}
                </div>;
            case BlockType.FOOTER:
                 const { phone, email, address, logoUrl } = block.content;
                 return (
                    <div className="mt-24 py-16 px-8 text-center" style={{ backgroundColor: '#000000' }}>
                        <img src={logoUrl} alt="Logo" className="w-32 mx-auto mb-8" />
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/20 pt-8" style={{ color: 'var(--text-color)' }}>
                            <div className="flex flex-col items-center"><Icon name="Phone" className="w-6 h-6 mb-2" style={{color: 'var(--primary-color)'}}/><strong>Cel/Whatsapp</strong><span>{phone}</span></div>
                            <div className="flex flex-col items-center"><Icon name="Mail" className="w-6 h-6 mb-2" style={{color: 'var(--primary-color)'}}/><strong>Email</strong><span>{email}</span></div>
                            <div className="flex flex-col items-center"><Icon name="MapPin" className="w-6 h-6 mb-2" style={{color: 'var(--primary-color)'}}/><strong>Dirección</strong><span>{address}</span></div>
                        </div>
                        <p className="mt-12 text-sm text-gray-500">&copy; {new Date().getFullYear()} Lati K Publicidad. Todos los derechos reservados.</p>
                    </div>
                 )
            default:
                return (
                    <div className="max-w-4xl mx-auto px-8 py-4 rounded-md my-4" style={{ backgroundColor: 'var(--card-bg-color)', color: 'var(--text-color)'}}>
                        <p>Tipo de bloque estándar: {block.type}</p>
                        <p>{block.content.text}</p>
                    </div>
                );
        }
    };

    const handleApprove = () => {
        setApprovalModalOpen(false);
        alert("¡Gracias! La propuesta ha sido aprobada exitosamente.");
    };

    const downloadPdf = () => {
        window.print();
    }

    return (
        <div style={themeStyles} className="min-h-screen">
            {isApprovalModalOpen && <ApprovalModal onClose={() => setApprovalModalOpen(false)} onApprove={handleApprove} />}
            <header className="bg-black/80 backdrop-blur-md shadow-md sticky top-0 z-30 no-print">
                <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg font-bold text-white">{proposal.title}</h2>
                        <p className="text-sm text-slate-400">Para: {clientName}</p>
                    </div>
                    <div className="flex items-center flex-wrap justify-center gap-2">
                        <button onClick={downloadPdf} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600"><Icon name="Download" className="w-4 h-4 mr-2" /> Descargar PDF</button>
                        <button className="px-4 py-2 text-sm font-semibold text-slate-200 bg-transparent border border-slate-600 rounded-lg hover:bg-slate-800">Sugerir Cambios</button>
                        <button onClick={() => setApprovalModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-slate-900 rounded-lg hover:opacity-90" style={{ backgroundColor: 'var(--primary-color)'}}>Aprobar y Firmar</button>
                    </div>
                </div>
            </header>
            <main className="print-container" style={{...backgroundStyle, color: 'var(--text-color)', fontFamily: 'var(--font-body)'}}>
                <div className="space-y-16 md:space-y-24 pb-24">
                    {proposal.blocks.map(block => (
                        <div key={block.id}>{renderBlock(block)}</div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PublicProposalView;