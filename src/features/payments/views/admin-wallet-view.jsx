import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { StatusBadge } from '@/components/composed/status-badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wallet, TrendingUp, HandCoins, CheckCircle2, AlertTriangle, FileSignature, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';

export default function AdminWalletView() {
    const navigate = useNavigate();
    // Simulate Admin seeing all projects for now (or slice)
    const projects = PAYMENT_PROJECTS;

    const totalInvoiced = projects.reduce((sum, p) => sum + p.totalInvoices, 0);
    const totalPending = projects.reduce((sum, p) => {
        return sum + p.invoiceDetails.filter(i => i.status !== 'paid').reduce((s, inv) => s + inv.amount, 0);
    }, 0);

    return (
        <>
            <PageHeader
                title="Il Mio Wallet"
                subtitle="Gestione centralizzata pagamenti e stati approvazione condomini"
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Totale Fatturato</p>
                                <p className="text-xl font-black text-primary">
                                    {formatCurrency(totalInvoiced)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                                <HandCoins size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pendenze Totali</p>
                                <p className="text-xl font-black text-amber-600">
                                    {formatCurrency(totalPending)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-black/[0.03] bg-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wallet Attivi</p>
                                <p className="text-xl font-black text-emerald-600">
                                    {projects.filter(p => p.wallets.amministratore === WALLET_STATUS.ACTIVE).length} / {projects.length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Managed Projects List */}
            <Card className="border-none shadow-xl shadow-black/[0.02] overflow-hidden rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">I Miei Condomini</TableHead>
                            <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Stato Wallet</TableHead>
                            <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Documenti</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Scadenza Prossima</TableHead>
                            <TableHead className="text-right px-6 text-[10px] font-bold uppercase tracking-widest text-primary/60">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow
                                key={project.id}
                                className="group hover:bg-slate-50/40 transition-colors cursor-pointer h-16"
                                onClick={() => navigate(`/projects/${project.id}?tab=pagamenti`)}
                            >
                                <TableCell className="px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-primary">{project.name}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">ID: {project.id}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        {project.wallets.amministratore === WALLET_STATUS.ACTIVE ? (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold items-center gap-1.5 pl-2 pr-3">
                                                <CheckCircle2 size={12} />
                                                ATTIVO
                                            </Badge>
                                        ) : project.wallets.amministratore === WALLET_STATUS.PENDING ? (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 text-[10px] font-bold items-center gap-1.5 pl-2 pr-3">
                                                <AlertTriangle size={12} />
                                                PENDING
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-none text-[9px] font-bold uppercase">
                                                DA ATTIVARE
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-bold text-primary">12/15</span>
                                            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Caricati</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className="text-xs font-bold text-slate-600">
                                        {/* Mock date logic */}
                                        {parseInt(project.id.split('-')[1]) % 2 === 0 ? '15 Mar 2026' : '30 Mar 2026'}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right px-6">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary hover:text-white transition-all">
                                        <ArrowRight size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}
