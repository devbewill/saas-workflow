import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Wifi,
    WifiOff,
    Database,
    Server,
    Terminal,
    Bug,
    ShieldAlert,
    RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/paymentsMockData';

export function TechPaymentsMonitor() {
    // Mock system metrics
    const metrics = [
        { label: 'API Gateway', status: 'healthy', latency: '42ms', icon: Wifi },
        { label: 'Blockchain Node', status: 'warning', latency: '1.2s', icon: Database },
        { label: 'Auth Service', status: 'healthy', latency: '15ms', icon: Server },
        { label: 'Storage Cluster', status: 'healthy', latency: '8ms', icon: Activity },
    ];

    // Simulating technical issues in projects
    const systemIssues = [
        { id: 'SYS-001', prj: 'PRJ-001', type: 'reconciliation_error', severity: 'high', msg: 'Mismatch between ledger and database' },
        { id: 'SYS-002', prj: 'PRJ-004', type: 'sync_timeout', severity: 'medium', msg: 'Node synchronization delayed > 10m' },
        { id: 'SYS-003', prj: 'PRJ-009', type: 'api_403', severity: 'low', msg: 'Repeated 403 errors on external provider' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* System Health Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {metrics.map((m, idx) => (
                    <Card key={idx} className="border-none shadow-xl shadow-black/[0.02] overflow-hidden group">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className={cn(
                                "p-2.5 rounded-xl transition-colors",
                                m.status === 'healthy' ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" : "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
                            )}>
                                <m.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{m.label}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">{m.latency}</span>
                                    {m.status === 'healthy' ? (
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    ) : (
                                        <AlertTriangle size={12} className="text-amber-500" />
                                    )}
                                </div>
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
                            <CardTitle className="text-sm font-bold tracking-widest text-primary uppercase">Global Wallet Status (Raw Data)</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-[10px] font-bold uppercase">
                            <RefreshCw size={12} className="mr-2" /> force sync
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-border/40">
                                    <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">PRJ_ID</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">ADM_ST</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">ENT_ST</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">CST_ST</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60 text-center">HEALTH</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {PAYMENT_PROJECTS.map((project) => {
                                    const hasTechIssue = systemIssues.some(i => i.prj === project.id);
                                    return (
                                        <TableRow key={project.id} className="font-mono text-[11px] group hover:bg-slate-50 transition-colors h-12 border-b border-border/20 last:border-0">
                                            <TableCell className="px-6">
                                                <span className="text-primary font-bold">{project.id}</span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={cn(
                                                    "text-[9px] px-1.5 py-0 border-none",
                                                    project.wallets.amministratore === WALLET_STATUS.ACTIVE ? "text-emerald-500 bg-emerald-500/10" : "text-slate-400 bg-slate-100"
                                                )}>
                                                    {project.wallets.amministratore.substring(0, 3)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={cn(
                                                    "text-[9px] px-1.5 py-0 border-none",
                                                    project.wallets.impresa === WALLET_STATUS.ACTIVE ? "text-emerald-500 bg-emerald-500/10" : "text-slate-400 bg-slate-100"
                                                )}>
                                                    {project.wallets.impresa.substring(0, 3)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="text-slate-400">
                                                    {Array.isArray(project.wallets.condomino) ? project.wallets.condomino.length : 1} ACT
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {hasTechIssue ? (
                                                    <div className="flex justify-center">
                                                        <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <CheckCircle2 size={14} className="text-emerald-500/50" />
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

                {/* System Issues Log */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <Bug className="text-amber-500" size={18} />
                        <h3 className="font-bold text-slate-800">Critical Issues Log</h3>
                    </div>

                    {systemIssues.map((issue) => (
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
                                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded">{issue.prj}</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-[9px] font-bold text-slate-400 hover:text-primary">
                                        DEBUG →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Card className="bg-slate-900 border-none shadow-xl text-white overflow-hidden p-4 relative">
                        <Terminal className="absolute bottom-[-10px] right-[-10px] opacity-10" size={80} />
                        <div className="relative z-10">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Live Node Activity
                            </h4>
                            <div className="space-y-2 font-mono text-[10px] opacity-80">
                                <p className="text-emerald-500/80">Processing block #140292...</p>
                                <p>Wallet PRJ-001: SIG_COLLECTED</p>
                                <p>Reconciling transaction TX-902...</p>
                                <p className="text-amber-500">Warning: Node latency spike</p>
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
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
                variant === 'ghost' ? "hover:bg-slate-100" : "bg-primary text-white",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
