import React from 'react';
import Icon from '../icons/Icon';
import Card from '../ui/Card';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
            <div className="flex items-center mb-8">
                <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <Icon name="FileText" className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Proposa</h1>
            </div>
            <Card className="w-full max-w-sm">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">{title}</h2>
                    {children}
                </div>
            </Card>
        </div>
    );
};

export default AuthLayout;
