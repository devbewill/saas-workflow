import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { AiAssistantFab } from '../features/ai-assistant/components/ai-assistant-fab';

export default function AppShell() {
    return (
        <div className="min-h-screen bg-background antialiased relative">
            <AppSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <AppHeader />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            <AiAssistantFab />
        </div>
    );
}
