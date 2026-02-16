import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Wallet,
    CreditCard,
    ArrowsUpFromLine,
    History,
    Terminal,
    Bug,
    RefreshCw,
    Timer,
    ArrowUpRight,
    ArrowDownLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/paymentsMockData';

export function TechPaymentsMonitor() {
    // Calculating metrics based on PAYMENT_PROJECTS
    // We treat each project's primary wallets as data points
    const allWallets = PAYMENT_PROJECTS.flatMap(p => [
        { id: `WLT-${p.id}-ADM`, status: p.wallets.amministratore, type: 'Amministratore', project: p.name },
        { id: `WLT-${p.id}-IMP`, status: p.wallets.impresa, type: 'Impresa', project: p.name },
        { id: `WLT-${p.id}-PRO`, status: p.wallets.professionista, type: 'Professionista', project: p.name }
    ]);

    const activeCount = allWallets.filter(w => w.status === WALLET_STATUS.ACTIVE).length;
    const pendingCount = allWallets.filter(w => w.status === WALLET_STATUS.PENDING).length;
    const toActivateCount = allWallets.filter(w => w.status === WALLET_STATUS.TO_ACTIVATE).length;

    // Mocking transaction totals for the tech view
    const totalTrx = 1248;
    const totalVolume = "€ 4.250.000,00";

    const metricsCards = [
        { label: 'Wallet Attivi', value: activeCount, color: 'emerald', icon: CheckCircle2 },
        { label: 'Wallet Pending', value: pendingCount, color: 'amber', icon: Timer },
        { label: 'Da Attivare', value: toActivateCount, color: 'slate', icon: AlertTriangle },
        { label: 'Totale Transazioni', value: totalTrx, color: 'blue', icon: History },
        { label: 'Volume Totale', value: totalVolume, color: 'indigo', icon: ArrowsUpFromLine },
    ];

    // Simulating technical issues specific to Wallets
    const walletIssues = [
        { id: 'WLT-ERR-01', walletId: 'WLT-PRJ-001-ADM', type: 'reconciliation_failed', severity: 'high', msg: 'Sync mismatch: expected €14.250, found €14.000' },
        { id: 'WLT-ERR-02', walletId: 'WLT-PRJ-004-IMP', type: 'kyc_stuck', severity: 'medium', msg: 'KYC validation process timed out after 48h' },
        { id: 'WLT-ERR-03', walletId: 'WLT-PRJ-009-PRO', type: 'webhook_failure', severity: 'low', msg: 'Failed to deliver payout confirmation webhook' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Wallet Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {metricsCards.map((m, idx) => (
                    <Card key={idx} className="border-none shadow-xl shadow-black/[0.02] overflow-hidden group">
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                                m.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                    m.color === 'amber' ? "bg-amber-50 text-amber-600" :
                                        m.color === 'blue' ? "bg-blue-50 text-blue-600" :
                                            m.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                                                "bg-slate-50 text-slate-600"
                            )}>
                                <m.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{m.label}</p>
                                <span className="text-xl font-black text-slate-900 tracking-tight">{m.value}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Global Wallet Monitor */}
                <Card className="lg:col-span-2 border-none shadow-xl shadow-black/[0.02] overflow-hidden rounded-2xl">
                    <CardHeader className="bg-slate-50/50 border-b border-border/40 flex flex-row items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-2">
                            <Terminal className="text-primary" size={18} />
                            <CardTitle className="text-sm font-bold tracking-widest text-primary uppercase">Registro Wallet di Sistema</CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-[10px] font-bold uppercase">
                                <Activity size={12} className="mr-2" /> Health check
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-[10px] font-bold uppercase">
                                <RefreshCw size={12} className="mr-2" /> force sync
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-border/40">
                                    <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">Wallet ID</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">Status</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">n. trx</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">Ultima Transazione</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">Health</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allWallets.slice(0, 15).map((w) => {
                                    const hasIssue = walletIssues.some(i => i.walletId === w.id);
                                    // Mocking some trx data
                                    const trxCount = Math.floor(Math.random() * 50) + (w.status === WALLET_STATUS.ACTIVE ? 10 : 0);
                                    const lastTrx = w.status === WALLET_STATUS.ACTIVE ? 'Oggi, 12:45' : 'Mai';

                                    return (
                                        <TableRow key={w.id} className="font-mono text-[11px] group hover:bg-slate-50 transition-colors h-12 border-b border-border/20 last:border-0">
                                            <TableCell className="px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-primary font-bold">{w.id}</span>
                                                    <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{w.type} / {w.project}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={cn(
                                                    "text-[9px] px-1.5 py-0 border-none",
                                                    w.status === WALLET_STATUS.ACTIVE ? "text-emerald-500 bg-emerald-500/10" :
                                                        w.status === WALLET_STATUS.PENDING ? "text-amber-500 bg-amber-500/10" :
                                                            "text-slate-400 bg-slate-100"
                                                )}>
                                                    {w.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center font-bold text-slate-600">
                                                {trxCount}
                                            </TableCell>
                                            <TableCell className="text-center text-slate-500">
                                                {lastTrx}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {hasIssue ? (
                                                    <div className="flex justify-center">
                                                        <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <CheckCircle2 size={14} className={cn(
                                                            w.status === WALLET_STATUS.ACTIVE ? "text-emerald-500" : "text-slate-200"
                                                        )} />
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Wallet Issues Log */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <Bug className="text-amber-500" size={18} />
                        <h3 className="font-bold text-slate-800">Critical Wallet Log</h3>
                    </div>

                    {walletIssues.map((issue) => (
                        <Card key={issue.id} className="border-none shadow-md shadow-black/[0.02] border-l-4 border-l-amber-500 overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <Badge className={cn(
                                        "text-[9px] font-black uppercase tracking-widest",
                                        issue.severity === 'high' ? "bg-red-500" : issue.severity === 'medium' ? "bg-amber-500" : "bg-blue-500"
                                    )}>
                                        {issue.severity}
                                    </Badge>
                                    <span className="text-[10px] font-mono text-slate-400">{issue.id}</span>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 mb-1">{issue.type.replace('_', ' ').toUpperCase()}</h4>
                                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{issue.msg}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded">{issue.walletId}</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-[9px] font-bold text-slate-400 hover:text-primary">
                                        ANALYZE →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Card className="bg-slate-900 border-none shadow-xl text-white overflow-hidden p-5 relative min-h-[220px]">
                        <Terminal className="absolute bottom-[-10px] right-[-10px] opacity-10" size={100} />
                        <div className="relative z-10">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Live Wallet Activity
                            </h4>
                            <div className="space-y-3 font-mono text-[10px] opacity-80">
                                <div className="flex gap-2">
                                    <span className="text-slate-500">[13:34:01]</span>
                                    <p className="text-emerald-500">WLT-PRJ-002-ADM: Payout recognized (€2.450)</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-500">[13:34:05]</span>
                                    <p>WLT-PRJ-005-IMP: KYC Documents uploaded</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-500">[13:34:12]</span>
                                    <p className="text-amber-500">System: Retry webhook WLT-PRJ-009...</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-500">[13:34:15]</span>
                                    <p className="text-blue-400">WLT-PRJ-001-CST: Status changed → ACTIVE</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Button({ children, className, variant, size, ...props }) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 px-3 py-1.5",
                variant === 'ghost' ? "hover:bg-slate-100 text-slate-500" : "bg-primary text-white",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
