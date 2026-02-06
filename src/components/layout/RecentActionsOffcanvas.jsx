import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { PRACTICES } from '@/data/mockData';

export function RecentActionsOffcanvas({ isOpen, onClose }) {

   // Mock Recent Actions
   const recentActions = [
      { id: 1, type: 'status_change', text: 'Stato aggiornato a "Verifica Preliminare"', target: 'Pratica 99', time: '10 min fa' },
      { id: 2, type: 'upload', text: 'Caricato documento "Privacy Policy"', target: 'Condominio Roma', time: '2 ore fa' },
      { id: 3, type: 'note', text: 'Aggiunta nota su anagrafica', target: 'Mario Rossi', time: '4 ore fa' },
   ];

   // Last worked practices (subset of PRACTICES)
   const lastWorked = PRACTICES.slice(0, 3);

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
                        <h2 className="font-semibold text-xl text-slate-900">Attività Recenti</h2>
                        <p className="text-sm text-slate-500">Ultime operazioni eseguite</p>
                     </div>
                     <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 text-slate-600">
                        <X size={20} />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-8">

                     {/* Timeline Actions */}
                     <section>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                           <Clock size={14} /> Ultime Azioni
                        </h3>
                        <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                           {recentActions.map(action => (
                              <div key={action.id} className="relative">
                                 <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-violet-200 border-2 border-white ring-1 ring-violet-500"></div>
                                 <p className="text-sm font-medium text-slate-800">{action.text}</p>
                                 <p className="text-xs text-violet-600 mt-0.5">{action.target}</p>
                                 <p className="text-xs text-slate-400 mt-1">{action.time}</p>
                              </div>
                           ))}
                        </div>
                     </section>

                     {/* Worked Practices */}
                     <section>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                           <FileText size={14} /> Pratiche Lavorate
                        </h3>
                        <div className="space-y-3">
                           {lastWorked.map(p => (
                              <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-violet-200 hover:shadow-sm transition-all cursor-pointer group">
                                 <div className="flex justify-between items-start mb-1">
                                    <span className="font-semibold text-slate-900 text-sm group-hover:text-violet-700">{p.displayId}</span>
                                    <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                                       {p.statusCategory}
                                    </span>
                                 </div>
                                 <p className="text-xs text-slate-600 truncate">{p.name}</p>
                              </div>
                           ))}
                        </div>
                     </section>

                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50">
                     <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Visualizza tutto lo storico
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}
