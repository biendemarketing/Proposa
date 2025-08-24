import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import AuthLayout from './AuthLayout';

const RegisterPage: React.FC = () => {
    const { navigate, register } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        const success = register(name, email, password);
        if (!success) {
            setError('Hubo un error al registrar la cuenta.');
        }
    };

    return (
        <AuthLayout title="Crear Cuenta">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-md"
                        required
                    />
                </div>
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
                    Registrarse
                </button>
                <p className="text-center text-sm text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <button onClick={() => navigate(AppView.LOGIN)} className="font-semibold text-indigo-600 hover:underline">
                        Inicia Sesión
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;