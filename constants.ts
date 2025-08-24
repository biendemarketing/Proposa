
import { AppView, ProposalStatus } from './types';

export const NAVIGATION_ITEMS = [
    { view: AppView.DASHBOARD, label: 'Dashboard', icon: 'Dashboard' },
    { view: AppView.PROPOSALS, label: 'Propuestas', icon: 'FileText' },
    { view: AppView.TEMPLATES, label: 'Plantillas', icon: 'LayoutTemplate' },
    { view: AppView.THEMES, label: 'Temas', icon: 'Palette' },
    { view: AppView.MEDIA, label: 'Medios', icon: 'Folder' },
    { view: AppView.CLIENTS, label: 'Clientes', icon: 'Users' },
    { view: AppView.MEMBERS, label: 'Miembros', icon: 'Users' },
    { view: AppView.COMMENTS, label: 'Comentarios', icon: 'MessageSquare' },
    { view: AppView.ANALYTICS, label: 'Analíticas', icon: 'BarChart' },
];

export const SETTINGS_ITEM = {
    view: AppView.SETTINGS,
    label: 'Configuración',
    icon: 'Settings',
};

export const PROPOSAL_STATUS_COLORS: Record<ProposalStatus, { bg: string; text: string; dot: string }> = {
    [ProposalStatus.DRAFT]: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    [ProposalStatus.SENT]: { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-400' },
    [ProposalStatus.VIEWED]: { bg: 'bg-purple-100', text: 'text-purple-600', dot: 'bg-purple-400' },
    [ProposalStatus.COMMENTED]: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    [ProposalStatus.APPROVED]: { bg: 'bg-green-100', text: 'text-green-600', dot: 'bg-green-500' },
    [ProposalStatus.REJECTED]: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
};