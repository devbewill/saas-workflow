import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { APPS } from '@/config/apps';
import { useAppContext } from '@/context/app-context';
import { cn } from '@/lib/utils';

export function AppSwitcher() {
    const { activeApp, setActiveApp } = useAppContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus:outline-none">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                        <activeApp.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm font-semibold">{activeApp.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{activeApp.version}</span>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Seleziona app</p>
                {Object.values(APPS).map((app) => (
                    <DropdownMenuItem
                        key={app.id}
                        onClick={() => setActiveApp(app)}
                        className={cn(
                            'flex items-center gap-3 cursor-pointer',
                            activeApp.id === app.id && 'bg-accent/10'
                        )}
                    >
                        <div className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-md',
                            activeApp.id === app.id ? 'bg-accent text-accent-foreground' : 'bg-muted'
                        )}>
                            <app.icon size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{app.name}</span>
                            <span className="text-xs text-muted-foreground">{app.label}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
