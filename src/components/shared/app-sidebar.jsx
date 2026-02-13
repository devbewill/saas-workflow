import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, BarChart3, Settings, LogOut, ShieldCheck } from 'lucide-react';
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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <AppSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#f44336]/10 text-[#f44336]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <LogOut size={18} />
          Disconnetti
        </button>
      </div>
    </aside>
  );
}
