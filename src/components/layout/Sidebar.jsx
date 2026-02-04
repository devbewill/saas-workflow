import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MENU_ITEMS } from '@/data/mockData';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo Area */}
      <div className="p-6">
        <div className="flex items-center gap-2">
           {/* Custom Logo Placeholder matching 'HD LA106' style */}
           <div className="grid grid-cols-2 gap-0.5 w-8">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-transparent"></div>
           </div>
           <div className="flex flex-col leading-none">
              <span className="font-bold text-slate-900 tracking-tight">HD</span>
              <span className="text-xs text-slate-400 font-medium">Workflow</span>
           </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 py-4">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-200/50 text-slate-900" // Image shows Active as gray pill? or text-slate-900.
                // Actual Image 1 sidebar item "Pratiche" looks Gray/Silver bg (or just highlighted)
                // Image 3 Dashboard item is active, looks gray-ish.
                // Wait, Image 3 sidebar "Dashboard" is Gray bg (or white with shadow?).
                // Let's use a subtle gray for active.
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <item.icon size={20} strokeWidth={1.5} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
