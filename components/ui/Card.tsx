
import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md border border-slate-200 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
