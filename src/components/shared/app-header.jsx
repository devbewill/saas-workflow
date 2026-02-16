import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronDown, User, LogOut, Settings, RefreshCw, Palette, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppContext } from '@/context/AppContext';
import { ROLE_POLICIES, ROLES } from '@/config/roles-config';

export function AppHeader() {
  const navigate = useNavigate();
  const { user, setUserRole } = useAppContext();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-white/60 px-8 backdrop-blur-xl">
      {/* Search Bar - Refined */}
      <div className="flex flex-1 items-center gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Cerca pratica, perito o nota..."
            className="h-10 w-80 rounded-md border border-border/50 bg-slate-50/50 pl-10 pr-4 text-sm transition-all placeholder:text-muted-foreground/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative rounded-full p-2.5 text-muted-foreground hover:bg-slate-100 hover:text-primary transition-all duration-200">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white"></span>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-border/60"></div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 group focus:outline-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-white transition-transform group-hover:scale-105">
                <span className="text-[12px] font-bold tracking-tight">{user.initials}</span>
              </div>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-primary">{user.name}</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                  {ROLE_POLICIES[user.role]?.label?.split(' ')[0] || user.role}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/5 p-1" align="end">
            <div className="px-3 py-3 mb-1 border-b border-slate-50">
              <p className="text-sm font-bold text-primary">{user.name}</p>
              <p className="text-[11px] text-muted-foreground">{user.email}</p>
            </div>

            <DropdownMenuGroup className="px-1">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer focus:bg-primary focus:text-white data-[state=open]:bg-primary data-[state=open]:text-white group/sub">
                  <ShieldCheck className="h-4 w-4 text-primary/60 group-focus/sub:text-white group-data-[state=open]/sub:text-white transition-colors" />
                  <span className="font-medium">Simula Ruolo</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56 p-1 shadow-2xl">
                  <DropdownMenuLabel className="px-3 pb-1.5 pt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Seleziona Ruolo
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {Object.entries(ROLE_POLICIES).map(([roleKey, policy]) => (
                      <DropdownMenuItem
                        key={roleKey}
                        onClick={() => setUserRole(roleKey)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg py-2 px-3 cursor-pointer transition-colors",
                          user.role === roleKey
                            ? "bg-accent/10 text-accent font-bold"
                            : "hover:bg-slate-50 text-slate-600"
                        )}
                      >
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          user.role === roleKey ? "bg-accent shadow-[0_0_8px_rgba(var(--accent),0.5)]" : "bg-slate-200"
                        )} />
                        <span className="text-xs">{policy.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1 bg-slate-50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer hover:bg-slate-50">
                <User className="h-4 w-4 text-primary/60" />
                <span className="font-medium">Mio Profilo</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer hover:bg-slate-50">
                <Settings className="h-4 w-4 text-primary/60" />
                <span className="font-medium">Impostazioni</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-slate-50" />
              <DropdownMenuItem
                onClick={() => navigate('/design-system')}
                className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer hover:bg-blue-50 text-blue-600 focus:bg-blue-50 focus:text-blue-600"
              >
                <Palette className="h-4 w-4" />
                <span className="font-bold">Design System</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 bg-slate-50" />
            <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2.5 px-3 text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span className="font-semibold">Esci dalla piattaforma</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
