import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppView } from '../../types';
import Icon from '../icons/Icon';

// Custom hook for the spotlight effect
const useSpotlight = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
        cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
    };

    return { cardRef, handleMouseMove };
};

// Spotlight Card component
const SpotlightCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
    const { cardRef, handleMouseMove } = useSpotlight();
    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} className={`spotlight-card rounded-xl border border-border bg-card text-card-foreground p-8 ${className}`}>
            <div className="glowing-border"></div>
            <div className="relative z-10">{children}</div>
        </div>
    );
};


// Sub-component for FAQ items to handle its own state
const FaqItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h3 className="font-semibold text-foreground">{q}</h3>
                <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} className="w-5 h-5 text-purple-400 flex-shrink-0" />
            </button>
            {isOpen && <p className="mt-2 text-muted-foreground pr-6">{a}</p>}
        </div>
    );
};

// Sub-component for pricing toggle
const PricingToggle: React.FC<{ currency: string; setCurrency: (c: 'dop' | 'usd') => void }> = ({ currency, setCurrency }) => (
    <div className="inline-flex items-center bg-muted rounded-full p-1">
        <button onClick={() => setCurrency('dop')} className={`px-4 py-1 text-sm font-semibold rounded-full ${currency === 'dop' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}>
            RD$
        </button>
        <button onClick={() => setCurrency('usd')} className={`px-4 py-1 text-sm font-semibold rounded-full ${currency === 'usd' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}>
            USD
        </button>
    </div>
);


const LandingPage: React.FC = () => {
    const { navigate, theme, toggleTheme } = useAppContext();
    const [currency, setCurrency] = useState<'dop' | 'usd'>('dop');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const hero = {
        h1_line1: "Crea Propuestas",
        h1_line2: "que Cierran Tratos.",
        subtitle: "Una plataforma de última generación para crear, compartir y cerrar propuestas con la ayuda de IA, analíticas en tiempo real y una experiencia de cliente inigualable.",
        ctaPrimary: "Empieza ahora",
        ctaSecondary: "Ver demo",
    };

    const features = [
        { icon: 'MessageSquare', name: 'Comentarios en tiempo real', description: "Colabora sin fricción con clientes y tu equipo directamente sobre la propuesta." }, 
        { icon: 'LayoutTemplate', name: 'Plantillas Inteligentes', description: "Acelera tu flujo de trabajo con plantillas listas para usar y personalizables." },
        { icon: 'BarChart', name: 'Analíticas de Engagement', description: "Descubre qué secciones leen tus clientes y por cuánto tiempo para optimizar tu contenido." }, 
        { icon: 'Bot', name: 'Asistente IA', description: "Genera contenido persuasivo y profesional en segundos con nuestro asistente de IA." },
        { icon: 'Palette', name: 'Temas Personalizables', description: "Adapta el diseño a tu marca con temas y estilos que puedes modificar a tu gusto." }, 
        { icon: 'ShieldCheck', name: 'Seguridad Empresarial', description: "Protege tus propuestas con enlaces seguros, contraseñas y fechas de expiración." },
        { icon: 'EditSquare', name: 'Firma Digital Avanzada', description: "Cierra tratos más rápido con firmas electrónicas legalmente vinculantes." }, 
        { icon: 'Zap', name: 'Integraciones', description: "Conecta Proposa con tus herramientas favoritas para un flujo de trabajo sin interrupciones." },
    ];
    
    const pricingPlans = {
        dop: [
            { name: 'Free', price: '0', features: ['3 propuestas/mes', 'Plantillas básicas', 'Firma digital'], cta: 'Empieza gratis' },
            { name: 'Pro', price: '1,500', isFeatured: true, features: ['Propuestas ilimitadas', 'Temas personalizados', 'PDF 1:1', 'Métricas completas'], cta: 'Prueba Pro' },
            { name: 'Business', price: 'Contactar', features: ['Todo en Pro', 'Multi-equipo', 'Dominios personalizados', 'Roles avanzados'], cta: 'Habla con ventas' },
        ],
        usd: [
            { name: 'Free', price: '0', features: ['3 propuestas/mes', 'Plantillas básicas', 'Firma digital'], cta: 'Empieza gratis' },
            { name: 'Pro', price: '29', isFeatured: true, features: ['Propuestas ilimitadas', 'Temas personalizados', 'PDF 1:1', 'Métricas completas'], cta: 'Try Pro' },
            { name: 'Business', price: 'Contactar', features: ['Everything in Pro', 'Multi-team', 'Custom domains', 'Advanced roles'], cta: 'Contact Sales' },
        ]
    };
     const faqItems = [
        { q: "¿El cliente necesita una cuenta para aprobar?", a: "No. Tu cliente puede ver, comentar y aprobar la propuesta directamente desde el enlace que le envías, sin necesidad de registrarse." },
        { q: "¿Puedo poner contraseña y expiración al link?", a: "Sí. En nuestros planes de pago, puedes proteger tus propuestas con una contraseña y establecer una fecha de expiración para el enlace." },
        { q: "¿Se registran las vistas únicas y el tiempo de lectura?", a: "Sí. Nuestro panel de analíticas te muestra cuántas personas han visto la propuesta, cuánto tiempo pasaron en cada sección y más." },
        { q: "¿El PDF respeta el diseño 1:1?", a: "Absolutamente. El PDF exportado es una copia fiel de tu propuesta digital, incluyendo la portada, numeración de páginas y el tema que hayas seleccionado." },
    ];

    return (
        <div className="bg-background text-foreground font-sans antialiased overflow-x-hidden">
             <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-50 border-b border-border">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-indigo-500 p-2 rounded-lg mr-3"><Icon name="FileText" className="w-6 h-6 text-white" /></div>
                        <h1 className="text-xl font-bold tracking-tighter text-foreground">Proposa</h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#features" className="text-muted-foreground hover:text-foreground">Funcionalidades</a>
                        <a href="#pricing" className="text-muted-foreground hover:text-foreground">Precios</a>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted">
                            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <button onClick={() => navigate(AppView.LOGIN)} className="font-semibold text-foreground">Login</button>
                        <button onClick={() => navigate(AppView.REGISTER)} className="btn btn-primary px-4 py-2">
                            Empieza gratis
                        </button>
                    </nav>
                     <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted">
                           <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-muted" aria-label="Toggle menu">
                            <Icon name={isMenuOpen ? 'X' : 'Menu'} className="w-6 h-6 text-muted-foreground" />
                        </button>
                    </div>
                </div>
                 {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-border py-4 animate-fade-in-down">
                        <nav className="container mx-auto px-6 flex flex-col items-center space-y-4">
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Funcionalidades</a>
                            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Precios</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate(AppView.LOGIN); setIsMenuOpen(false); }} className="font-semibold text-foreground">Login</a>
                            <button onClick={() => { navigate(AppView.REGISTER); setIsMenuOpen(false); }} className="btn btn-primary px-4 py-2 w-full max-w-xs">
                                Empieza gratis
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <main>
                {/* Hero */}
                <section className={`text-center py-24 md:py-32 relative hero-light-bg`}>
                    <div className="container mx-auto px-6">
                        {theme === 'dark' && (
                            <div className="absolute inset-0 -z-10 overflow-hidden">
                                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/30 rounded-full filter blur-3xl opacity-50 animate-[blob_8s_infinite]"></div>
                                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-[blob_12s_infinite_4s]"></div>
                            </div>
                        )}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                            {hero.h1_line1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">{hero.h1_line2}</span>
                        </h1>
                        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">{hero.subtitle}</p>
                        <div className="mt-8 flex justify-center items-center gap-4">
                            <button onClick={() => navigate(AppView.REGISTER)} className="btn btn-primary px-6 py-3">{hero.ctaPrimary}</button>
                            <button className="btn btn-secondary px-6 py-3">{hero.ctaSecondary}</button>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight">Todo lo que necesitas para cerrar más rápido</h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Desde la creación hasta la firma, Proposa optimiza cada paso del proceso de ventas.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map(feature => (
                                <SpotlightCard key={feature.name}>
                                    <Icon name={feature.icon} className="w-8 h-8 text-purple-400 mb-4" />
                                    <h3 className="font-semibold text-lg text-foreground mb-2">{feature.name}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="py-20">
                     <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight">Un plan para cada equipo</h2>
                            <p className="mt-4 text-muted-foreground">Empieza gratis y escala a medida que creces.</p>
                            <div className="mt-6">
                                <PricingToggle currency={currency} setCurrency={setCurrency as (c: 'dop' | 'usd') => void} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {(pricingPlans[currency]).map(plan => (
                                <SpotlightCard key={plan.name} className={`flex flex-col ${plan.isFeatured ? 'border-purple-400' : ''}`}>
                                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                                    <p className="text-4xl font-bold my-4">{plan.price !== 'Contactar' && (currency === 'dop' ? 'RD$' : '$')}{plan.price}</p>
                                    <ul className="space-y-3 text-muted-foreground flex-grow">
                                        {plan.features.map(feature => <li key={feature} className="flex items-start"><Icon name="Check" className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />{feature}</li>)}
                                    </ul>
                                    <button className={`btn w-full mt-8 py-2 ${plan.isFeatured ? 'btn-primary' : 'btn-secondary'}`}>{plan.cta}</button>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* FAQ */}
                <section className="py-20">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight">Preguntas Frecuentes</h2>
                        </div>
                        <div>
                            {faqItems.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold tracking-tight">Envía tu próxima propuesta en 5 minutos.</h2>
                        <div className="mt-8">
                            <button onClick={() => navigate(AppView.REGISTER)} className="btn btn-primary px-8 py-4 text-lg">Crear cuenta gratis</button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border mt-20">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Proposa. Todos los derechos reservados.</p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                         <a href="#" className="text-muted-foreground hover:text-foreground">Términos</a>
                         <a href="#" className="text-muted-foreground hover:text-foreground">Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;