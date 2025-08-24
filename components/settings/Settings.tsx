import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Icon from '../icons/Icon';
import { mockTeamMembers, mockActiveSessions, mockApiKeys } from '../../data/mockData';
import { TeamMember } from '../../types';

type SettingsTab = 'profile' | 'organization' | 'members' | 'billing' | 'notifications' | 'security';

interface SettingsProps {
    initialTab?: SettingsTab;
}

const Settings: React.FC<SettingsProps> = ({ initialTab = 'profile' }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
    
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const renderContent = () => {
        switch(activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'organization': return <OrganizationSettings />;
            case 'members': return <MembersSettings />;
            case 'billing': return <BillingSettings />;
            case 'notifications': return <NotificationsSettings />;
            case 'security': return <SecuritySettings />;
            default: return null;
        }
    };

    const TabButton: React.FC<{ tabId: SettingsTab, label: string }> = ({ tabId, label }) => (
        <button 
            onClick={() => setActiveTab(tabId)}
            className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${activeTab === tabId ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 font-serif">Configuración</h1>
                <p className="text-slate-500 mt-1">Gestiona tu cuenta y la configuración de tu organización.</p>
            </div>
            <div className="flex space-x-1 sm:space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
                <TabButton tabId="profile" label="Perfil" />
                <TabButton tabId="organization" label="Organización" />
                <TabButton tabId="members" label="Miembros" />
                <TabButton tabId="security" label="Seguridad" />
                <TabButton tabId="billing" label="Facturación" />
                <TabButton tabId="notifications" label="Notificaciones" />
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

const ProfileSettings: React.FC = () => (
    <Card className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Perfil y Cuenta</h2>
        <form className="space-y-4 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input type="text" defaultValue="Carlos Vega" className="w-full p-2 border border-slate-300 rounded-md" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" defaultValue="carlos@proposa.com" className="w-full p-2 border border-slate-300 rounded-md bg-slate-100" readOnly />
            </div>
            <div className="pt-2 flex justify-end">
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar Cambios</button>
            </div>
        </form>
    </Card>
);

const SecuritySettings: React.FC = () => (
    <Card className="p-6 space-y-8">
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Cambiar Contraseña</h2>
            <form className="space-y-4 max-w-lg">
                <input type="password" placeholder="Contraseña Actual" className="w-full p-2 border border-slate-300 rounded-md" />
                <input type="password" placeholder="Nueva Contraseña" className="w-full p-2 border border-slate-300 rounded-md" />
                <input type="password" placeholder="Confirmar Nueva Contraseña" className="w-full p-2 border border-slate-300 rounded-md" />
                <div className="pt-2 flex justify-end">
                    <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Actualizar Contraseña</button>
                </div>
            </form>
        </div>
         <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Autenticación de Dos Factores (2FA)</h2>
            <div className="flex items-start bg-slate-50 p-4 rounded-lg">
                <Icon name="ShieldCheck" className="w-8 h-8 text-green-500 mr-4"/>
                <div>
                    <p className="font-semibold text-slate-700">Añade una capa extra de seguridad a tu cuenta.</p>
                    <p className="text-sm text-slate-500">Una vez habilitado, se te pedirá un código de autenticación además de tu contraseña al iniciar sesión.</p>
                    <button className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-800">Habilitar 2FA</button>
                </div>
            </div>
        </div>
         <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Sesiones Activas</h2>
             <ul className="divide-y divide-slate-200">
                {mockActiveSessions.map(session => (
                    <li key={session.id} className="py-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-slate-800">{session.device}</p>
                            <p className="text-sm text-slate-500">{session.location} - <span className="font-semibold">{session.lastSeen}</span></p>
                        </div>
                        <button className="text-sm font-semibold text-slate-500 hover:text-red-600">Cerrar Sesión</button>
                    </li>
                ))}
            </ul>
        </div>
    </Card>
);

const OrganizationSettings: React.FC = () => (
    <Card className="p-6 space-y-8">
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Detalles de la Organización</h2>
            <form className="space-y-4 max-w-lg">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Organización</label>
                    <input type="text" defaultValue="Proposa Inc." className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
                    <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Color de Marca Primario</label>
                    <input type="color" defaultValue="#4f46e5" className="w-20 h-10 p-1 border border-slate-300 rounded-md" />
                </div>
                <div className="pt-2 flex justify-end">
                    <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar Cambios</button>
                </div>
            </form>
        </div>
        <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Claves API</h2>
                <button className="flex items-center bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Generar Clave
                </button>
            </div>
             <ul className="divide-y divide-slate-200">
                {mockApiKeys.map(key => (
                    <li key={key.id} className="py-3">
                         <div className="flex justify-between items-center">
                            <p className="font-medium text-slate-800 font-mono text-sm">{key.name}</p>
                            <p className="text-xs text-slate-400">Creada: {new Date(key.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className="flex items-center justify-between mt-2">
                             <code className="text-sm bg-slate-100 p-1 rounded">{key.key}</code>
                            <button className="p-2 text-slate-400 hover:text-red-500" title="Revocar Clave"><Icon name="Trash2" className="w-4 h-4" /></button>
                         </div>
                         <p className="text-xs text-slate-500 mt-1">Último uso: {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Nunca'}</p>
                    </li>
                ))}
            </ul>
        </div>
    </Card>
);

const MembersSettings: React.FC = () => (
    <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Miembros del Equipo</h2>
            <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Invitar Miembro
            </button>
        </div>
         <ul className="divide-y divide-slate-200">
            {mockTeamMembers.map(member => (
                <li key={member.id} className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-medium text-slate-800">{member.name} <span className="text-xs text-slate-500">({member.email})</span></p>
                        <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                    <div>
                        {member.status === 'active' ? (
                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>
                        ) : (
                            <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pendiente</span>
                        )}
                    </div>
                </li>
            ))}
         </ul>
    </Card>
);

const BillingSettings: React.FC = () => (
    <Card className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Facturación y Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-slate-700">Plan Actual: <span className="text-indigo-600">Pro</span></p>
                        <button className="text-sm font-semibold text-indigo-600 hover:underline">Cambiar Plan</button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Tu plan se renueva el 15 de Noviembre, 2024.</p>
                </div>
                 <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="font-semibold text-slate-700">Método de Pago</p>
                     <div className="flex items-center mt-2">
                        <Icon name="CreditCard" className="w-6 h-6 mr-3 text-slate-500"/>
                        <p className="text-sm text-slate-600">Visa terminada en 4242</p>
                        <button className="ml-auto text-sm font-semibold text-indigo-600 hover:underline">Actualizar</button>
                     </div>
                </div>
            </div>
            <div className="md:col-span-1">
                 <h3 className="font-semibold text-slate-800 mb-2">Historial de Facturas</h3>
                 <ul className="divide-y divide-slate-200 border rounded-lg">
                    <li className="p-3 text-sm flex justify-between"><span>Oct 2024</span> <a href="#" className="text-indigo-600 hover:underline">Descargar</a></li>
                    <li className="p-3 text-sm flex justify-between"><span>Sep 2024</span> <a href="#" className="text-indigo-600 hover:underline">Descargar</a></li>
                    <li className="p-3 text-sm flex justify-between"><span>Ago 2024</span> <a href="#" className="text-indigo-600 hover:underline">Descargar</a></li>
                 </ul>
            </div>
        </div>
    </Card>
);

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${enabled ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}
    >
        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform" />
    </button>
);


const NotificationsSettings: React.FC = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [weeklySummary, setWeeklySummary] = useState(false);

    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Notificaciones</h2>
            <div className="space-y-4 max-w-2xl">
                <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50">
                    <div>
                        <p className="font-medium text-slate-700">Notificaciones por Email</p>
                        <p className="text-sm text-slate-500">Recibe un correo cuando una propuesta sea vista, comentada o aprobada.</p>
                    </div>
                    <Toggle enabled={emailNotifications} onChange={setEmailNotifications} />
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50">
                    <div>
                        <p className="font-medium text-slate-700">Resumen Semanal</p>
                        <p className="text-sm text-slate-500">Recibe un resumen del rendimiento de tus propuestas cada semana.</p>
                    </div>
                     <Toggle enabled={weeklySummary} onChange={setWeeklySummary} />
                </div>
                <div className="pt-2 flex justify-end">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar Preferencias</button>
                </div>
            </div>
        </Card>
    );
}

export default Settings;
