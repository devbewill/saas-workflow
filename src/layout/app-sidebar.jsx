import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSwitcher } from './app-switcher';
import { useAppContext } from '@/context/app-context';
import { getNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
    const { activeApp } = useAppContext();
    const navItems = getNavItems(activeApp.id);

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
            {/* Header */}
            <div className="flex h-16 items-center px-6 border-b">
                <AppSwitcher />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Menu principale
                </p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                isActive
                                    ? 'bg-accent/10 text-accent font-semibold'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-3">
                    <LogOut size={18} />
                    Disconnetti
                </Button>
            </div>
        </aside>
    );
}
