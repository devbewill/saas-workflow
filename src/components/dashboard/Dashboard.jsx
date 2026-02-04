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

      <div className="space-y-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className={cn("text-4xl font-semibold tracking-tight", theme.text)}>Dashboard</h1>
          <p className={cn("text-sm font-normal opacity-60", theme.text)}>Bentornato, {USER.name}. Hai 3 notifiche da gestire.</p>
        </div>

        {/* Top Section: Notifications & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Notifications */}
          <div className="lg:col-span-2">
            <section className={cn("p-8 h-full flex flex-col transition-all duration-500", theme.card, theme.radius, theme.cardHover)}>
              <div className="flex items-center justify-between mb-8">
                <h3 className={cn("text-[11px] font-medium uppercase tracking-wide", currentTheme === 'antigravity' ? 'text-slate-400' : theme.text)}>
                  <span className="flex items-center gap-2">
                    <Bell size={14} className={theme.accentColor === 'indigo' ? 'text-indigo-600' : 'text-violet-500'} /> Ultime Notifiche
                  </span>
                </h3>
                <span className={cn("px-2.5 py-1 text-[10px] font-medium transition-all", theme.badge)}>3 NUOVE</span>
              </div>
              <div className={cn("divide-y flex-1", currentTheme === 'antigravity' ? 'divide-slate-100' : 'divide-slate-100/10')}>
                 <div className="py-6 first:pt-0">
                    <p className={cn("text-base font-semibold", theme.text)}>Verifica la pratica Condominio - Giambellino 12</p>
                    <p className={cn("text-sm mt-1 font-normal opacity-50 leading-relaxed", theme.text)}>La pratica è in attesa dei dati necessari per procedere.</p>
                 </div>
                 <div className="py-6">
                    <p className={cn("text-base font-semibold", theme.text)}>Aggiornamento Status - Piazza Napoli 2</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-semibold bg-slate-100 text-slate-500")}>Bozza</span>
                      <Zap size={10} className="opacity-20" />
                      <span className={cn("px-2.5 py-1 rounded text-[10px] font-semibold", theme.badge)}>Verifica preliminare</span>
                    </div>
                 </div>
                 <div className="py-6 last:pb-0">
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

          {/* Right Column: Recent Actions */}
          <div className="lg:col-span-1">
            <section className={cn("p-8 h-full transition-all duration-500 flex flex-col", theme.card, theme.radius, theme.cardHover)}>
              <h3 className={cn("text-[10px] font-semibold uppercase tracking-[0.2em] mb-10 flex items-center gap-2", currentTheme === 'antigravity' ? 'text-slate-400' : theme.text)}>
                <Clock size={16} className={theme.accentColor === 'indigo' ? 'text-indigo-600' : 'text-violet-500'} /> Attività Recenti
              </h3>
              <div className={cn("relative pl-6 border-l space-y-12 flex-1", currentTheme === 'antigravity' ? 'border-slate-100' : 'border-slate-200/20')}>
                {RECENT_ACTIONS.map(action => (
                  <div key={action.id} className="relative">
                    <div className={cn("absolute -left-[29px] top-1 w-1.5 h-1.5 rounded-full ring-4 transition-all shadow-sm",
                      currentTheme === 'quantum' ? 'bg-violet-500 ring-[#050510]' : 'bg-white ring-white shadow-slate-200',
                      currentTheme === 'antigravity' ? 'bg-slate-900 ring-white' : 'bg-slate-900 ring-slate-100')}></div>
                    <p className={cn("text-base font-semibold", theme.text)}>{action.text}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={cn("text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest", theme.badge)}>{action.target}</span>
                      <span className={cn("text-[9px] font-semibold opacity-30 uppercase tracking-[0.2em]", theme.text)}>{action.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={cn("w-full mt-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                theme.primary, "text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95",
                theme.radius)}>
                Vedi Storico
              </button>
            </section>
          </div>
        </div>

        {/* Bottom Section: Full Width Table */}
        <section className={cn("p-10 transition-all duration-500", theme.card, theme.radius, theme.cardHover)}>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-1">
                <h3 className={cn("text-2xl font-semibold tracking-tight", theme.text)}>Pratiche in carico</h3>
                <p className={cn("text-sm font-normal opacity-50", theme.text)}>Gestisci e monitora le tue attività correnti</p>
              </div>

              <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                        type="text"
                        placeholder="Cerca pratica..."
                        className={cn("pl-12 pr-6 py-3.5 border text-sm font-medium focus:outline-none transition-all w-[340px]",
                          currentTheme === 'quantum' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-slate-50/50 border-slate-100 placeholder:text-slate-400 focus:bg-white focus:border-slate-200',
                          theme.radius)}
                    />
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={cn("flex items-center gap-3 px-8 py-3.5 border text-xs font-black uppercase tracking-widest transition-all",
                      currentTheme === 'quantum' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 font-semibold' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                      theme.radius)}
                  >
                    <Filter size={16} />
                    <span>Filtri</span>
                  </button>
              </div>
           </div>

           <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

           <div className="overflow-hidden">
             <Table>
                <TableHeader>
                   <TableRow className="border-none hover:bg-transparent">
                      <TableHead className={cn("font-black uppercase tracking-[0.2em] text-[10px] opacity-30", theme.text)}>Id</TableHead>
                      <TableHead className={cn("font-black uppercase tracking-[0.2em] text-[10px] opacity-30", theme.text)}>Nome Pratica</TableHead>
                      <TableHead className={cn("font-black uppercase tracking-[0.2em] text-[10px] opacity-30", theme.text)}>Stato Corrente</TableHead>
                      <TableHead className={cn("font-black uppercase tracking-[0.2em] text-[10px] opacity-30", theme.text)}>Ultimo Aggiornamento</TableHead>
                      <TableHead className={cn("font-black uppercase tracking-[0.2em] text-[10px] opacity-30", theme.text)}>Owner</TableHead>
                      <TableHead></TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {PRACTICES.map((p) => (
                      <TableRow
                        key={p.id}
                        className={cn("cursor-pointer border-slate-100/5 transition-all group", currentTheme === 'quantum' ? 'hover:bg-white/5 border-white/5' : 'hover:bg-slate-50/50')}
                        onClick={() => navigate(`/pratiche/${p.id}`)}
                      >
                         <TableCell className={cn("font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity", theme.text)}>{p.displayId}</TableCell>
                         <TableCell className={cn("font-semibold text-base tracking-tight", theme.text)}>{p.name}</TableCell>
                         <TableCell>
                            <span className={cn("px-4 py-1.5 text-[9px] font-black tracking-[0.1em] uppercase shadow-sm", theme.badge)}>
                              {p.status}
                            </span>
                         </TableCell>
                         <TableCell className={cn("text-xs font-semibold opacity-40 group-hover:opacity-100 transition-opacity", theme.text)}>{p.updated}</TableCell>
                         <TableCell className={cn("text-xs font-semibold opacity-40 group-hover:opacity-100 transition-opacity", theme.text)}>{p.owner}</TableCell>
                         <TableCell className="text-right">
                            <button className={cn("p-2.5 rounded-xl transition-all", currentTheme === 'quantum' ? 'text-white/20 hover:text-white hover:bg-white/10' : 'text-slate-300 hover:text-slate-900 hover:bg-white hover:shadow-sm')}>
                               <Edit size={16} />
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
