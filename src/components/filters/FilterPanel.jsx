import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FilterPanel({ isOpen, onClose }) {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100"
          >
             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                   <h2 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                       <Filter size={20} className="text-violet-600" />
                       Filtri Avanzati
                   </h2>
                   <p className="text-sm text-slate-500">Affina la tua ricerca</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 text-slate-600">
                   <X size={20} />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6">

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Codice fiscale condominio</label>
                   <input type="text" placeholder="PRLSFN85C01G388H" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all" />
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Nome Amministratore</label>
                   <input type="text" placeholder="Mario Rossi" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all" />
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Pratica creata da</label>
                   <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all">
                      <option>Tutti</option>
                      <option>Broker</option>
                      <option>Admin</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">In carico a</label>
                   <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all">
                      <option>Tutti</option>
                      <option>Stefano Perelli</option>
                      <option>Mario Rossi</option>
                   </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Importo da</label>
                      <input type="text" placeholder="€" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Importo a</label>
                      <input type="text" placeholder="€" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all" />
                   </div>
                </div>

             </div>

             <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4">
                <button onClick={onClose} className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                    Deseleziona tutto
                </button>
                <button onClick={onClose} className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    Applica 3 Filtri
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
