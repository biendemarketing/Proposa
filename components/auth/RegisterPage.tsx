import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';
import Icon from '../icons/Icon';

const RegisterPage: React.FC = () => {
    const { navigate, register, theme } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!agreed) {
            setError('Debes aceptar los Términos y Condiciones.');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        const success = register(`${firstName} ${lastName}`, email, password);
        if (!success) {
            setError('Ocurrió un error durante el registro.');
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold text-foreground mb-2">Crea una cuenta</h1>
            <p className="text-muted-foreground mb-8">
                ¿Ya tienes una cuenta?{' '}
                <button onClick={() => navigate(AppView.LOGIN)} className="font-semibold text-purple-500 hover:underline dark:text-purple-400">
                    Inicia sesión
                </button>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <p className={`text-sm text-center p-2 rounded-md ${theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-400'}`}>{error}</p>}
                
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="auth-input" placeholder="Nombre" required />
                    </div>
                    <div className="flex-1">
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="auth-input" placeholder="Apellido" required />
                    </div>
                </div>
                
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="Correo Electrónico" required />
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
                
                <div className="flex items-center">
                    <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 text-purple-600 bg-card border-border rounded focus:ring-purple-500"/>
                    <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
                        Acepto los <a href="#" className="text-purple-500 hover:underline dark:text-purple-400">Términos y Condiciones</a>
                    </label>
                </div>

                <button type="submit" className="btn-auth-primary">
                    Crear cuenta
                </button>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">O regístrate con</span>
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

export default RegisterPage;