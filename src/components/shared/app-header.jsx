import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, LogOut, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data (temporaneo, poi sposta in context o props)
const USER = {
  name: 'Marzia Brambilla',
  email: 'marzia@example.com',
  role: 'Frontoffice'
};

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-white/60 px-8 backdrop-blur-xl">
      {/* Search Bar - Refined */}
      <div className="flex flex-1 items-center gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Cerca pratica, perito o nota..."
            className="h-10 w-80 rounded-full border border-border/50 bg-slate-50/50 pl-10 pr-4 text-sm transition-all placeholder:text-muted-foreground/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
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
                <span className="text-[12px] font-bold tracking-tight">{USER.name.charAt(0)}{USER.name.split(' ')[1]?.charAt(0)}</span>
              </div>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-primary">{USER.name}</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{USER.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/5 p-1" align="end">
            <div className="px-3 py-3 mb-1 border-b border-slate-50">
              <p className="text-sm font-bold text-primary">{USER.name}</p>
              <p className="text-[11px] text-muted-foreground">{USER.email}</p>
            </div>
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer hover:bg-slate-50">
                <User className="h-4 w-4 text-primary/60" />
                <span className="font-medium">Mio Profilo</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer hover:bg-slate-50">
                <Settings className="h-4 w-4 text-primary/60" />
                <span className="font-medium">Impostazioni</span>
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
