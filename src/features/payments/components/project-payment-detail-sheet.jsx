import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building2, UserCircle2, Wallet, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function ProjectPaymentDetailSheet({ project, open, onOpenChange }) {
    const navigate = useNavigate();

    if (!project) return null;

    // --- Data Calculation Logic ---
    const publicRoles = ['amministratore', 'impresa', 'professionista'];

    // Calculate Public Stats
    const publicInvoices = project.invoiceDetails.filter(inv => publicRoles.includes(inv.to));
    const publicTotal = publicInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const publicPending = publicInvoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    const publicPaid = publicTotal - publicPending;

    // Calculate Private Stats (Condominos)
    const privateInvoices = project.invoiceDetails.filter(inv => inv.to.startsWith('condomino'));
    const privateTotal = privateInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const privatePending = privateInvoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    const privatePaid = privateTotal - privatePending;

    const totalInvoiced = publicTotal + privateTotal;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
                <SheetHeader className="mb-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <SheetTitle className="text-2xl font-bold text-slate-900">{project.name}</SheetTitle>
                            <SheetDescription className="text-slate-500 font-mono mt-1">
                                ID: {project.id} • Amministratore: {project.owner}
                            </SheetDescription>
                        </div>
                        <Badge variant="outline" className="text-xs font-mono uppercase tracking-widest px-3 py-1">
                            {project.updated}
                        </Badge>
                    </div>

                    {/* Summary Total */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Totale Generale</p>
                                <p className="text-xl font-black text-slate-900">{formatCurrency(totalInvoiced)}</p>
                            </div>
                        </div>
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
                            onClick={() => navigate(`/projects/${project.id}?tab=pagamenti`)}
                        >
                            Vedi Dettaglio Completo <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </SheetHeader>

                <div className="space-y-8">
                    {/* SECTION: PARTI PUBBLICHE (COMMON) */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <Building2 size={18} className="text-emerald-600" />
                            <h3 className="text-sm font-black tracking-[0.2em] text-slate-900 uppercase">Parti Comuni (Pubbliche)</h3>
                        </div>

                        <Card className="border-none shadow-lg shadow-emerald-900/[0.05] bg-gradient-to-br from-emerald-50 to-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-16 bg-emerald-100/30 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
                            <CardContent className="p-6 relative z-10">
                                <div className="grid grid-cols-2 gap-8 mb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-widest mb-1">Totale</p>
                                        <p className="text-2xl font-black text-emerald-700">{formatCurrency(publicTotal)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Da Saldare</p>
                                        <p className={cn("text-xl font-black", publicPending > 0 ? "text-amber-600" : "text-emerald-600")}>
                                            {formatCurrency(publicPending)}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(publicPaid / publicTotal) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-medium text-emerald-700/60">
                                    <span>Pagato: {Math.round((publicPaid / publicTotal) * 100)}%</span>
                                    <span>{formatCurrency(publicPaid)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* SECTION: PARTI PRIVATE (CONDOMINOS) */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <UserCircle2 size={18} className="text-blue-600" />
                            <h3 className="text-sm font-black tracking-[0.2em] text-slate-900 uppercase">Parti Private (Condomini)</h3>
                        </div>

                        <Card className="border-none shadow-lg shadow-blue-900/[0.05] bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-16 bg-blue-100/30 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
                            <CardContent className="p-6 relative z-10">
                                <div className="grid grid-cols-2 gap-8 mb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-blue-700/60 uppercase tracking-widest mb-1">Totale</p>
                                        <p className="text-2xl font-black text-blue-700">{formatCurrency(privateTotal)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Da Saldare</p>
                                        <p className={cn("text-xl font-black", privatePending > 0 ? "text-amber-600" : "text-emerald-600")}>
                                            {formatCurrency(privatePending)}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(privatePaid / privateTotal) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-medium text-blue-700/60">
                                    <span>Pagato: {Math.round((privatePaid / privateTotal) * 100)}%</span>
                                    <span>{formatCurrency(privatePaid)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {/* Breakdown of Private Wallets Status */}
                            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 size={14} className="text-emerald-500" />
                                    <span className="text-xs font-bold text-slate-700">In Regola</span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    {Array.isArray(project.wallets.condomino) ? project.wallets.condomino.filter(s => s === 'active').length : 0}
                                    <span className="text-xs font-medium text-slate-400 ml-1">/ {Array.isArray(project.wallets.condomino) ? project.wallets.condomino.length : 0}</span>
                                </p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle size={14} className="text-amber-500" />
                                    <span className="text-xs font-bold text-slate-700">Da Attivare/Sollecitare</span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    {Array.isArray(project.wallets.condomino) ? project.wallets.condomino.filter(s => s !== 'active').length : 0}
                                    <span className="text-xs font-medium text-slate-400 ml-1">unit</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </SheetContent>
        </Sheet>
    );
}
