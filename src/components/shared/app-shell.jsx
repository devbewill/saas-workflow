import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';

export default function AppShell() {
    return (
        <div className="min-h-screen bg-muted/40 font-sans antialiased">
            <AppSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <AppHeader />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
