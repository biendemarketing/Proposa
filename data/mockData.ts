
import { Proposal, Client, Kpi, RecentActivity, ProposalStatus, BlockType, Template, Theme, ProposalBlock, MediaFile, Comment, TeamMember, Notification } from '../types';

export const mockClients: Client[] = [
    { id: 1, name: 'John Doe', company: 'Innovate Inc.', email: 'john.doe@innovate.com', phone: '555-1234', notes: 'Lead principal del proyecto de rediseño. Prefiere la comunicación por correo electrónico.' },
    { id: 2, name: 'Jane Smith', company: 'Solutions Co.', email: 'jane.smith@solutions.co', phone: '555-5678', notes: 'Tomadora de decisiones para la campaña de marketing. Interesada en métricas de ROI.' },
    { id: 3, name: 'Peter Jones', company: 'Creative Agency', email: 'peter.jones@creative.agy', phone: '555-9012', notes: 'Contacto para el paquete de branding. Muy enfocado en la estética visual.' },
    { id: 4, name: 'Politécnico Aragón', company: 'Politécnico Aragón, promoción', email: 'contacto@aragon.edu', phone: '809-555-2025', notes: 'Comité organizador de la promoción 2025.' },
];

export const mockTeamMembers: TeamMember[] = [
    { id: 1, name: 'Carlos Vega', email: 'carlos@proposa.com', role: 'Owner', status: 'active' },
    { id: 2, name: 'Ana García', email: 'ana@proposa.com', role: 'Admin', status: 'active' },
    { id: 3, name: 'Luisa Martinez', email: 'luisa@proposa.com', role: 'Editor', status: 'active' },
    { id: 4, name: 'Jorge Torres', email: 'jorge@proposa.com', role: 'Viewer', status: 'pending' },
];

export const mockMediaFiles: MediaFile[] = [
    { id: 1, name: 'hero-image-conference.jpg', type: 'image', size: '1.2 MB', url: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop', createdAt: '2023-10-28T10:00:00Z' },
    { id: 2, name: 'branding-guide.pdf', type: 'pdf', size: '5.4 MB', url: '#', createdAt: '2023-10-28T09:30:00Z' },
    { id: 3, name: 'social-media-icons.png', type: 'image', size: '350 KB', url: 'https://images.unsplash.com/photo-1611162617213-6d22e4ca1c78?q=80&w=1974&auto=format&fit=crop', createdAt: '2023-10-27T15:00:00Z' },
    { id: 4, name: 'logo-variations.svg', type: 'image', size: '150 KB', url: 'https://i.imgur.com/xL6Q9kL.png', createdAt: '2023-10-27T14:00:00Z' },
    { id: 5, name: 'client-testimonial-video.mp4', type: 'document', size: '25.6 MB', url: '#', createdAt: '2023-10-26T11:00:00Z' },
    { id: 6, name: 'Q4-marketing-report.docx', type: 'document', size: '2.1 MB', url: '#', createdAt: '2023-10-25T18:00:00Z' },
    { id: 7, name: 'product-shot-ecommerce.jpg', type: 'image', size: '890 KB', url: 'https://i.imgur.com/xQ1IT83.png', createdAt: '2023-10-25T12:30:00Z' },
    { id: 8, name: 'website-mockup-dark.png', type: 'image', size: '2.5 MB', url: 'https://i.imgur.com/gY23AhT.jpeg', createdAt: '2023-10-24T16:45:00Z' },
];

export const mockThemes: Theme[] = [
    {
        id: 1,
        name: 'Tema Oscuro (Original)',
        colors: {
            primary: '#FBBF24', // yellow-400
            background: '#111827', // gray-900
            text: '#d1d5db', // gray-300
            heading: '#ffffff', // white
            cardBackground: '#1f2937', // gray-800
            backgroundType: 'solid',
        },
        fonts: {
            heading: 'var(--font-sans)',
            body: 'var(--font-sans)',
        }
    },
    {
        id: 2,
        name: 'Tema Profesional',
        isDefault: true,
        colors: {
            primary: '#4f46e5', // indigo-600
            background: '#f8fafc', // slate-50
            text: '#334155', // slate-700
            heading: '#1e293b', // slate-800
            cardBackground: '#ffffff', // white
            backgroundType: 'solid',
        },
        fonts: {
            heading: 'var(--font-sans)',
            body: 'var(--font-sans)',
        }
    },
    {
        id: 3,
        name: 'Tema Creativo',
        colors: {
            primary: '#db2777', // pink-600
            background: '#fff1f2', // pink-50
            text: '#500724',     // pink-950
            heading: '#831843',  // pink-900
            cardBackground: '#ffffff', // white
            backgroundType: 'solid',
        },
        fonts: {
            heading: 'var(--font-sans)',
            body: 'var(--font-sans)',
        }
    },
    {
        id: 4,
        name: 'Tema Océano Gradiente',
        colors: {
            primary: '#ffffff',
            background: '#2193b0',
            text: '#e0f2fe',
            heading: '#ffffff',
            cardBackground: 'rgba(255, 255, 255, 0.1)',
            backgroundType: 'gradient',
            backgroundGradient: 'linear-gradient(to right, #2193b0, #6dd5ed)',
        },
        fonts: {
            heading: 'var(--font-sans)',
            body: 'var(--font-sans)',
        }
    },
    {
        id: 5,
        name: 'Tema Amanecer Gradiente',
        colors: {
            primary: '#c2410c', // orange-700
            background: '#ffecd2',
            text: '#44403c', // stone-700
            heading: '#78350f', // amber-900
            cardBackground: 'rgba(255, 255, 255, 0.6)',
            backgroundType: 'gradient',
            backgroundGradient: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
        },
        fonts: {
            heading: 'var(--font-sans)',
            body: 'var(--font-sans)',
        }
    }
];


const mockProposalLanzamientoBlocks = [
    {
        id: 'cover-1', type: BlockType.COVER, content: {
            superTitle: 'PROPUESTA DE LANZAMIENTO',
            text: 'Promoción 2025',
            subTitle: 'Es para nosotros un honor formar parte de este momento inolvidable. Con 15 años de experiencia, garantizamos un resultado óptimo que quedará para siempre en los recuerdos de cada uno de los participantes.',
            imageUrl: 'https://i.imgur.com/gY23AhT.jpeg',
            client: 'Politécnico Aragón, promoción',
            activity: 'Lanzamiento de promoción',
            theme: 'Circuito de Carreras (F1)'
        }
    },
    { id: 'sh-1', type: BlockType.SECTION_HEADER, content: { text: 'Propuesta de Ambientación' } },
    {
        id: 'two-col-1', type: BlockType.TWO_COLUMN_IMAGE_TEXT, content: {
            columns: [
                { id: 'c1', title: 'Decoración de Entrada: Pista de Carreras', text: 'Montaje de un camino simulando una pista de carreras, con columnas de cuadros blancos y negros. Una simulación de pista negra con líneas blancas, gomas y banderines para que los invitados sientan que están entrando a una carrera de Fórmula 1.', imageUrl: 'https://i.imgur.com/2G1hQZ6.png' },
                { id: 'c2', title: 'Decoración del Escenario: Meta de Carrera', text: "Escenografía para el fondo del escenario con tema de carreras. Recrearemos una meta con un letrero de 'FINISH' y otros elementos como semáforos, señalizaciones, banderines y gomas de colores para simular la llegada a la meta.", imageUrl: 'https://i.imgur.com/K5b2uZu.png' }
            ]
        }
    },
    { id: 'sh-2', type: BlockType.SECTION_HEADER, content: { text: 'Producción Técnica y Efectos' } },
    {
        id: 'feat-1', type: BlockType.FOUR_COLUMN_FEATURES, content: {
            features: [
                { id: 'f1', title: 'Sonido Profesional', icon: 'Music', items: ['DJ Profesional', 'Bocinas Amplificadas', 'Bajos Amplificados', 'Consola Mixer', 'Micrófonos Inalámbricos'], imageUrl: 'https://i.imgur.com/P0u3lR2.png' },
                { id: 'f2', title: 'Efectos Especiales', icon: 'Star', items: ['Máquina de Confeti', 'Máquina de Humo', 'Pirotecnia Fría'], imageUrl: 'https://i.imgur.com/7Yf1X3D.png' },
                { id: 'f3', title: 'Personal Técnico', icon: 'Users', items: ['Técnico para Sonido', 'Técnico para Efectos'], imageUrl: 'https://i.imgur.com/nJgqS1b.png' },
                { id: 'f4', title: 'Estructuras Truss', icon: 'GitBranch', items: ['Estructura para Escenario', 'Estructura para Área de Fotos'], imageUrl: 'https://i.imgur.com/jGqI9vP.png' },
            ]
        }
    },
    { id: 'sh-3', type: BlockType.SECTION_HEADER, content: { text: 'Experiencias Adicionales' } },
    {
        id: 'text-img-1', type: BlockType.TEXT_WITH_RIGHT_IMAGE, content: {
             textWithImage: [
                { id: 'ti1', title: 'Área de Fotos Interactiva', icon: 'Camera', text: 'Una escenografía acorde al tema del evento para que los invitados se tomen fotos. Estará colocada en los laterales del escenario central, siendo completamente interactiva.', imageUrl: 'https://i.imgur.com/5lXYzI0.png' },
                { id: 'ti2', title: 'Plataforma Videobook 360', icon: 'Video', text: "Se montará un Videobook 360 en la entrada para que los invitados puedan grabar videos al llegar y luego seguir la 'carrera' hasta la meta, creando recuerdos dinámicos desde el primer momento.", imageUrl: 'https://i.imgur.com/I24c96c.png' },
                { id: 'ti3', title: "Letras Gigantes 'PROMO 2025'", icon: 'Award', text: "Para destacar el año de la promoción, colocaremos letras iluminadas con el texto 'PROMO 2025', dejando plasmado este año en los recuerdos de la promoción de una forma espectacular.", imageUrl: 'https://i.imgur.com/uGq5b3N.png' }
             ]
        }
    },
    { id: 'sh-4', type: BlockType.SECTION_HEADER, content: { text: 'Todo Incluido' } },
    {
        id: 'price-1', type: BlockType.INCLUDED_ITEMS_WITH_PRICE, content: {
            includedItems: [
                {id: 'ii1', text: 'Fotógrafo para cubrir el evento', icon: 'Camera'},
                {id: 'ii2', text: 'Fotos generales del evento', icon: 'Image'},
                {id: 'ii3', text: 'Videos para redes sociais', icon: 'Video'},
                {id: 'ii4', text: 'Montaje, desmontaje y transporte de equipos', icon: 'Truck'},
                {id: 'ii5', text: 'Equipo de staff para acompañar en el evento', icon: 'Users'},
            ],
            price: 160000,
            priceTitle: 'Costo del Lanzamiento',
            priceSubtitle: 'Un paquete completo para un evento inolvidable.',
        }
    },
    {
        id: 'footer-1', type: BlockType.FOOTER, content: {
            phone: '+1 829 286 2601',
            email: 'LATIKPUBLICIDAD@GMAIL.COM',
            address: 'C/ Principal #20, 1er Nivel, Guaricano, Villa Mella, SDN',
            logoUrl: 'https://i.imgur.com/xL6Q9kL.png',
        }
    }
];

export const mockProposals: Proposal[] = [
    {
        id: 1,
        title: 'Rediseño Web para Innovate Inc.',
        clientId: 1,
        status: ProposalStatus.APPROVED,
        totalViews: 25,
        value: 15000,
        currency: 'USD',
        lastActivity: '2023-10-26T10:00:00Z',
        createdAt: '2023-10-15T09:00:00Z',
        publicLink: 'abc-123',
        themeId: 2,
        blocks: [
            { id: 'b2', type: BlockType.TEXT, content: { text: 'Aquí hay un desglose detallado del alcance y los entregables del proyecto.' } },
        ],
    },
    {
        id: 5,
        title: 'Propuesta de Lanzamiento - Promoción 2025',
        clientId: 4,
        status: ProposalStatus.SENT,
        totalViews: 12,
        value: 160000,
        currency: 'DOP',
        lastActivity: '2024-05-20T10:00:00Z',
        createdAt: '2024-05-18T09:00:00Z',
        publicLink: 'lanzamiento-2025',
        themeId: 1,
        blocks: mockProposalLanzamientoBlocks
    },
    {
        id: 2,
        title: 'Campaña de Marketing para Solutions Co.',
        clientId: 2,
        status: ProposalStatus.SENT,
        totalViews: 5,
        value: 7500,
        currency: 'USD',
        lastActivity: '2023-10-28T14:30:00Z',
        createdAt: '2023-10-20T11:00:00Z',
        publicLink: 'def-456',
        themeId: 4,
        blocks: [
             { id: 'b2', type: BlockType.TEXT, content: { text: 'Esta propuesta describe nuestra estrategia para el próximo trimestre.' } },
        ],
    },
    {
        id: 3,
        title: 'Paquete de Branding para Creative Agency',
        clientId: 3,
        status: ProposalStatus.DRAFT,
        totalViews: 0,
        value: 12000,
        currency: 'USD',
        lastActivity: '2023-10-29T09:00:00Z',
        createdAt: '2023-10-29T09:00:00Z',
        themeId: 3,
        blocks: [],
    },
    {
        id: 4,
        title: 'Retainer de Desarrollo de Software',
        clientId: 1,
        status: ProposalStatus.VIEWED,
        totalViews: 10,
        value: 5000,
        currency: 'USD',
        lastActivity: '2023-10-27T16:00:00Z',
        createdAt: '2023-10-18T14:00:00Z',
        publicLink: 'ghi-789',
        themeId: 5,
        blocks: [],
    },
];

export const mockComments: Comment[] = [
    { id: 1, proposalId: 2, proposalTitle: "Campaña de Marketing para Solutions Co.", author: "Jane Smith", authorType: 'client', content: "¿Podemos ajustar el presupuesto para la campaña de redes sociales? Me gustaría ver más inversión en anuncios de video.", timestamp: '2023-10-28T14:35:00Z', status: 'open' },
    { id: 2, proposalId: 2, proposalTitle: "Campaña de Marketing para Solutions Co.", author: "Ana García", authorType: 'internal', content: "Claro, Jane. Prepararé una versión revisada con un mayor enfoque en video y te la enviaré mañana.", timestamp: '2023-10-28T15:10:00Z', status: 'open' },
    { id: 3, proposalId: 1, proposalTitle: "Rediseño Web para Innovate Inc.", author: "John Doe", authorType: 'client', content: "El cronograma se ve perfecto. ¡Estamos muy emocionados de empezar!", timestamp: '2023-10-25T11:00:00Z', status: 'resolved' },
    { id: 4, proposalId: 4, proposalTitle: "Retainer de Desarrollo de Software", author: "John Doe", authorType: 'client', content: "Me gustaría añadir una cláusula sobre el tiempo de respuesta del soporte. ¿Podemos discutirlo?", timestamp: '2023-10-27T16:05:00Z', status: 'open' },
];

const mockEcommerceBlocks: ProposalBlock[] = [
     {
        id: 'ecom-cta-1',
        type: BlockType.CALL_TO_ACTION,
        content: {
            superTitle: '',
            title: 'Ilumina Tu Viaje Con Patinetes Eléctricos Energéticos',
            subTitle: 'Potencie su viaje con nuestras potentes bicicletas eléctricas',
            buttonText: 'Leer más',
            buttonUrl: '#',
            imageUrl: 'https://i.imgur.com/xQ1IT83.png'
        }
    },
    { id: 'ecom-sh-1', type: BlockType.SECTION_HEADER, content: { text: 'Categorías Populares' } },
    {
        id: 'ecom-cat-1',
        type: BlockType.PRODUCT_CATEGORIES,
        content: {
            productCategories: [
                {id: 'pc1', title: 'Headphones', subtitle: '20 Product', imageUrl: 'https://i.imgur.com/I24c96c.png'},
                {id: 'pc2', title: 'Mobile Phone', subtitle: '20 Product', imageUrl: 'https://i.imgur.com/I24c96c.png'},
                {id: 'pc3', title: 'CPU Heat Pipes', subtitle: '16 Product', imageUrl: 'https://i.imgur.com/I24c96c.png'},
                {id: 'pc4', title: 'Smart Watch', subtitle: '44 Product', imageUrl: 'https://i.imgur.com/I24c96c.png'},
                {id: 'pc5', title: 'With Bluetooth', subtitle: '20 Product', imageUrl: 'https://i.imgur.com/I24c96c.png'},
            ]
        }
    },
    { id: 'ecom-sh-2', type: BlockType.SECTION_HEADER, content: { text: 'Ofertas de Temporada' } },
     {
        id: 'ecom-promo-1',
        type: BlockType.PROMO_BANNER,
        content: {
            promoBanners: [
                {id: 'pb1', superTitle: 'COLECCIONES TOP', title: 'Tendencias de estilo principales', linkText: 'Compra Ahora', linkUrl: '#', imageUrl: 'https://i.imgur.com/v14O8t2.png', layout: 'left'},
                {id: 'pb2', superTitle: 'PREMIUM - EXCLUSIVO ONLINE', title: 'Aquí tu estilo', linkText: 'Compra Ahora', linkUrl: '#', imageUrl: 'https://i.imgur.com/T0yqK5a.png', layout: 'center'},
                {id: 'pb3', superTitle: 'COLECCIÓN EXCLUSIVA', title: 'Hasta 50% de descuento', linkText: 'Compra Ahora', linkUrl: '#', imageUrl: 'https://i.imgur.com/4Dm9r0J.png', layout: 'right'},
            ]
        }
    },
    { id: 'ecom-sh-3', type: BlockType.SECTION_HEADER, content: { text: 'Nuestro Portafolio' } },
    {
        id: 'ecom-port-1',
        type: BlockType.PORTFOLIO,
        content: {
            portfolioItems: [
                {id: 'p1', title: 'Proyecto Alpha', description: 'Una solución innovadora para el sector fintech.', imageUrl: 'https://picsum.photos/seed/port1/600/400' },
                {id: 'p2', title: 'Proyecto Beta', description: 'Campaña de marketing digital con resultados récord.', imageUrl: 'https://picsum.photos/seed/port2/600/400' },
                {id: 'p3', title: 'Proyecto Gamma', description: 'Desarrollo de una app móvil multiplataforma.', imageUrl: 'https://picsum.photos/seed/port3/600/400' },
            ]
        }
    },
    { id: 'ecom-sh-4', type: BlockType.SECTION_HEADER, content: { text: 'Tabla de Precios' } },
     {
        id: 'ecom-pt-1',
        type: BlockType.PRICE_TABLE,
        content: {
            priceTablePackages: [
                { id: 'pt1', name: 'Básico', price: '$29', frequency: '/mes', features: ['10 Proyectos', '3 Usuarios', 'Soporte Básico'], isFeatured: false, buttonText: 'Empezar', buttonUrl: '#' },
                { id: 'pt2', name: 'Pro', price: '$79', frequency: '/mes', features: ['Proyectos Ilimitados', '10 Usuarios', 'Soporte Prioritario', 'Analíticas Avanzadas'], isFeatured: true, buttonText: 'Empezar', buttonUrl: '#' },
                { id: 'pt3', name: 'Empresa', price: 'Contacto', frequency: '', features: ['Todo en Pro', 'Usuarios Ilimitados', 'Soporte Dedicado', 'Integraciones'], isFeatured: false, buttonText: 'Contactar', buttonUrl: '#' },
            ]
        }
    },
    {
        id: 'ecom-fd-1',
        type: BlockType.FOOTER_DARK,
        content: {
            darkFooterItems: [
                {id: 'df1', icon: 'Truck', title: 'Entrega Más Rápida', text: 'Entrega ordenada en 24 horas'},
                {id: 'df2', icon: 'Shield', title: 'Pagos Seguros', text: 'Pago protegido por billdesk pro'},
                {id: 'df3', icon: 'Headphones', title: 'Soporte 24*7', text: 'Servicio al cliente activo 24 horas al día, 7 días a la semana en todo el país.'},
                {id: 'df4', icon: 'PackageCheck', title: 'Servicio Confiable', text: 'Proveedor de servicios confiable y de confianza'},
            ]
        }
    }
];

export const mockTemplates: Template[] = [
    {
        id: 1,
        title: 'Lanzamiento de Evento',
        description: 'Plantilla completa para propuestas de lanzamiento de eventos, incluye ambientación, producción y extras.',
        category: 'Eventos',
        blocks: mockProposalLanzamientoBlocks,
    },
    {
        id: 2,
        title: 'Propuesta de Marketing Digital',
        description: 'Una plantilla estándar para agencias de marketing que cubre redes sociales, SEO y estrategia de contenido.',
        category: 'Marketing Digital',
        blocks: [
            { id: 'tpl2-b1', type: BlockType.COVER, content: { superTitle: "PROPUESTA", text: "Marketing Digital", subTitle: "Estrategias para crecer tu negocio online.", imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop" }},
            { id: 'tpl2-b2', type: BlockType.SECTION_HEADER, content: { text: "Nuestra Estrategia" } },
            {
                id: 'tpl2-b8',
                type: BlockType.FOUR_COLUMN_ICON_CARDS,
                content: {
                    iconCards: [
                        { id: 'ic1', icon: 'Lightbulb', title: 'Creatividad', text: 'Ideas frescas y originales que capturan la atención.' },
                        { id: 'ic2', icon: 'Zap', title: 'Innovación', text: 'Aplicamos las últimas tendencias y tecnologías del marketing.' },
                        { id: 'ic3', icon: 'Signal', title: 'Resultados', text: 'Estrategias enfocadas en objetivos medibles y tangibles.' },
                        { id: 'ic4', icon: 'Headphones', title: 'Soporte', text: 'Acompañamiento cercano y personalizado en cada etapa.' }
                    ]
                }
            },
            { id: 'tpl2-b3', type: BlockType.TWO_COLUMN_IMAGE_TEXT, content: { columns: [
                {id: 'c1', title: 'Análisis y Descubrimiento', text: 'Comenzamos con una inmersión profunda en tu marca, audiencia y competidores para construir una base estratégica sólida.', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'},
                {id: 'c2', title: 'Ejecución y Optimización', text: 'Lanzamos campañas multicanal, monitoreando constantemente los resultados y optimizando para un rendimiento máximo y un ROI positivo.', imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop'},
            ]}},
            { id: 'tpl2-b4', type: BlockType.SECTION_HEADER, content: { text: "Servicios Incluidos" } },
            { id: 'tpl2-b5', type: BlockType.FOUR_COLUMN_FEATURES, content: {
                features: [
                    { id: 'f1', title: 'SEO', icon: 'Target', items: ['Auditoría Completa', 'Keyword Research', 'Link Building'], imageUrl: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=2070&auto=format&fit=crop" },
                    { id: 'f2', title: 'Redes Sociales', icon: 'ThumbsUp', items: ['Gestión de Cuentas', 'Creación de Contenido', 'Campañas Pagadas'], imageUrl: "https://images.unsplash.com/photo-1611162617213-6d22e4ca1c78?q=80&w=1974&auto=format&fit=crop" },
                    { id: 'f3', title: 'Email Marketing', icon: 'Mail', items: ['Diseño de Plantillas', 'Automatización', 'Análisis de Campañas'], imageUrl: "https://images.unsplash.com/photo-1586953208448-3072a03b1317?q=80&w=2070&auto=format&fit=crop" },
                    { id: 'f4', title: 'Contenido', icon: 'BookOpen', items: ['Blog Posts', 'Videos', 'Infografías'], imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" },
                ]
            }},
            { id: 'tpl2-b6', type: BlockType.INCLUDED_ITEMS_WITH_PRICE, content: { price: 2500, priceTitle: "Inversión Mensual", priceSubtitle: "Paquete de Marketing Integral.", includedItems: [] } },
            { id: 'tpl2-b7', type: BlockType.FOOTER, content: { phone: "+1 (555) 123-4567", email: "hola@agencia.com", address: "123 Calle Digital, Web City", logoUrl: "https://i.imgur.com/xL6Q9kL.png" } },
        ]
    },
     {
        id: 5,
        title: 'Propuesta E-commerce',
        description: 'Una plantilla completa para propuestas de e-commerce, incluyendo catálogo, banners y CTA.',
        category: 'E-commerce',
        blocks: mockEcommerceBlocks,
    },
    {
        id: 3,
        title: 'Propuesta de Software a Medida',
        description: 'Plantilla para proyectos de desarrollo de software, cubriendo fases, tecnología y costos.',
        category: 'Software',
        blocks: [
             { id: 'tpl3-b1', type: BlockType.COVER, content: { superTitle: "PROPUESTA", text: "Desarrollo de Software", subTitle: "Soluciones a medida para optimizar sus procesos de negocio.", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" }},
             { id: 'tpl3-b2', type: BlockType.SECTION_HEADER, content: { text: "Fases del Proyecto" } },
             { id: 'tpl3-b3', type: BlockType.TEXT, content: { text: "Nuestro proceso de desarrollo se divide en fases claras para garantizar la transparencia y la entrega exitosa del proyecto. Cada fase tiene objetivos y entregables definidos." } },
             { id: 'tpl3-b4', type: BlockType.TWO_COLUMN_IMAGE_TEXT, content: { columns: [
                {id: 'c1', title: '1. Descubrimiento y Diseño', text: 'Analizamos tus requerimientos, definimos el alcance y creamos prototipos y diseños UI/UX para validar la solución.', imageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2070&auto=format&fit=crop'},
                {id: 'c2', title: '2. Desarrollo y Pruebas', text: 'Desarrollamos la aplicación en sprints, con revisiones periódicas y pruebas rigurosas para asegurar la calidad del código.', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'},
             ]}},
             { id: 'tpl3-b5', type: BlockType.INCLUDED_ITEMS_WITH_PRICE, content: { price: 25000, priceTitle: "Inversión del Proyecto", priceSubtitle: "Costo único para el desarrollo completo.", includedItems: [
                {id: 'ii1', text: 'Gestión de Proyecto Dedicada', icon: 'Briefcase'},
                {id: 'ii2', text: 'Código Fuente Completo', icon: 'Code'},
                {id: 'ii3', text: 'Soporte Post-Lanzamiento (3 meses)', icon: 'Settings'},
             ]}},
             { id: 'tpl3-b6', type: BlockType.FOOTER, content: { phone: "+1 (555) 987-6543", email: "ventas@devs.com", address: "456 Av. Código, Silicon Valley", logoUrl: "https://i.imgur.com/xL6Q9kL.png" } },
        ]
    },
    {
        id: 4,
        title: 'Paquete de Branding Creativo',
        description: 'Una propuesta visual para proyectos de identidad de marca, mostrando diferentes paquetes de servicios.',
        category: 'Diseño',
        blocks: [
            { id: 'tpl4-b1', type: BlockType.COVER, content: { superTitle: "PROPUESTA", text: "Identidad de Marca", subTitle: "Creando una marca memorable que conecte con tu audiencia.", imageUrl: "https://images.unsplash.com/photo-1587420546313-26f65135239a?q=80&w=1974&auto=format&fit=crop" }},
            { id: 'tpl4-b2', type: BlockType.SECTION_HEADER, content: { text: "Nuestros Paquetes de Branding" } },
            { id: 'tpl4-b3', type: BlockType.FOUR_COLUMN_FEATURES, content: { features: [
                { id: 'p1', title: 'Esencial', icon: 'Package', items: ['Logo Principal', 'Paleta de Colores', 'Tipografías'], imageUrl: 'https://images.unsplash.com/photo-1611005014944-42b8243ca20a?q=80&w=2070&auto=format&fit=crop' },
                { id: 'p2', title: 'Completo', icon: 'CopyPlus', items: ['Todo en Esencial', '+ Logos Secundarios', '+ Manual de Marca Básico'], imageUrl: 'https://images.unsplash.com/photo-1596483921225-635238f4a10e?q=80&w=2070&auto=format&fit=crop' },
                { id: 'p3', title: 'Premium', icon: 'Award', items: ['Todo en Completo', '+ Diseño de Papelería', '+ Guía de Estilo Extensa'], imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
                { id: 'p4', title: 'Personalizado', icon: 'Lightbulb', items: ['¿Necesitas algo más?', 'Contáctanos para', 'una cotización a medida'], imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop' },
            ]}},
            { id: 'tpl4-b4', type: BlockType.FOOTER, content: { phone: "+1 (555) 246-8135", email: "estudio@creativo.com", address: "789 Calle de Diseño, Arts District", logoUrl: "https://i.imgur.com/xL6Q9kL.png" } },
        ]
    }
];


export const mockKpis: Kpi[] = [
    { title: 'Propuestas Enviadas', value: '38', change: 12, description: 'vs. el mes pasado', icon: 'FileText', iconTextColor: 'text-blue-500' },
    { title: 'Tasa de Aprobación', value: '65%', change: 5, description: 'vs. el mes pasado', icon: 'CheckCircle', iconTextColor: 'text-green-500' },
    { title: 'Tiempo Prom. de Cierre', value: '12 días', change: -2, description: 'vs. el mes pasado', icon: 'Clock', iconTextColor: 'text-yellow-500' },
    { title: 'Valor en Pipeline', value: '$125,730', change: 15, description: 'Valor total de propuestas enviadas', icon: 'DollarSign', iconTextColor: 'text-indigo-500' },
];

export const mockRecentActivity: RecentActivity[] = [
    { id: 1, type: 'approved', proposalTitle: 'Rediseño Web para Innovate Inc.', proposalId: 1, clientName: 'John Doe', timestamp: '2023-10-26T10:00:00Z', actionText: 'fue aprobada' },
    { id: 2, type: 'viewed', proposalTitle: 'Retainer de Desarrollo de Software', proposalId: 4, clientName: 'John Doe', timestamp: '2023-10-27T16:00:00Z', actionText: 'fue vista' },
    { id: 3, type: 'commented', proposalTitle: 'Campaña de Marketing para Solutions Co.', proposalId: 2, clientName: 'Jane Smith', timestamp: '2023-10-28T14:30:00Z', actionText: 'fue comentada' },
    { id: 4, type: 'viewed', proposalTitle: 'Campaña de Marketing para Solutions Co.', proposalId: 2, clientName: 'Jane Smith', timestamp: '2023-10-28T11:00:00Z', actionText: 'fue vista' },
];

export const mockNotifications: Notification[] = mockRecentActivity.map((activity, index) => ({
    id: activity.id,
    proposalId: activity.proposalId,
    type: activity.type,
    text: `La propuesta "${activity.proposalTitle}" ${activity.actionText} por ${activity.clientName}.`,
    time: activity.timestamp,
    isRead: index === 3, // Only the oldest notification is read
    icon: activity.type === 'approved' ? 'CheckCircle' : activity.type === 'commented' ? 'MessageSquare' : 'Eye',
    iconColor: activity.type === 'approved' ? 'text-green-500' : activity.type === 'commented' ? 'text-yellow-500' : 'text-purple-500',
}));


export const mockAnalyticsData = {
    viewsOverTime: [
        { name: 'Oct 20', views: 4 }, { name: 'Oct 21', views: 3 }, { name: 'Oct 22', views: 8 },
        { name: 'Oct 23', views: 5 }, { name: 'Oct 24', views: 6 }, { name: 'Oct 25', views: 7 },
        { name: 'Oct 26', views: 2 },
    ],
    funnel: [
        { stage: 'Enviada', value: 100 },
        { stage: 'Vista', value: 85 },
        { stage: 'Comentada', value: 40 },
        { stage: 'Aprobada', value: 25 },
    ],
    sectionEngagement: [
        { name: 'Introducción', time: 120 },
        { name: 'Alcance', time: 350 },
        { name: 'Precios', time: 410 },
        { name: 'Cronograma', time: 180 },
        { name: 'Sobre Nosotros', time: 90 },
    ],
};

export const mockGlobalAnalyticsData = {
    proposalsOverTime: [
        { name: 'Ene', sent: 30, approved: 18 },
        { name: 'Feb', sent: 42, approved: 25 },
        { name: 'Mar', sent: 51, approved: 35 },
        { name: 'Abr', sent: 45, approved: 30 },
        { name: 'May', sent: 55, approved: 40 },
        { name: 'Jun', sent: 60, approved: 48 },
    ],
    valueFunnel: [
        { stage: 'Enviado', value: 125730 },
        { stage: 'Visto', value: 98200 },
        { stage: 'Aprobado', value: 65400 },
    ],
    topClients: [
        { name: 'Innovate Inc.', value: 20000 },
        { name: 'Solutions Co.', value: 15500 },
        { name: 'Creative Agency', value: 12000 },
        { name: 'Politécnico Aragón', value: 8000 },
    ],
    engagementKpis: [
        { title: 'Vistas Totales de Propuestas', value: '1,284', icon: 'Eye', iconTextColor: 'text-purple-500' },
        { title: 'Comentarios Recibidos', value: '157', icon: 'MessageSquare', iconTextColor: 'text-yellow-500' },
    ],
    statusDistribution: [
        { name: 'Aprobado', value: 45 },
        { name: 'Enviado', value: 30 },
        { name: 'Visto', value: 15 },
        { name: 'Borrador', value: 10 },
    ]
};

export const mockActiveSessions = [
    { id: 1, device: 'Chrome on macOS', location: 'Santo Domingo, DR', lastSeen: 'Activo ahora' },
    { id: 2, device: 'iPhone App', location: 'Santiago, DR', lastSeen: 'hace 2 horas' },
];

export const mockApiKeys = [
    { id: 1, name: 'Integración Zapier', key: 'sk_live_123...xyz', createdAt: '2023-01-15T00:00:00Z', lastUsed: '2023-10-28T00:00:00Z' },
    { id: 2, name: 'API de Reportes', key: 'sk_live_456...uvw', createdAt: '2023-05-20T00:00:00Z', lastUsed: null },
];