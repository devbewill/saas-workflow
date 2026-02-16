import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Wallet,
    FileSignature,
    Plus,
    History,
    ShieldAlert,
    FileText,
    ChevronRight,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPaymentsView({ projects }) {
    // For this mock, we'll focus on the first project as the owner's primary project
    const mainProject = projects[0] || {};

    // Mock invoices addebitate dall'impresa
    const invoices = [
        { id: 'FT-102', from: 'EdilModern s.r.l.', amount: 12500, date: '14 Feb 2026', status: 'da_pagare', type: 'SAL 1' },
        { id: 'FT-089', from: 'EdilModern s.r.l.', amount: 8400, date: '02 Feb 2026', status: 'pagata', type: 'Anticipo' },
    ];

    const transactions = [
        { id: 'TR-001', type: 'topup', amount: 15000, date: '01 Feb 2026', status: 'completata' },
        { id: 'TR-002', type: 'payment', amount: 8400, date: '05 Feb 2026', status: 'completata' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Row: Wallet Balance & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                        <Wallet size={120} />
                    </div>
                    <CardContent className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-primary-foreground/60 text-xs font-bold uppercase tracking-[0.2em] mb-1">Saldo Disponibile</p>
                                <h2 className="text-4xl font-black tracking-tight">€ 14.250,00</h2>
                            </div>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none py-1.5 px-3 backdrop-blur-md">
                                <CheckCircle2 size={12} className="mr-1.5" />
                                Wallet Attivo
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-white text-primary hover:bg-slate-50 font-bold px-6 shadow-xl shadow-black/10">
                                <Plus size={16} className="mr-2" />
                                Ricarica Fondi
                            </Button>
                            <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                                <ShieldAlert size={16} className="mr-2" />
                                Sospensione Wallet
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-black/[0.03] bg-white flex flex-col">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Documenti Wallet</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <FileText size={16} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Contratto Servizi</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <FileSignature size={16} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Delega Operativa</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                        </button>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content: Invoices & History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoices List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <FileDescription className="text-primary" size={18} />
                            <h3 className="font-bold text-slate-800">Fatture Addebitate</h3>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">Vedi Tutte</Button>
                    </div>

                    {invoices.map((inv) => (
                        <Card key={inv.id} className="border-none shadow-md shadow-black/[0.02] hover:shadow-xl hover:shadow-black/[0.04] transition-all group overflow-hidden">
                            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "p-3 rounded-2xl flex items-center justify-center shrink-0",
                                        inv.status === 'da_pagare' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        <FileText size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900">{inv.from}</span>
                                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-slate-100 font-mono">{inv.type}</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {inv.date}</span>
                                            <span className="font-mono">{inv.id}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-4 md:pt-0">
                                    <div className="text-right">
                                        <p className="text-lg font-black text-slate-900">€ {inv.amount.toLocaleString('it-IT')},00</p>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest",
                                            inv.status === 'da_pagare' ? "text-amber-500" : "text-emerald-500"
                                        )}>
                                            {inv.status === 'da_pagare' ? 'In attesa pagamento' : 'Saldata'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {inv.status === 'da_pagare' ? (
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold px-4 rounded-lg shadow-lg shadow-primary/10">Accetta</Button>
                                        ) : (
                                            <Button variant="outline" size="sm" className="font-bold border-slate-200">Dettagli</Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Right Column: Transactions History */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <History className="text-slate-400" size={18} />
                        <h3 className="font-bold text-slate-800">Ultime Operazioni</h3>
                    </div>

                    <Card className="border-none shadow-xl shadow-black/[0.03] overflow-hidden">
                        <CardContent className="p-0">
                            {transactions.map((tr, idx) => (
                                <div
                                    key={tr.id}
                                    className={cn(
                                        "p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50",
                                        idx === transactions.length - 1 && "border-0"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "p-2 rounded-full",
                                            tr.type === 'topup' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                                        )}>
                                            {tr.type === 'topup' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">{tr.type === 'topup' ? 'Ricarica Wallet' : 'Pagamento Fattura'}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{tr.date}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-sm font-bold",
                                        tr.type === 'topup' ? "text-emerald-600" : "text-slate-900"
                                    )}>
                                        {tr.type === 'topup' ? '+' : '-'} {tr.amount.toLocaleString('it-IT')},00 €
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function FileDescription({ className, size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}

