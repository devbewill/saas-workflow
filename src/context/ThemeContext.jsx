/**
 * ThemeContext - Centralized theme and font management
 * Extracted from WorkflowContext to remove unused workflow state
 */
import React, { createContext, useContext, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const ThemeContext = createContext();

export const FONTS = {
    inter: { name: 'Inter', class: 'font-["Inter"]', description: 'Clean & versatile' },
};

export const THEMES = {
    antigravity: {
        id: 'antigravity',
        name: 'Antigravity (Nexus)',
        icon: ShieldCheck,
        font: 'font-["Inter",sans-serif]',
        bg: 'bg-slate-50/90',
        card: 'bg-white border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        cardHover: 'hover:border-blue-200 hover:shadow-md transition-all duration-200',
        sidebar: 'bg-white border-r border-slate-200',
        topbar: 'bg-white/80 backdrop-blur-md border-b border-slate-200',
        text: 'text-slate-900',
        textMuted: 'text-slate-500',
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
        accentColor: 'blue',
        radius: 'rounded-lg',
        badge: 'bg-slate-100 text-slate-700 border border-slate-200 font-medium px-2 py-0.5'
    }
};

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState('antigravity');
    const [currentFont, setCurrentFont] = useState('inter');

    const theme = { ...THEMES[currentTheme], font: FONTS[currentFont].class };

    const value = {
        currentTheme,
        theme,
        setTheme: setCurrentTheme,
        currentFont,
        setFont: setCurrentFont,
    };

    return (
        <ThemeContext.Provider value={value}>
            <div className={theme.font}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
