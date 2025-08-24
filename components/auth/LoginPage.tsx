import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';
import Icon from '../icons/Icon';

const LoginPage: React.FC = () => {
    const { navigate, login, theme } = useAppContext();
    const [email, setEmail] = useState('user@proposa.com');
    const [password, setPassword] = useState('password123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (!success) {
            setError('Correo electrónico o contraseña inválidos.');
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold text-foreground mb-2">¡Bienvenido de nuevo!</h1>
            <p className="text-muted-foreground mb-8">
                ¿No tienes una cuenta?{' '}
                <button onClick={() => navigate(AppView.REGISTER)} className="font-semibold text-purple-500 hover:underline dark:text-purple-400">
                    Regístrate
                </button>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <p className={`text-sm text-center p-2 rounded-md ${theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-400'}`}>{error}</p>}
                
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        placeholder="tu@ejemplo.com"
                        required
                    />
                </div>
                
                <div>
                     <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-muted-foreground">Contraseña</label>
                        <button type="button" className="text-sm text-purple-500 hover:underline dark:text-purple-400">¿Olvidaste tu contraseña?</button>
                    </div>
                    <div className="auth-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-input-icon">
                            <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <button type="submit" className="btn-auth-primary">
                    Iniciar Sesión
                </button>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">O inicia sesión con</span>
                <div className="flex-grow border-t border-border"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                 <button className="btn-auth-secondary">
                    <Icon name="Google" className="w-5 h-5" />
                    Google
                </button>
                <button className="btn-auth-secondary">
                    <Icon name="Apple" className="w-5 h-5" />
                    Apple
                </button>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;