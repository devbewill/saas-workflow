import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check } from 'lucide-react';
import { APPS } from '@/config/apps-config';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export function AppSwitcher() {
    const { activeApp, setActiveApp } = useAppContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-muted text-left w-full outline-none group">
                    <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-all group-hover:scale-105",
                        activeApp.id === 'HD_CEF' ? "bg-primary text-primary-foreground" : "bg-emerald-600 text-white"
                    )}>
                        <activeApp.icon size={20} />
                    </div>
                    <div className="flex flex-col leading-none flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold tracking-tight text-foreground truncate">
                                {activeApp.name}
                            </span>
                            <ChevronDown size={14} className="text-muted-foreground ml-1" />
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 truncate">
                            {activeApp.label}
                        </span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px] p-2">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                    Seleziona Applicazione
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.values(APPS).map((app) => (
                    <DropdownMenuItem
                        key={app.id}
                        onClick={() => setActiveApp(app)}
                        className={cn(
                            "flex items-center gap-3 p-2 cursor-pointer mb-1 rounded-md",
                            activeApp.id === app.id && "bg-accent text-accent-foreground"
                        )}
                    >
                        <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md",
                            app.id === 'HD_CEF' ? "bg-primary/10 text-primary" : "bg-emerald-600/10 text-emerald-600"
                        )}>
                            <app.icon size={16} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-semibold">{app.name}</span>
                            <span className="text-[10px] text-muted-foreground">{app.label}</span>
                        </div>
                        {activeApp.id === app.id && (
                            <Check size={14} className="text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
