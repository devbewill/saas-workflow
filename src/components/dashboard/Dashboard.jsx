import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRACTICES, STATS, USER, RECENT_ACTIONS } from '@/data/mockData';
import { Search, Filter, Calendar as CalendarIcon, Edit, Clock, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { FilterPanel } from '../filters/FilterPanel';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/Table';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}


      {/* Top Section: Notifications & Actions */}
      <div className="pb-10">
        <h1 className="text-3xl font-bold text-slate-900">Ciao {USER.name}</h1>
        <p className="text-slate-500">Benvenuta nella tua dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Notifications */}
        <div className="lg:col-span-2">
          <section className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bell size={16} className="text-red-500" /> Ultime Notifiche
              </h3>
              <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">3 NUOVE</span>
            </div>
            <div className="divide-y divide-slate-100 flex-1">
               {/* Fixed Mock Notifications matching image style */}
               <div className="py-4 first:pt-0">
                  <p className="text-sm font-bold text-slate-900">Verifica la pratica Condominio - Giambellino 12</p>
                  <p className="text-sm text-slate-500 mt-1 leading-tight">La pratica è in attesa dei dati necessari per procedere.</p>
               </div>
               <div className="py-4">
                  <p className="text-sm font-bold text-slate-900">Aggiornamento Statuts - Piazza Napoli 2</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                    Passata da <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">Bozza</span> a <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-bold">Verifica preliminare</span>
                  </div>
               </div>
               <div className="py-4 last:pb-0">
                  <p className="text-sm font-bold text-slate-900">Esito Negativo - Roma 123</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                    Cambio stato: <span className="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">AML</span> → <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Ko tecnico</span>
                  </div>
               </div>
            </div>
            <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Segna tutte come lette
            </button>
          </section>
        </div>

        {/* Right Column: Recent Actions */}
        <div className="lg:col-span-1">
          <section className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm h-full">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock size={16} className="text-violet-500" /> Attività Recenti
            </h3>
            <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
              {RECENT_ACTIONS.map(action => (
                <div key={action.id} className="relative">
                  <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-violet-100 border-2 border-white ring-1 ring-violet-500"></div>
                  <p className="text-sm font-bold text-slate-800">{action.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-violet-600 font-medium px-1.5 py-0.5 bg-violet-50 rounded">{action.target}</span>
                    <span className="text-[11px] text-slate-400">• {action.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Visualizza tutto lo storico
            </button>
          </section>
        </div>
      </div>

      {/* Bottom Section: Full Width Table */}
      <section>
         <h3 className="font-bold text-slate-900 mb-2">Pratiche in carico</h3>
         <p className="text-slate-500 text-sm mb-6">Seleziona o cerca pratiche</p>

         {/* Filters Row */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={16} />
                   <input
                      type="text"
                      placeholder="Cerca per id pratica, nome o stato..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all"
                   />
                </div>
                <button
                   onClick={() => setIsFilterOpen(!isFilterOpen)}
                   className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                   <Filter size={16} />
                   <span>Filtri</span>
                </button>
             </div>

             {/* Filter Panel attached to the button logically (visually absolute) */}
             <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

         {/* Table */}
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Pratica</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Aggiornata il</TableHead>
                  <TableHead>Creata il</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {PRACTICES.map((p) => (
                  <TableRow
                    key={p.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/pratiche/${p.id}`)}
                  >
                     <TableCell className="text-slate-500">{p.displayId}</TableCell>
                     <TableCell className="font-medium text-slate-900">{p.name}</TableCell>
                     <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          p.status.includes("Aperta") ? "bg-violet-500 text-white" : "",
                          p.status.includes("AML") ? "bg-cyan-400 text-white" : ""
                        )}>
                          {p.status}
                        </span>
                     </TableCell>
                     <TableCell className="text-slate-500">{p.updated}</TableCell>
                     <TableCell className="text-slate-500">{p.created}</TableCell>
                     <TableCell className="text-slate-500">{p.owner}</TableCell>
                     <TableCell className="text-right">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                           <Edit size={14} />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </section>

    </div>
  );
}
