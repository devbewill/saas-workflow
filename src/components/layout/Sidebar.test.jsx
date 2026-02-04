import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { Home, Share2, FileText, Calendar, Globe } from 'lucide-react';

// Hardcoded menu items to test
const TEST_MENU_ITEMS = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Share2, label: "Reti", path: "/reti" },
  { icon: FileText, label: "Pratiche", path: "/pratiche" },
  { icon: Calendar, label: "Appuntamenti", path: "/appuntamenti" },
  { icon: Globe, label: "Traduzioni", path: "/traduzioni" },
];

export function SidebarTest() {
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
              <span className={cn("text-xl font-black tracking-tighter", theme.text)}>HD</span>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", theme.textMuted)}>Vision 2026</span>
           </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1.5 py-6">
        {TEST_MENU_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all group",
                theme.radius,
                isActive
                  ? cn(
                      currentTheme === 'antigravity' ? 'bg-slate-900 text-white shadow-xl' :
                      currentTheme === 'quantum' ? 'bg-white/10 text-white border border-white/10' :
                      'bg-slate-100 text-slate-900'
                    )
                  : cn("text-slate-400 hover:text-slate-900", currentTheme === 'quantum' ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-50')
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
