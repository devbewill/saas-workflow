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
      <div className="p-8">
        <div className="flex items-center gap-3">
           <div className="grid grid-cols-2 gap-1 w-8">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-sm shadow-sm transition-transform hover:scale-110"></div>
              <div className="w-3.5 h-3.5 bg-amber-400 rounded-sm shadow-sm transition-transform hover:scale-110"></div>
              <div className="w-3.5 h-3.5 bg-blue-500 rounded-sm shadow-sm transition-transform hover:scale-110"></div>
              <div className="w-3.5 h-3.5 border border-slate-100 rounded-sm"></div>
           </div>
           <div className="flex flex-col leading-tight">
              <span className={cn("text-xl font-semibold tracking-tight", theme.text)}>HD</span>
              <span className={cn("text-[10px] font-medium uppercase tracking-[0.15em]", theme.textMuted)}>Vision 2026</span>
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
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all group",
                theme.radius,
                isActive
                  ? cn(
                      currentTheme === 'antigravity' ? 'bg-gradient-to-r from-indigo-50/80 to-indigo-100/30 text-indigo-700 border-l-[3px] border-indigo-500/80 shadow-[0_1px_2px_rgba(99,102,241,0.05)]' :
                      currentTheme === 'quantum' ? 'bg-white/10 text-white border border-white/10' :
                      'bg-slate-100 text-slate-900'
                    )
                  : cn("text-slate-500 hover:text-slate-700 hover:bg-slate-50/80 hover:pl-5", currentTheme === 'quantum' ? 'hover:bg-white/5 text-slate-500' : '')
              )}
            >
              <IconComponent size={18} className={cn("transition-transform group-hover:scale-110")} />
              <span className="tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
