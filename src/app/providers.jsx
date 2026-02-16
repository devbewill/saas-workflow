import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from '@/context/app-context';

/**
 * Providers — wraps the app with all required context providers.
 */
export function Providers({ children }) {
    return (
        <BrowserRouter>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </BrowserRouter>
    );
}
