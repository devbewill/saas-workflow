import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { USER } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { useWorkflow } from '@/context/WorkflowContext';

export function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userRole, theme, currentTheme } = useWorkflow();

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
               onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
               className={cn("flex items-center gap-3 rounded-full pl-1 pr-3 py-1 transition-all border border-transparent", currentTheme === 'quantum' ? 'hover:bg-white/10' : 'hover:bg-slate-50 hover:border-slate-100')}
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
            <AnimatePresence>
               {isUserMenuOpen && (
                  <>
                     <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                     />
                     <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn("absolute right-0 top-full mt-2 w-56 shadow-xl p-2 z-50 origin-top-right transition-all", theme.card, theme.radius)}
                     >
                        <div className="px-3 py-2 border-b border-slate-50 mb-1">
                           <p className={cn("text-sm font-semibold", theme.text)}>{USER.name}</p>
                           <p className={cn("text-xs opacity-50", theme.text)}>{userRole}</p>
                        </div>
                        <button className={cn("w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 rounded-lg flex items-center gap-2", theme.text)}>
                           <User size={14} /> Profilo
                        </button>
                        <button className={cn("w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 rounded-lg flex items-center gap-2", theme.text)}>
                           <Settings size={14} /> Impostazioni
                        </button>
                        <div className="h-px bg-slate-50 my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                           <LogOut size={14} /> Esci
                        </button>
                     </motion.div>
                  </>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
