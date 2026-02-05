```javascript
import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User, LogOut, Settings, RefreshCw } from 'lucide-react';
import { USER } from '@/data/mockData';
import { cn } from '@/lib/utils';

import { useWorkflow } from '@/context/WorkflowContext';

export function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userRole, theme, currentTheme } = useWorkflow();

  const toggleMenu = () => {
    console.log("Toggle menu clicked. Current state:", isUserMenuOpen);
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className={cn("fixed top-0 right-0 left-64 h-16 z-20 flex items-center justify-between px-6 transition-all duration-300", theme.topbar)}>
      {/* Left: Breadcrumbs / Page Title */}
      <div className="flex items-center gap-3">
         <span className="text-slate-400 font-medium text-sm">Portal</span>
         <span className="text-slate-300 text-sm">/</span>
         <span className={cn("text-sm font-semibold", theme.text)}>Dashboard</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
         <button className={cn("p-2 rounded-full transition-all relative", currentTheme === 'quantum' ? 'text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50')}>
            <Bell size={18} />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></div>
         </button>

         <div className={cn("w-px h-6 mx-2", currentTheme === 'quantum' ? 'bg-white/10' : 'bg-slate-200')}></div>

         {/* User Menu */}
         <div className="relative">
            <button
               type="button"
               onClick={toggleMenu}
               className={cn(
                 "flex items-center gap-3 rounded-full pl-1 pr-3 py-1 transition-all border border-transparent outline-none",
                 currentTheme === 'quantum' ? 'hover:bg-white/10' : 'hover:bg-slate-50 hover:border-slate-100',
                 "border-2 border-red-500" // DEBUG: Visual Confirmation
               )}
            >
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs shadow-sm", currentTheme === 'quantum' ? 'bg-violet-600 text-white' : 'bg-slate-900 text-white')}>
                  {USER.name.charAt(0)}
               </div>
               <div className="hidden md:block text-left">
                  <p className={cn("text-xs font-medium leading-none", theme.text)}>{USER.name}</p>
                  <p className={cn("text-[9px] leading-none mt-1 uppercase tracking-wider font-medium opacity-40", theme.text)}>{userRole}</p>
               </div>
               <ChevronDown size={12} className={theme.textMuted} />
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && (
               <>
                  <div
                     className="fixed inset-0 z-40"
                     onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div
                     className={cn("absolute right-0 top-full mt-2 w-64 shadow-xl p-2 z-50 origin-top-right transition-all border bg-white", theme.radius, "border-slate-100 dark:border-slate-800")}
                  >
                     <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-800 mb-1">
                        <p className={cn("text-sm font-semibold", "text-slate-900")}>{USER.name}</p>
                        <p className={cn("text-xs opacity-50", "text-slate-500")}>Connesso come {USER.email}</p>
                     </div>

                     <div className="space-y-1 py-1">
                        <button
                           onClick={() => alert("Funzionalità arrivo")}
                           className={cn("w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/5 rounded-md flex items-center gap-2 transition-colors", "text-slate-700")}
                        >
                           <RefreshCw size={14} className="opacity-70" /> Cambia Ruolo
                        </button>
                        <button
                           onClick={() => alert("Dati personali")}
                           className={cn("w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/5 rounded-md flex items-center gap-2 transition-colors", "text-slate-700")}
                        >
                           <User size={14} className="opacity-70" /> Dati Personali
                        </button>
                     </div>

                     <div className="h-px bg-slate-50 dark:bg-white/5 my-1"></div>

                     <button
                        onClick={() => alert("Logout")}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center gap-2 transition-colors"
                     >
                        <LogOut size={14} /> Esci
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
    </div>
  );
}
```
