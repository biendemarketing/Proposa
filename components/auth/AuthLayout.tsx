import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import Icon from '../icons/Icon';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const { navigate } = useAppContext();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans text-foreground">
            <div className="auth-container">
                {/* Left Panel */}
                <div className="auth-brand-panel">
                    <div className="flex justify-between items-center">
                        <div className="auth-logo">
                            <span>A</span><span>M</span><span>U</span>
                        </div>
                        <button onClick={() => navigate(AppView.LANDING)} className="glass-button">
                            Volver al sitio web <Icon name="ExternalLink" className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                    <div className="auth-tagline">
                        <h2>Capturando Momentos, <br />Creando Recuerdos</h2>
                        <div className="auth-slider-dots">
                            <span className=""></span>
                            <span className=""></span>
                            <span className="active"></span>
                        </div>
                    </div>
                </div>

                {/* Right Panel (Form) */}
                <div className="auth-form-panel">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;