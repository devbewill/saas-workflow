import React from 'react';
import { useAppContext } from '@/context/app-context';
import { ROLES, ROLE_POLICIES } from '@/config/roles';
import { getInitials } from '@/lib/formatters';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Settings, LogOut, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppHeader() {
    const { user, setUserRole, activeApp } = useAppContext();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
            {/* Left: App label */}
            <div>
                <h2 className="text-sm font-semibold">{activeApp.label}</h2>
            </div>

            {/* Right: Actions + User menu */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Bell size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings size={18} />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus:outline-none">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-sm font-medium">{user.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                    {ROLE_POLICIES[user.role]?.label || user.role}
                                </span>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>Profilo</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {/* Role simulation sub-menu */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserCog className="mr-2 h-4 w-4" />
                                Simula Ruolo
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                {Object.entries(ROLE_POLICIES).map(([roleKey, policy]) => (
                                    <DropdownMenuItem
                                        key={roleKey}
                                        onClick={() => setUserRole(roleKey)}
                                        className={cn(user.role === roleKey && 'bg-primary/10 text-primary font-semibold')}
                                    >
                                        {policy.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            Disconnetti
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
