
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color: {
        bg: string;
        text: string;
        dot: string;
    };
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
            <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${color.dot}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {children}
        </span>
    );
};

export default Badge;
