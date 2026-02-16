import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_APP, APPS } from '@/config/apps';
import { MOCK_USER } from '@/config/roles';

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
    const [activeApp, setActiveApp] = useState(() => {
        const savedAppId = localStorage.getItem('activeAppId');
        return (savedAppId && APPS[savedAppId]) ? APPS[savedAppId] : DEFAULT_APP;
    });

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('simulatedUser');
        if (saved) {
            try { return JSON.parse(saved); } catch { return MOCK_USER; }
        }
        return MOCK_USER;
    });

    const handleSetActiveApp = (app) => {
        setActiveApp(app);
        localStorage.setItem('activeAppId', app.id);
    };

    const handleSetUserRole = (role) => {
        const updated = { ...user, role };
        setUser(updated);
        localStorage.setItem('simulatedUser', JSON.stringify(updated));
    };

    return (
        <AppContext.Provider value={{ activeApp, setActiveApp: handleSetActiveApp, user, setUserRole: handleSetUserRole }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
    return ctx;
}
