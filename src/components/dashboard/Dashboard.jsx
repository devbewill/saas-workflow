import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRACTICES, STATS, USER, RECENT_ACTIONS } from '@/data/mockData';
import { Search, Filter, Calendar as CalendarIcon, Edit, Clock, Bell, Zap, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterPanel } from '../filters/FilterPanel';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/Table';
import { useWorkflow, THEMES, FONTS } from '@/context/WorkflowContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const { currentTheme, theme, setTheme, currentFont, setFont } = useWorkflow();

  return (
    <div className={cn("transition-all duration-700", theme.font)}>

      {/* Theme Switcher Floating Bar - HIDDEN */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center gap-1" style={{ display: 'none' }}>
        <div className="px-3 border-r border-white/10 mr-1 flex items-center gap-2">
           <Zap size={14} className="text-yellow-400" />
           <span className="text-[10px] text-white font-semibold uppercase tracking-widest">Vision 2026</span>
        </div>
        {Object.entries(THEMES).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-semibold transition-all flex items-center gap-2 uppercase tracking-tight",
              currentTheme === key
                ? "bg-white text-slate-900 shadow-lg scale-105"
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <t.icon size={12} />
            {t.name}
          </button>
        ))}

        {/* Font Selector */}
        <div className="relative group ml-1 pl-3 border-l border-white/10">
          <button className="px-4 py-2 rounded-full text-[10px] font-semibold transition-all flex items-center gap-2 uppercase tracking-tight text-white/60 hover:text-white hover:bg-white/5">
            <Type size={12} />
            {FONTS[currentFont].name}
          </button>

          {/* Dropdown */}
          <div className="absolute bottom-full left-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 p-2 min-w-[200px] backdrop-blur-xl">
              {Object.entries(FONTS).map(([key, font]) => (
                <button
                  key={key}
                  onClick={() => setFont(key)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-xl transition-all text-sm group/item",
                    currentFont === key
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                  style={{ fontFamily: font.name }}
                >
                  <div className="font-medium">{font.name}</div>
                  <div className="text-[10px] opacity-50 mt-0.5">{font.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-1.5 mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Bentornato, {USER.name}. Hai 3 notifiche da gestire.</p>
      </div>

        {/* Stats Grid - Nexus Enterprise Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-blue-300 hover:shadow-md transition-all">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</span>
               </div>
               <div className="flex items-end gap-2">
                 <h3 className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</h3>
               </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Notifications */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Bell size={14} className="text-blue-600" /> Ultime Notifiche
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-100">3 NUOVE</span>
              </div>
              <div className="divide-y divide-slate-100 flex-1">
                 <div className="p-5 hover:bg-slate-50/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-slate-900">Verifica la pratica Condominio - Giambellino 12</p>
                      <span className="text-[10px] text-slate-400">10:30</span>
                    </div>
                    <p className="text-sm mt-1 text-slate-500 leading-relaxed">La pratica è in attesa dei dati necessari per procedere.</p>
                 </div>
                 <div className="p-5 hover:bg-slate-50/50 transition-colors">
                    <p className={cn("text-base font-semibold", theme.text)}>Aggiornamento Status - Piazza Napoli 2</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-semibold bg-slate-100 text-slate-500")}>Bozza</span>
                      <Zap size={10} className="opacity-20" />
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-semibold", theme.badge)}>Verifica preliminare</span>
                    </div>
                 </div>
                 <div className="p-5 last:pb-0 hover:bg-slate-50/50 transition-colors">
                    <p className={cn("text-base font-semibold", theme.text)}>Esito Negativo - Roma 123</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-black uppercase", theme.badge)}>AML</span>
                      <Zap size={10} className="opacity-20" />
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-black bg-red-50 text-red-500 uppercase tracking-wider")}>Ko tecnico</span>
                    </div>
                 </div>
              </div>
              <button className={cn("w-full mt-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] border transition-all",
                currentTheme === 'quantum' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900',
                theme.radius)}>
                Segna tutte come lette
              </button>
            </section>
          </div>

          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" /> Attività Recenti
                </h3>
              </div>
              <div className={cn("relative pl-6 border-l space-y-8 flex-1 ml-6 my-6 border-slate-200/20")}>
                {RECENT_ACTIONS.map(action => (
                     <div key={action.id} className="p-4 border border-slate-100 rounded-lg hover:border-blue-100 hover:bg-slate-50 transition-all">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{action.time}</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-semibold">{action.target}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 leading-snug">{action.text}</p>
                     </div>
                ))}
              </div>
              <button className="w-full mt-6 mx-6 mb-6 py-2.5 text-xs font-semibold bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm max-w-[calc(100%-48px)]">
                Vedi Storico Completo
              </button>
            </section>
          </div>
        </div>

        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <FileText size={14} className="text-blue-600" />
                 <h3 className="text-sm font-semibold text-slate-800">Pratiche in carico</h3>
              </div>

              <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Filtra..." className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-64 bg-white" />
                  </div>
                   <button
                     onClick={() => setIsFilterOpen(true)}
                     className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                   >
                      <Filter size={14} /> Filtri
                   </button>
              </div>
            </div>

           <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

           <div className="p-0">
             <Table>
               <TableHeader>
                 <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200">
                   <TableHead className="w-[100px] font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">ID</TableHead>
                   <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Pratica</TableHead>
                   <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Stato</TableHead>
                   <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Data</TableHead>
                   <TableHead className="text-right font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Azioni</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {PRACTICES.map((practice) => (
                   <TableRow key={practice.id} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-0 group cursor-pointer" onClick={() => navigate('/pratiche/' + practice.id)}>
                     <TableCell className="font-mono text-xs text-slate-500">{practice.displayId}</TableCell>
                     <TableCell>
                       <div className="font-medium text-sm text-slate-900 group-hover:text-blue-700 transition-colors">{practice.name}</div>
                     </TableCell>
                     <TableCell>
                       <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                         practice.statusCategory === 'Aperta' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-600 border-slate-200')}>
                         {practice.status}
                       </span>
                     </TableCell>
                     <TableCell className="text-sm text-slate-500">{practice.updated}</TableCell>
                     <TableCell className="text-right">
                       <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                         <Edit size={14} />
                       </button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </div>
        </section>
      </div>
    </div>
  );
}
