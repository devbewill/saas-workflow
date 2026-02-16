import React from 'react';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Wallet, Activity, AlertTriangle, Server, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';

export default function TechMonitorView() {
    // Generate flattened wallet list for the table
    const allWallets = PAYMENT_PROJECTS.flatMap(p => {
        const wallets = [];
        wallets.push({ id: `WLT-${p.id}-ADM`, type: 'Amministratore', status: p.wallets.amministratore, project: p.id });
        wallets.push({ id: `WLT-${p.id}-IMP`, type: 'Impresa', status: p.wallets.impresa, project: p.id });
        // Add more if needed, keeping it simple for tech view
        return wallets;
    });

    return (
        <>
            <PageHeader title="System Health Monitor" subtitle="Panoramica tecnica dei wallet e servizi" />

            {/* System metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <StatCard label="Wallet Attivi" value={allWallets.filter(w => w.status === WALLET_STATUS.ACTIVE).length} icon={Wallet} />
                <StatCard label="Wallet Pending" value={allWallets.filter(w => w.status === WALLET_STATUS.PENDING).length} icon={Activity} />
                <StatCard label="Da Attivare" value={allWallets.filter(w => w.status === WALLET_STATUS.TO_ACTIVATE).length} icon={AlertTriangle} />
                <StatCard label="Transazioni Totali" value="3.421" icon={Server} />
                <StatCard label="Volume Movimentato" value="€ 2.4M" icon={Wallet} />
            </div>

            {/* Wallet status table */}
            <SectionPanel title="Stato Wallet (Ultimi 10)" icon={Server} className="mb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Wallet ID</TableHead>
                            <TableHead>Tipo / Progetto</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Transazioni</TableHead>
                            <TableHead>Ultima Transazione</TableHead>
                            <TableHead>Health</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allWallets.slice(0, 10).map((w) => (
                            <TableRow key={w.id}>
                                <TableCell className="font-mono text-xs">{w.id}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{w.type} / {w.project}</TableCell>
                                <TableCell><StatusBadge status={w.status}>{w.status ? w.status.replace('_', ' ') : 'N/A'}</StatusBadge></TableCell>
                                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                                <TableCell className="text-muted-foreground">12/01/2026 14:30</TableCell>
                                <TableCell>
                                    {w.status === WALLET_STATUS.ACTIVE ? (
                                        <CheckCircle size={16} className="text-green-500" />
                                    ) : (
                                        <AlertTriangle size={16} className="text-yellow-500" />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionPanel>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical log */}
                <SectionPanel title="Log Critici" icon={AlertTriangle}>
                    <div className="space-y-3">
                        {[
                            { time: '14:30', msg: 'Wallet WLT-PRJ-004-ADM: Attivazione fallita — KYC incompleto', severity: 'error' },
                            { time: '12:15', msg: 'Wallet WLT-PRJ-002-IMP: Timeout connessione provider pagamento', severity: 'warning' },
                            { time: '09:00', msg: 'Wallet WLT-PRJ-001-ADM: Ricarica completata con successo', severity: 'info' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm border-b pb-2 last:border-0">
                                <Badge variant={log.severity === 'error' ? 'destructive' : log.severity === 'warning' ? 'secondary' : 'outline'}>
                                    {log.time}
                                </Badge>
                                <span>{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </SectionPanel>

                {/* Live activity - Terminal Style */}
                <Card className="bg-slate-900 border-none shadow-xl text-white overflow-hidden p-5 relative min-h-[220px]">
                    <Terminal className="absolute bottom-[-10px] right-[-10px] opacity-10" size={100} />
                    <div className="relative z-10">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Wallet Activity
                        </h4>
                        <div className="space-y-3 font-mono text-[10px] opacity-80">
                            <div className="flex gap-2">
                                <span className="text-slate-500">[14:32:01]</span>
                                <p className="text-emerald-500">WLT-PRJ-001-ADM: Payout recognized (€2.450)</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-slate-500">[14:32:05]</span>
                                <p>WLT-PRJ-005-IMP: KYC Documents uploaded</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-slate-500">[14:32:12]</span>
                                <p className="text-amber-500">System: Retry webhook WLT-PRJ-009...</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-slate-500">[14:32:15]</span>
                                <p className="text-blue-400">WLT-PRJ-001-CST: Status changed → ACTIVE</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}
