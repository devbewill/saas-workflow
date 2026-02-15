import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, BarChart3, Settings, LogOut, ShieldCheck, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSwitcher } from './app-switcher';
import { useAppContext } from '@/context/AppContext';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Progetti', path: '/projects' },
  { icon: Users, label: 'Clienti', path: '/clienti' },
  { icon: BarChart3, label: 'Report', path: '/report' },
  { icon: Settings, label: 'Impostazioni', path: '/settings' },
];

export function AppSidebar() {
  const { activeApp } = useAppContext();

  const filteredNavItems = [...NAV_ITEMS];

  if (activeApp?.id === 'HD_RISTR') {
    // Insert Pagamenti after Progetti (index 1)
    filteredNavItems.splice(2, 0, { icon: Wallet, label: 'Pagamenti', path: '/payments' });
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar-bg text-sidebar-foreground">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-6 border-b border-border/40 mb-2">
        <AppSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-4">
        <div className="px-2 py-2 text-[10px] font-bold tracking-widest text-sidebar-muted/60">
          Menu principale
        </div>
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300",
                isActive
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-sidebar-muted hover:bg-slate-50 hover:text-sidebar-foreground"
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
      <div className="border-t border-border/40 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-sidebar-muted transition-all hover:bg-slate-50 hover:text-sidebar-foreground">
          <LogOut size={18} />
          Disconnetti
        </button>
      </div>
    </aside>
  );
}
