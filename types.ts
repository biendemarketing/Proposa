
export enum AppView {
    DASHBOARD = 'DASHBOARD',
    PROPOSALS = 'PROPOSALS',
    PROPOSAL_EDITOR = 'PROPOSAL_EDITOR',
    PROPOSAL_ANALYTICS = 'PROPOSAL_ANALYTICS',
    TEMPLATES = 'TEMPLATES',
    TEMPLATE_EDITOR = 'TEMPLATE_EDITOR',
    THEMES = 'THEMES',
    THEME_EDITOR = 'THEME_EDITOR',
    MEDIA = 'MEDIA',
    CLIENTS = 'CLIENTS',
    COMMENTS = 'COMMENTS',
    ANALYTICS = 'ANALYTICS',
    SETTINGS = 'SETTINGS',
    MEMBERS = 'MEMBERS',
    NOTIFICATIONS = 'NOTIFICATIONS',
    LANDING = 'LANDING',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export enum ProposalStatus {
    DRAFT = 'Borrador',
    SENT = 'Enviado',
    VIEWED = 'Visto',
    COMMENTED = 'Comentado',
    APPROVED = 'Aprobado',
    REJECTED = 'Rechazado',
}

export enum BlockType {
    // OLD
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    ITEMS = 'ITEMS',
    SIGNATURE = 'SIGNATURE',
    // NEW
    COVER = 'COVER',
    SECTION_HEADER = 'SECTION_HEADER',
    TWO_COLUMN_IMAGE_TEXT = 'TWO_COLUMN_IMAGE_TEXT',
    FOUR_COLUMN_FEATURES = 'FOUR_COLUMN_FEATURES',
    TEXT_WITH_RIGHT_IMAGE = 'TEXT_WITH_RIGHT_IMAGE',
    INCLUDED_ITEMS_WITH_PRICE = 'INCLUDED_ITEMS_WITH_PRICE',
    FOOTER = 'FOOTER',
    FOUR_COLUMN_ICON_CARDS = 'FOUR_COLUMN_ICON_CARDS',
    // E-commerce & Content Blocks
    PRODUCT_CATEGORIES = 'PRODUCT_CATEGORIES',
    PROMO_BANNER = 'PROMO_BANNER',
    CALL_TO_ACTION = 'CALL_TO_ACTION',
    FOOTER_DARK = 'FOOTER_DARK',
    POST = 'POST',
    PORTFOLIO = 'PORTFOLIO',
    GALLERY = 'GALLERY',
    PRICE_LIST = 'PRICE_LIST',
    PRICE_TABLE = 'PRICE_TABLE',
}

export interface Comment {
    id: number;
    proposalId: number;
    proposalTitle: string;
    author: string;
    authorType: 'client' | 'internal';
    content: string;
    timestamp: string; // ISO date string
    status: 'open' | 'resolved';
}

export interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
    status: 'active' | 'pending';
}

export interface MediaFile {
    id: number;
    name: string;
    type: 'image' | 'pdf' | 'document';
    size: string;
    url: string;
    createdAt: string;
}


// Interfaces for new block types
export interface ProductCategoryItem {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

export interface PromoBannerItem {
    id: string;
    superTitle: string;
    title: string;
    linkText: string;
    linkUrl: string;
    imageUrl: string;
    layout?: 'left' | 'center' | 'right';
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface GalleryImage {
    id: string;
    imageUrl: string;
    caption: string;
}

export interface PriceListItem {
    id: string;
    service: string;
    description: string;
    price: string;
}

export interface PriceTablePackage {
    id: string;
    name: string;
    price: string;
    frequency: string;
    features: string[];
    isFeatured: boolean;
    buttonText: string;
    buttonUrl: string;
}

export interface DarkFooterItem {
    id: string;
    icon: string;
    title: string;
    text: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
    taxable: boolean;
}

export interface TwoColumnItem {
    id: string;
    title: string;
    text: string;
    imageUrl: string;
}

export interface FeatureItem {
    id: string;
    title: string;
    items: string[];
    imageUrl: string;
    icon?: string;
}
export interface TextWithImageItem {
    id: string;
    title: string;
    text: string;
    imageUrl: string;
    icon?: string;
}
export interface IncludedItem {
    id: string;
    text: string;
    icon: string;
}

export interface IconCardItem {
    id: string;
    title: string;
    text: string;
    icon: string;
}

export interface BlockContent {
    text?: string;
    title?: string;
    imageUrl?: string;
    items?: LineItem[];
    // Cover
    superTitle?: string;
    subTitle?: string;
    client?: string;
    activity?: string;
    theme?: string;
    // Two column
    columns?: TwoColumnItem[];
    // Four Column
    features?: FeatureItem[];
    // Text with Image
    textWithImage?: TextWithImageItem[];
    // Included Items
    includedItems?: IncludedItem[];
    price?: number;
    priceTitle?: string;
    priceSubtitle?: string;
    // Icon Cards
    iconCards?: IconCardItem[];
    // Footer
    phone?: string;
    email?: string;
    address?: string;
    logoUrl?: string;
    // New Content Blocks
    productCategories?: ProductCategoryItem[];
    promoBanners?: PromoBannerItem[];
    buttonText?: string;
    buttonUrl?: string;
    darkFooterItems?: DarkFooterItem[];
    body?: string; // For Post
    portfolioItems?: PortfolioItem[];
    galleryImages?: GalleryImage[];
    priceListItems?: PriceListItem[];
    priceTablePackages?: PriceTablePackage[];
}

export interface ProposalBlock {
    id: string;
    type: BlockType;
    content: BlockContent;
}

export interface Client {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    notes: string;
}

export interface ThemeColors {
    primary: string;
    background: string;
    text: string;
    heading: string;
    cardBackground: string;
    backgroundType?: 'solid' | 'gradient';
    backgroundGradient?: string;
}

export interface ThemeFonts {
    heading: string;
    body: string;
}

export interface Theme {
    id: number;
    name: string;
    colors: ThemeColors;
    fonts: ThemeFonts;
    isDefault?: boolean;
}

export interface Proposal {
    id: number;
    title: string;
    clientId: number;
    status: ProposalStatus;
    totalViews: number;
    value: number;
    currency: string;
    lastActivity: string; // ISO date string
    createdAt: string; // ISO date string
    blocks: ProposalBlock[];
    publicLink?: string; // e.g., 'p/some-random-token'
    themeId?: number;
}

export interface Template {
    id: number;
    title: string;
    description: string;
    category: string;
    blocks: ProposalBlock[];
}

export interface Kpi {
    title: string;
    value: string;
    change: number;
    description: string;
    icon?: string;
    iconColor?: string;
    iconTextColor?: string;
}

export interface RecentActivity {
    id: number;
    type: 'viewed' | 'commented' | 'approved';
    proposalTitle: string;
    proposalId: number;
    clientName: string;
    timestamp: string; // ISO date string
    actionText: string;
}

export interface Notification {
    id: number;
    proposalId: number;
    type: 'viewed' | 'commented' | 'approved';
    text: string;
    time: string;
    isRead: boolean;
    icon: string;
    iconColor: string;
}
