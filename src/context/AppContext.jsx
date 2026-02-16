import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_APP, APPS } from '@/config/apps-config';
import { MOCK_USER, ROLES } from '@/config/roles-config';

const AppContext = createContext();

export function AppContextProvider({ children }) {
    // App State
    const [activeApp, setActiveApp] = useState(() => {
        const savedAppId = localStorage.getItem('activeAppId');
        if (savedAppId && APPS[savedAppId]) {
            return APPS[savedAppId];
        }
        return DEFAULT_APP;
    });

    // User / Role State for Simulation
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('simulatedUser');
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return MOCK_USER;
            }
        }
        return MOCK_USER;
    });

    const handleSetActiveApp = (app) => {
        setActiveApp(app);
        localStorage.setItem('activeAppId', app.id);
    };

    const handleSetUserRole = (role) => {
        const updatedUser = { ...user, role };
        setUser(updatedUser);
        localStorage.setItem('simulatedUser', JSON.stringify(updatedUser));
    };

    const value = {
        activeApp,
        setActiveApp: handleSetActiveApp,
        user,
        setUserRole: handleSetUserRole,
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
