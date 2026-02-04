import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { USER } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { useWorkflow } from '@/context/WorkflowContext';

export function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userRole } = useWorkflow();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md">
         <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={18} />
            <input
               type="text"
               placeholder="Cerca pratica..."
               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-full text-sm focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-50/50 outline-none transition-all placeholder:text-slate-400"
            />
         </div>
      </div>

      <div className="flex items-center gap-4">
         <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></div>
         </button>

         <div className="w-px h-8 bg-slate-100 mx-2"></div>

         {/* User Menu */}
         <div className="relative">
            <button
               onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
               className="flex items-center gap-3 hover:bg-slate-50 rounded-full pl-1 pr-3 py-1 transition-colors border border-transparent hover:border-slate-100"
            >
               <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
                  {USER.name.charAt(0)}
               </div>
               <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-700 leading-none">{USER.name}</p>
                  <p className="text-[10px] text-slate-400 leading-none mt-1 uppercase tracking-tight font-bold">{userRole}</p>
               </div>
               <ChevronDown size={14} className="text-slate-400" />
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
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 origin-top-right"
                     >
                        <div className="px-3 py-2 border-b border-slate-50 mb-1">
                           <p className="text-sm font-medium text-slate-900">{USER.name}</p>
                           <p className="text-xs text-slate-500">{userRole}</p>
                        </div>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2">
                           <User size={16} /> Profilo
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2">
                           <Settings size={16} /> Impostazioni
                        </button>
                        <div className="h-px bg-slate-50 my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                           <LogOut size={16} /> Esci
                        </button>
                     </motion.div>
                  </>
               )}
            </AnimatePresence>
         </div>
      </div>
    </header>
  );
}
