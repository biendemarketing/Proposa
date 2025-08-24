import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';

const LoginPage: React.FC = () => {
    const { navigate, login } = useAppContext();
    const [email, setEmail] = useState('user@proposa.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (!success) {
            setError('Email o contraseña incorrectos.');
        }
    };

    return (
        <AuthLayout title="Iniciar Sesión">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full py-2"
                >
                    Entrar
                </button>
                <p className="text-center text-sm text-slate-600">
                    ¿No tienes una cuenta?{' '}
                    <button onClick={() => navigate(AppView.REGISTER)} className="font-semibold text-indigo-600 hover:underline">
                        Regístrate
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;