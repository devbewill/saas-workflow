import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/paymentsMockData';
import {
    Wallet,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    HandCoins,
    ChevronDown,
    ReceiptText,
    UserCircle2,
    Building2,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function PaymentsView({ project: baseProject }) {
    // Sync with detailed payment data
    const paymentData = PAYMENT_PROJECTS.find(p => p.id === baseProject.id) || PAYMENT_PROJECTS[0];

    const getStatusBadge = (status) => {
        switch (status) {
            case WALLET_STATUS.ACTIVE:
                return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold">ATTIVO</Badge>;
            case WALLET_STATUS.PENDING:
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 text-[10px] font-bold">IN ATTESA</Badge>;
            case WALLET_STATUS.TO_ACTIVATE:
                return <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 text-[10px] font-bold">DA ATTIVARE</Badge>;
            default:
                return null;
        }
    };

    const calculateToPay = (roleIdentifier) => {
        return paymentData.invoiceDetails
            .filter(inv => inv.to === roleIdentifier && inv.status !== 'paid')
            .reduce((sum, inv) => sum + inv.amount, 0);
    };

    const getInvoicesForRole = (roleIdentifier) => {
        return paymentData.invoiceDetails.filter(inv => inv.to === roleIdentifier);
    };

    const roles = [
        { id: 'amministratore', label: 'Amministratore', icon: UserCircle2, sub: 'Gestore di condominio' },
        { id: 'impresa', label: 'Impresa', icon: Building2, sub: 'Esecutore lavori' },
        { id: 'professionista', label: 'Professionista', icon: Briefcase, sub: 'Progettista / Tecnico' }
    ];

    const condoWallets = Array.isArray(paymentData.wallets.condomino)
        ? paymentData.wallets.condomino
        : [paymentData.wallets.condomino];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Totale Fatturato</p>
                                <p className="text-xl font-black text-primary">
                                    {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(paymentData.totalInvoices)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                                <HandCoins size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pendenze Totali</p>
                                <p className="text-xl font-black text-amber-600">
                                    {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(
                                        paymentData.invoiceDetails.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-black/[0.03] bg-emerald-500 text-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Saldo Versato</p>
                                <p className="text-xl font-black">
                                    {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(
                                        paymentData.invoiceDetails.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Unified Accordion View */}
            <div className="space-y-8">
                {/* Parti Comuni */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Building2 size={16} className="text-primary" />
                        <h3 className="text-[11px] font-black tracking-[0.2em] text-primary/60 uppercase">Parti Comuni</h3>
                    </div>

                    <Accordion type="multiple" defaultValue={['amministratore']} className="space-y-3">
                        {roles.map((role) => (
                            <AccordionItem
                                key={role.id}
                                value={role.id}
                                className="border-none shadow-xl shadow-black/[0.02] bg-white rounded-2xl overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline px-6 py-4 transition-all group data-[state=open]:bg-slate-50/50">
                                    <div className="flex flex-1 items-center justify-between gap-4 text-left">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-slate-100 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <role.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-primary">{role.label}</p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{role.sub}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="hidden sm:block text-center">
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Stato Wallet</p>
                                                {getStatusBadge(paymentData.wallets[role.id])}
                                            </div>
                                            <div className="text-right min-w-[120px]">
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Da Pagare</p>
                                                <p className={cn(
                                                    "font-black text-sm",
                                                    calculateToPay(role.id) > 0 ? "text-amber-600" : "text-emerald-600"
                                                )}>
                                                    {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(calculateToPay(role.id))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-2">
                                    <div className="rounded-xl border border-border/40 overflow-hidden mt-4">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-slate-50/50">
                                                    <TableHead className="text-[10px] font-bold uppercase px-4 h-10">Fattura</TableHead>
                                                    <TableHead className="text-[10px] font-bold uppercase h-10">Mittente</TableHead>
                                                    <TableHead className="text-right text-[10px] font-bold uppercase h-10">Importo</TableHead>
                                                    <TableHead className="text-right pr-4 text-[10px] font-bold uppercase h-10">Stato</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {getInvoicesForRole(role.id).map(inv => (
                                                    <TableRow key={inv.id} className="h-12 border-b border-border/20 last:border-0">
                                                        <TableCell className="px-4 font-bold text-xs text-primary">{inv.id} <span className="font-medium text-slate-400 ml-1">({inv.date})</span></TableCell>
                                                        <TableCell className="text-xs font-semibold text-slate-600 capitalize">{inv.from.replace('_', ' ')}</TableCell>
                                                        <TableCell className="text-right font-bold text-xs text-primary">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(inv.amount)}</TableCell>
                                                        <TableCell className="text-right pr-4">
                                                            {inv.status === 'paid' ?
                                                                <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1"><CheckCircle2 size={10} /> PAGATA</span> :
                                                                <span className="text-[10px] font-bold text-amber-600 flex items-center justify-end gap-1"><Clock size={10} /> PENDENTE</span>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {getInvoicesForRole(role.id).length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="h-20 text-center text-xs text-slate-400 italic">Nessuna fattura emessa per questo ruolo.</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Parti Private */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <UserCircle2 size={16} className="text-primary" />
                        <h3 className="text-[11px] font-black tracking-[0.2em] text-primary/60 uppercase">Parti Private</h3>
                    </div>

                    <Accordion type="multiple" className="space-y-3">
                        {condoWallets.map((status, idx) => {
                            const condoId = `condomino_${idx}`;
                            return (
                                <AccordionItem
                                    key={condoId}
                                    value={condoId}
                                    className="border-none shadow-xl shadow-black/[0.02] bg-white rounded-2xl overflow-hidden border-l-4 border-l-blue-400"
                                >
                                    <AccordionTrigger className="hover:no-underline px-6 py-4 transition-all group data-[state=open]:bg-slate-50/50">
                                        <div className="flex flex-1 items-center justify-between gap-4 text-left">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[11px] font-black text-primary border border-blue-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    C{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-primary">Condomino {idx + 1}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Proprietario unità immobiliare</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-8">
                                                <div className="hidden sm:block text-center">
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Stato Wallet</p>
                                                    {getStatusBadge(status)}
                                                </div>
                                                <div className="text-right min-w-[120px]">
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Da Pagare</p>
                                                    <p className={cn(
                                                        "font-black text-sm",
                                                        calculateToPay(condoId) > 0 ? "text-amber-600" : "text-emerald-600"
                                                    )}>
                                                        {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(calculateToPay(condoId))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-2">
                                        <div className="rounded-xl border border-border/40 overflow-hidden mt-4">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-slate-50/50">
                                                        <TableHead className="text-[10px] font-bold uppercase px-4 h-10">Fattura</TableHead>
                                                        <TableHead className="text-[10px] font-bold uppercase h-10">Mittente</TableHead>
                                                        <TableHead className="text-right text-[10px] font-bold uppercase h-10">Importo</TableHead>
                                                        <TableHead className="text-right pr-4 text-[10px] font-bold uppercase h-10">Stato</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {getInvoicesForRole(condoId).map(inv => (
                                                        <TableRow key={inv.id} className="h-12 border-b border-border/20 last:border-0">
                                                            <TableCell className="px-4 font-bold text-xs text-primary">{inv.id} <span className="font-medium text-slate-400 ml-1">({inv.date})</span></TableCell>
                                                            <TableCell className="text-xs font-semibold text-slate-600 capitalize">{inv.from.replace('_', ' ')}</TableCell>
                                                            <TableCell className="text-right font-bold text-xs text-primary">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(inv.amount)}</TableCell>
                                                            <TableCell className="text-right pr-4">
                                                                {inv.status === 'paid' ?
                                                                    <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1"><CheckCircle2 size={10} /> PAGATA</span> :
                                                                    <span className="text-[10px] font-bold text-amber-600 flex items-center justify-end gap-1"><Clock size={10} /> PENDENTE</span>
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {getInvoicesForRole(condoId).length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} className="h-20 text-center text-xs text-slate-400 italic">Nessuna fattura emessa per questo condomino.</TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
