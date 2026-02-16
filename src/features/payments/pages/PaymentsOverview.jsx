import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/paymentsMockData';
import { Wallet, CheckCircle2, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PaymentsOverview() {
    const navigate = useNavigate();

    const getStatusIcon = (status) => {
        switch (status) {
            case WALLET_STATUS.ACTIVE:
                return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case WALLET_STATUS.PENDING:
                return <Clock className="w-4 h-4 text-amber-500" />;
            case WALLET_STATUS.TO_ACTIVATE:
                return <AlertCircle className="w-4 h-4 text-slate-300" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case WALLET_STATUS.ACTIVE:
                return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold">Attivo</Badge>;
            case WALLET_STATUS.PENDING:
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 text-[10px] font-bold">In attesa</Badge>;
            case WALLET_STATUS.TO_ACTIVATE:
                return <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 text-[10px] font-bold">Da attivare</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">Monitoraggio Wallet</h1>
                    <p className="text-sm text-muted-foreground mt-1">Stato attivazione wallet per i progetti in carico</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Cerca progetto..."
                            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64 bg-white shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-black/[0.02] overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/50 border-b border-border/40 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        <CardTitle className="text-sm font-bold tracking-widest text-primary uppercase">Panoramica Progetti</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-b border-border/40">
                                <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">Progetto</TableHead>
                                <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Amministratore</TableHead>
                                <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Impresa</TableHead>
                                <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Condomino</TableHead>
                                <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Professionista</TableHead>
                                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-primary/60">Totale Fatture</TableHead>
                                <TableHead className="text-right px-6 text-[10px] font-bold uppercase tracking-widest text-primary/60">Aggiornato</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PAYMENT_PROJECTS.map((project) => (
                                <TableRow
                                    key={project.id}
                                    className="group hover:bg-primary/[0.01] transition-colors border-b border-border/30 last:border-0 h-16 cursor-pointer"
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                >
                                    <TableCell className="px-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-primary group-hover:text-primary transition-colors">{project.name}</span>
                                            <span className="text-[10px] font-mono text-slate-400">#{project.id}</span>
                                        </div>
                                    </TableCell>

                                    {['amministratore', 'impresa', 'condomino', 'professionista'].map((role) => (
                                        <TableCell key={role} className="text-center">
                                            <div className="flex flex-col items-center justify-center gap-1">
                                                {role === 'condomino' && Array.isArray(project.wallets[role]) ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="flex -space-x-1.5 hover:space-x-1 transition-all duration-300">
                                                            {project.wallets[role].map((status, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={cn(
                                                                        "w-3.5 h-3.5 rounded-full border-2 border-white ring-1 shadow-sm transition-transform hover:scale-125 hover:z-10 cursor-pointer",
                                                                        status === WALLET_STATUS.ACTIVE ? "bg-emerald-500 ring-emerald-200" :
                                                                            status === WALLET_STATUS.PENDING ? "bg-amber-500 ring-amber-200" :
                                                                                "bg-slate-300 ring-slate-100"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                                            {project.wallets[role].length} Sogg.
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {getStatusIcon(project.wallets[role])}
                                                        {getStatusBadge(project.wallets[role])}
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}

                                    <TableCell className="text-right">
                                        <span className="font-bold text-sm text-primary">
                                            {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(project.totalInvoices || 0)}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-right px-6 text-xs font-semibold text-slate-500">
                                        {project.updated}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
