import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_APP, APPS } from '@/config/apps-config';

const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [activeApp, setActiveApp] = useState(() => {
        const savedAppId = localStorage.getItem('activeAppId');
        if (savedAppId && APPS[savedAppId]) {
            return APPS[savedAppId];
        }
        return DEFAULT_APP;
    });

    const handleSetActiveApp = (app) => {
        setActiveApp(app);
        localStorage.setItem('activeAppId', app.id);
    };

    const value = {
        activeApp,
        setActiveApp: handleSetActiveApp,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}
