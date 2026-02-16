import React, { Suspense } from 'react';
import AppRoutes from './routes';

export default function App() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-muted-foreground">Caricamento...</div>}>
            <AppRoutes />
        </Suspense>
    );
}
