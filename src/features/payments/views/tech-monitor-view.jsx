import React from 'react';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Wallet, Activity, AlertTriangle, Server, CheckCircle, XCircle } from 'lucide-react';

export default function TechMonitorView() {
    return (
        <>
            <PageHeader title="System Health Monitor" subtitle="Panoramica tecnica dei wallet e servizi" />

            {/* System metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <StatCard label="Wallet Attivi" value="156" icon={Wallet} />
                <StatCard label="Wallet Pending" value="12" icon={Activity} />
                <StatCard label="Da Attivare" value="8" icon={AlertTriangle} />
                <StatCard label="Transazioni Totali" value="3.421" icon={Server} />
                <StatCard label="Volume Movimentato" value="€ 2.4M" icon={Wallet} />
            </div>

            {/* Wallet status table */}
            <SectionPanel title="Stato Wallet" icon={Server} className="mb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Wallet ID</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Transazioni</TableHead>
                            <TableHead>Ultima Transazione</TableHead>
                            <TableHead>Health</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-mono text-xs">WLT-001</TableCell>
                            <TableCell><StatusBadge status="attivo">Attivo</StatusBadge></TableCell>
                            <TableCell>234</TableCell>
                            <TableCell className="text-muted-foreground">12/01/2026 14:30</TableCell>
                            <TableCell><CheckCircle size={16} className="text-green-500" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-mono text-xs">WLT-002</TableCell>
                            <TableCell><StatusBadge status="in_attesa">In attesa</StatusBadge></TableCell>
                            <TableCell>0</TableCell>
                            <TableCell className="text-muted-foreground">-</TableCell>
                            <TableCell><AlertTriangle size={16} className="text-yellow-500" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-mono text-xs">WLT-003</TableCell>
                            <TableCell><StatusBadge status="attivo">Attivo</StatusBadge></TableCell>
                            <TableCell>89</TableCell>
                            <TableCell className="text-muted-foreground">11/01/2026 09:15</TableCell>
                            <TableCell><CheckCircle size={16} className="text-green-500" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-mono text-xs">WLT-004</TableCell>
                            <TableCell><StatusBadge status="da_attivare">Da attivare</StatusBadge></TableCell>
                            <TableCell>0</TableCell>
                            <TableCell className="text-muted-foreground">-</TableCell>
                            <TableCell><XCircle size={16} className="text-red-500" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </SectionPanel>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical log */}
                <SectionPanel title="Log Critici" icon={AlertTriangle}>
                    <div className="space-y-3">
                        {[
                            { time: '14:30', msg: 'Wallet WLT-004: Attivazione fallita — KYC incompleto', severity: 'error' },
                            { time: '12:15', msg: 'Wallet WLT-002: Timeout connessione provider pagamento', severity: 'warning' },
                            { time: '09:00', msg: 'Wallet WLT-001: Ricarica completata con successo', severity: 'info' },
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

                {/* Live activity */}
                <SectionPanel title="Attività Live" icon={Activity}>
                    <div className="space-y-3">
                        {[
                            { time: '14:32', msg: 'WLT-001 → Pagamento FT-045 in processing', status: 'active' },
                            { time: '14:28', msg: 'WLT-003 → Ricarica €25.000 confermata', status: 'ok' },
                            { time: '14:15', msg: 'WLT-001 → Verifica saldo completata', status: 'ok' },
                        ].map((act, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm border-b pb-2 last:border-0">
                                <span className="text-xs text-muted-foreground font-mono">{act.time}</span>
                                <span className="flex-1">{act.msg}</span>
                                <div className={`h-2 w-2 rounded-full mt-1.5 ${act.status === 'active' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
                            </div>
                        ))}
                    </div>
                </SectionPanel>
            </div>
        </>
    );
}
