import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wallet, TrendingUp, HandCoins, UserCircle2, Building2, Briefcase, CheckCircle2, Clock, AlertCircle, Lock, FileSignature } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';
import { ROLES } from '@/config/roles';
import WalletDashboardView from '../../payments/views/wallet-dashboard-view'; // Updated import path

const COMMON_ROLES = [
    {
        id: 'amministratore',
        label: 'Amministrazione',
        sub: 'Gestione e Coordinamento',
        icon: Building2,
        color: 'bg-indigo-50 text-indigo-600'
    },
    {
        id: 'impresa',
        label: 'Impresa',
        sub: 'Esecuzione Lavori',
        icon: Briefcase,
        color: 'bg-amber-50 text-amber-600'
    },
    {
        id: 'professionista',
        label: 'Professionista',
        sub: 'Direzione Lavori',
        icon: FileSignature,
        color: 'bg-violet-50 text-violet-600'
    }
];

export default function PaymentsView() {
    const { id } = useParams();
    const { user } = useAppContext();

    const paymentData = useMemo(() =>
        PAYMENT_PROJECTS.find(p => p.id === id) || PAYMENT_PROJECTS[0],
        [id]);

    // Role-based filtering logic
    const { visibleCommonRoles, showPrivateParties, visibleCondoIndex } = useMemo(() => {
        switch (user?.role) { // Added optional chaining for user
            case ROLES.CONDOMINO:
                return {
                    visibleCommonRoles: [],
                    showPrivateParties: true,
                    visibleCondoIndex: 0 // Simulate user is Condomino 1
                };
            case ROLES.IMPRESA:
                return {
                    visibleCommonRoles: ['impresa'],
                    showPrivateParties: false,
                    visibleCondoIndex: null
                };
            case ROLES.PROFESSIONISTA:
                return {
                    visibleCommonRoles: ['professionista'],
                    showPrivateParties: false,
                    visibleCondoIndex: null
                };
            case ROLES.AMMINISTRATORE:
            case ROLES.GESTORE:
            case ROLES.TECH:
            default:
                return {
                    visibleCommonRoles: ['amministratore', 'impresa', 'professionista'],
                    showPrivateParties: true,
                    visibleCondoIndex: null
                };
        }
    }, [user?.role]); // Added optional chaining for user

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

    const getInvoicesForRole = (roleIdentifier, limit = 100) => {
        // Mock filtering logic based on 'to' field matching role identifier
        // In real app, condomino_0 maps to a specific ID
        return paymentData.invoiceDetails.filter(inv => inv.to === roleIdentifier).slice(0, limit);
    };

    const calculateToPay = (roleIdentifier) => {
        return getInvoicesForRole(roleIdentifier)
            .filter(inv => inv.status !== 'paid')
            .reduce((sum, inv) => sum + inv.amount, 0);
    };

    // Helper for mock transactions (as they are not in the data source)
    const getTransactionsForRole = (roleId) => {
        // This is mock data, in a real app it would come from paymentData or an API
        return [
            { id: 'tr1', type: 'topup', amount: 500, date: '12/02/2026' },
            { id: 'tr2', type: 'payment', amount: 150, date: '10/02/2026' },
            { id: 'tr3', type: 'payment', amount: 85, date: '05/02/2026' },
        ].slice(0, Math.floor(Math.random() * 3) + 1); // Random number of transactions
    };

    // --- RENDER SPECIALIZED VIEWS FOR CONDOMINO & ADMIN ---
    if (user?.role === ROLES.CONDOMINO) {
        const condoId = `condomino_${visibleCondoIndex}`;
        const walletStatus = paymentData.wallets.condomino[visibleCondoIndex] || WALLET_STATUS.ACTIVE; // Assuming condoWallets is an array
        // For Condomino, we simulate a personal balance. In a real app, this would be specific to the user's unit.
        const personalBalance = 1250.00;

        return (
            <WalletDashboardView
                balance={personalBalance}
                lastUpdate={paymentData.lastUpdate} // Assuming paymentData has a lastUpdate field
                invoices={getInvoicesForRole(condoId)}
                transactions={getTransactionsForRole(condoId)}
                roleLabel={`Condomino ${visibleCondoIndex + 1}`}
                walletStatus={walletStatus}
            />
        );
    }

    if (user?.role === ROLES.AMMINISTRATORE) {
        // Amministratore sees the "Global" or "Common" wallet view
        // We'll show the 'amministratore' specific wallet data for now.
        const adminWalletStatus = paymentData.wallets['amministratore'] || WALLET_STATUS.ACTIVE;
        const adminBalance = paymentData.balance || 0; // Assuming paymentData has a global balance or admin balance

        return (
            <WalletDashboardView
                balance={adminBalance}
                lastUpdate={paymentData.lastUpdate}
                invoices={getInvoicesForRole('amministratore')}
                transactions={getTransactionsForRole('amministratore')}
                roleLabel="Amministrazione"
                walletStatus={adminWalletStatus}
            />
        );
    }

    // For Condo: simulate looking at "My Unit" (e.g., index 0)
    // const visibleCondoIndex = user?.role === ROLES.CONDOMINO ? 0 : null; // null means all if showPrivateParties is true

    const condoWallets = Array.isArray(paymentData.wallets.condomino)
        ? paymentData.wallets.condomino
        : [paymentData.wallets.condomino]; // Fallback

    const totalToPay = paymentData.invoiceDetails.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);

    return (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Totale Fatturato</p>
                                <p className="text-xl font-black text-primary">
                                    {formatCurrency(paymentData.totalInvoices)}
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
                                    {formatCurrency(totalToPay)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Parti Comuni */}
                {visibleCommonRoles.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <Building2 size={16} className="text-primary" />
                            <h3 className="text-[11px] font-black tracking-[0.2em] text-primary/60 uppercase">Parti Comuni</h3>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                            {COMMON_ROLES.filter(r => visibleCommonRoles.includes(r.id)).map((role) => {
                                const status = paymentData.wallets[role.id];
                                const toPay = calculateToPay(role.id);

                                return (
                                    <AccordionItem
                                        key={role.id}
                                        value={role.id}
                                        className="border-none shadow-xl shadow-black/[0.02] bg-white rounded-2xl overflow-hidden group data-[state=open]:ring-2 data-[state=open]:ring-primary/5"
                                    >
                                        <AccordionTrigger className="hover:no-underline px-6 py-4 transition-all hover:bg-slate-50/50">
                                            <div className="flex flex-1 items-center justify-between gap-4 text-left">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", role.color)}>
                                                        <role.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-primary">{role.label}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{role.sub}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 mr-2">
                                                    <div className="hidden sm:block text-right">
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Stato Wallet</p>
                                                        {getStatusBadge(status)}
                                                    </div>
                                                    <div className="text-right min-w-[80px]">
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Da Pagare</p>
                                                        <p className={cn(
                                                            "font-black text-sm",
                                                            toPay > 0 ? "text-amber-600" : "text-emerald-600"
                                                        )}>
                                                            {formatCurrency(toPay)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6 pt-2 border-t border-slate-50">
                                            <div className="rounded-xl border border-border/40 overflow-hidden mt-4">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                                            <TableHead className="text-[10px] font-bold uppercase h-9">Fattura</TableHead>
                                                            <TableHead className="text-right text-[10px] font-bold uppercase h-9">Importo</TableHead>
                                                            <TableHead className="text-right text-[10px] font-bold uppercase h-9">Stato</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {getInvoicesForRole(role.id).map(inv => (
                                                            <TableRow key={inv.id} className="h-10 border-b border-border/20 last:border-0 hover:bg-transparent">
                                                                <TableCell className="font-bold text-xs text-primary">{inv.id} <span className="font-normal text-slate-400 text-[10px] ml-1">{inv.date}</span></TableCell>
                                                                <TableCell className="text-right font-medium text-xs">{formatCurrency(inv.amount)}</TableCell>
                                                                <TableCell className="text-right">
                                                                    {inv.status === 'paid' ?
                                                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1"><CheckCircle2 size={10} /> PAGATA</span> :
                                                                        <span className="text-[10px] font-bold text-amber-600 flex items-center justify-end gap-1"><Clock size={10} /> PENDENTE</span>
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {getInvoicesForRole(role.id).length === 0 && (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="h-16 text-center text-xs text-slate-400 italic">Nessuna fattura presente.</TableCell>
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
                )}

                {/* Parti Private */}
                {showPrivateParties && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <UserCircle2 size={16} className="text-primary" />
                            <h3 className="text-[11px] font-black tracking-[0.2em] text-primary/60 uppercase">Parti Private</h3>
                        </div>

                        <Accordion type="multiple" className="space-y-3">
                            {condoWallets.map((status, idx) => {
                                // Filter specific unit for Condomino role
                                if (visibleCondoIndex !== null && idx !== visibleCondoIndex) return null;

                                const condoId = `condomino_${idx}`;
                                const toPay = calculateToPay(condoId);

                                return (
                                    <AccordionItem
                                        key={condoId}
                                        value={condoId}
                                        className="border-none shadow-xl shadow-black/[0.02] bg-white rounded-2xl overflow-hidden border-l-4 border-l-blue-400"
                                    >
                                        <AccordionTrigger className="hover:no-underline px-6 py-4 transition-all hover:bg-slate-50/50">
                                            <div className="flex flex-1 items-center justify-between gap-4 text-left">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[11px] font-black text-primary border border-blue-100">
                                                        C{idx + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-primary">Condomino {idx + 1}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Proprietario unità</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 mr-2">
                                                    <div className="hidden sm:block text-right">
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Stato Wallet</p>
                                                        {getStatusBadge(status)}
                                                    </div>
                                                    <div className="text-right min-w-[80px]">
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Da Pagare</p>
                                                        <p className={cn(
                                                            "font-black text-sm",
                                                            toPay > 0 ? "text-amber-600" : "text-emerald-600"
                                                        )}>
                                                            {formatCurrency(toPay)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6 pt-2 border-t border-slate-50">
                                            <div className="rounded-xl border border-border/40 overflow-hidden mt-4">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                                            <TableHead className="text-[10px] font-bold uppercase h-9">Fattura</TableHead>
                                                            <TableHead className="text-right text-[10px] font-bold uppercase h-9">Importo</TableHead>
                                                            <TableHead className="text-right text-[10px] font-bold uppercase h-9">Stato</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {getInvoicesForRole(condoId).map(inv => (
                                                            <TableRow key={inv.id} className="h-10 border-b border-border/20 last:border-0 hover:bg-transparent">
                                                                <TableCell className="font-bold text-xs text-primary">{inv.id} <span className="font-normal text-slate-400 text-[10px] ml-1">{inv.date}</span></TableCell>
                                                                <TableCell className="text-right font-medium text-xs">{formatCurrency(inv.amount)}</TableCell>
                                                                <TableCell className="text-right">
                                                                    {inv.status === 'paid' ?
                                                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1"><CheckCircle2 size={10} /> PAGATA</span> :
                                                                        <span className="text-[10px] font-bold text-amber-600 flex items-center justify-end gap-1"><Clock size={10} /> PENDENTE</span>
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {getInvoicesForRole(condoId).length === 0 && (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="h-16 text-center text-xs text-slate-400 italic">Nessuna fattura presente.</TableCell>
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
                )}
            </div>
        </div>
    );
}
