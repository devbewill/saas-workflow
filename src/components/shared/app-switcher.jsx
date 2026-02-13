import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { APPS } from '@/config/apps-config';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export function AppSwitcher() {
    const { activeApp, setActiveApp } = useAppContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all hover:bg-slate-50 focus:outline-none group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-lg shadow-accent/20">
                        <activeApp.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm font-bold tracking-tight text-primary group-hover:text-accent transition-colors">{activeApp.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{activeApp.version}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-accent transition-all group-data-[state=open]:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 mt-2 overflow-hidden rounded-xl border-border bg-white p-1 shadow-2xl">
                <div className="px-3 py-2 mb-1 border-b border-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Seleziona app</p>
                </div>
                {Object.values(APPS).map((app) => (
                    <DropdownMenuItem
                        key={app.id}
                        onClick={() => setActiveApp(app)}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer",
                            activeApp.id === app.id
                                ? "bg-accent/5 text-accent font-bold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                        )}
                    >
                        <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                            activeApp.id === app.id ? "bg-accent text-accent-foreground" : "bg-slate-100"
                        )}>
                            <app.icon size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-primary">{app.name}</span>
                            <span className="text-[10px] text-muted-foreground">{app.label}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
