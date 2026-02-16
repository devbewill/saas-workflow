import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Wallet, ArrowUpRight, ArrowDownLeft, History, FileText,
    Clock, CheckCircle2, ChevronRight, FileSignature, AlertCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

export default function WalletDashboardView({ balance, lastUpdate, invoices, transactions, roleLabel, walletStatus }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Wallet Main Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none shadow-xl shadow-blue-500/10 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 p-24 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

                    <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 font-medium mb-1">Saldo Disponibile</p>
                                <h2 className="text-4xl font-black tracking-tight">{formatCurrency(balance)}</h2>
                            </div>
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <Wallet size={24} className="text-white" />
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="border-white/30 text-blue-50 bg-white/10 hover:bg-white/20">
                                        {roleLabel}
                                    </Badge>
                                    <Badge variant="outline" className="border-white/30 text-blue-50 bg-white/10 hover:bg-white/20">
                                        {walletStatus === 'active' ? 'Attivo' : 'In attesa'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-blue-100/80 font-mono">
                                    Ultimo aggiornamento: {lastUpdate}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold border-0 shadow-lg shadow-black/10">
                                    <ArrowDownLeft size={16} className="mr-2" /> Ricarica Wallet
                                </Button>
                                <Button variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-bold backdrop-blur-sm">
                                    <ArrowUpRight size={16} className="mr-2" /> Trasferisci Fondi
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Card */}
                <Card className="border-none shadow-xl shadow-black/[0.02] flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-4">
                        <h3 className="font-bold text-slate-800 mb-2">Azioni Rapide</h3>

                        <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md transition-all group flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <History size={16} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Estratto Conto</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                        </button>

                        <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md transition-all group flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <AlertCircle size={16} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Segnala Problema</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                        </button>

                        <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md transition-all group flex items-center justify-between">
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
                                        inv.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        <FileText size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900">{inv.from || 'Fornitore'}</span>
                                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-slate-100 font-mono">FATTURA</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {inv.date}</span>
                                            <span className="font-mono">{inv.id}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-4 md:pt-0">
                                    <div className="text-right">
                                        <p className="text-lg font-black text-slate-900">{formatCurrency(inv.amount)}</p>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest",
                                            inv.status === 'pending' ? "text-amber-500" : "text-emerald-500"
                                        )}>
                                            {inv.status === 'pending' ? 'In attesa pagamento' : 'Saldata'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {inv.status === 'pending' ? (
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold px-4 rounded-lg shadow-lg shadow-primary/10">Accetta</Button>
                                        ) : (
                                            <Button variant="outline" size="sm" className="font-bold border-slate-200">Dettagli</Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {invoices.length === 0 && (
                        <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                            <p className="text-sm text-slate-400">Nessuna fattura presente per questo wallet.</p>
                        </div>
                    )}
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
                                        {tr.type === 'topup' ? '+' : '-'} {formatCurrency(tr.amount)}
                                    </span>
                                </div>
                            ))}
                            {transactions.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-xs text-slate-400">Nessuna operazione recente.</p>
                                </div>
                            )}
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
