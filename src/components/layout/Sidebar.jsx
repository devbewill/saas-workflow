import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MENU_ITEMS } from '@/data/mockData';
import { useWorkflow } from '@/context/WorkflowContext';

export function Sidebar() {
  const { theme, currentTheme } = useWorkflow();

  return (
    <div className={cn("w-64 h-screen flex flex-col fixed left-0 top-0 z-20 transition-all duration-300", theme.sidebar)}>
      {/* Logo Area */}
      <div className="px-6 py-6 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-3">
           <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm">
             <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
           </div>
           <div className="flex flex-col leading-none">
              <span className={cn("text-lg font-bold tracking-tight text-slate-900")}>WHITELBL</span>
              <span className={cn("text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5")}>Platform</span>
           </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1.5 py-6">
        {MENU_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all group rounded-md mx-2",
                isActive
                  ? cn(
                      currentTheme === 'antigravity' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200' :
                      currentTheme === 'quantum' ? 'bg-white/10 text-white border border-white/10' :
                      'bg-slate-100 text-slate-900'
                    )
                  : cn("text-slate-600 hover:text-slate-900 hover:bg-slate-100", currentTheme === 'quantum' ? 'hover:bg-white/5 text-slate-500' : '')
              )}
            >
              <IconComponent size={16} className={cn("transition-transform group-hover:scale-105 opacity-80 group-hover:opacity-100")} />
              <span className="tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
