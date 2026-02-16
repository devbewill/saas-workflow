import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Card } from '@/components/ui/card';
import { badgeVariants } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Wallet, ArrowUpDown, Clock, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';
import { cn } from '@/lib/utils';
import { ProjectPaymentDetailSheet } from '../components/project-payment-detail-sheet';

export default function GestoreView() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const filtered = PAYMENT_PROJECTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate aggregate stats
    const totalInvoiced = PAYMENT_PROJECTS.reduce((sum, p) => sum + p.totalInvoices, 0);
    // Approximate count of active wallets (just for stats)
    const totalWallets = PAYMENT_PROJECTS.reduce((count, p) => {
        let c = 0;
        if (p.wallets.amministratore === WALLET_STATUS.ACTIVE) c++;
        if (p.wallets.impresa === WALLET_STATUS.ACTIVE) c++;
        if (p.wallets.professionista === WALLET_STATUS.ACTIVE) c++;
        if (Array.isArray(p.wallets.condomino)) {
            c += p.wallets.condomino.filter(w => w === WALLET_STATUS.ACTIVE).length;
        }
        return count + c;
    }, 0);

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
        <>
            <PageHeader
                title="Monitoraggio Globale Pagamenti"
                subtitle="Panoramica centralizzata di tutti i wallet di progetto e stati di avanzamento"
                actions={
                    <Button variant="outline" className="gap-2">
                        <Download size={14} />
                        Esporta Report
                    </Button>
                }
            />

            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Volume Transato" value={formatCurrency(totalInvoiced)} icon={Landmark} />
                <StatCard label="Wallet Attivi" value={totalWallets} icon={Wallet} />
                <StatCard label="Progetti Gestiti" value={PAYMENT_PROJECTS.length} icon={ArrowUpDown} />
                <StatCard label="In Attesa Attivazione" value="12" icon={Clock} />
            </div>

            {/* Search */}
            <div className="mb-4">
                <SearchInput
                    placeholder="Cerca progetto, ID o condominio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Table */}
            <Card className="overflow-hidden border-none shadow-xl shadow-black/[0.02]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="w-[250px] font-bold uppercase text-[11px] tracking-wider text-primary/60">Progetto</TableHead>
                            <TableHead className="text-center font-bold uppercase text-[11px] tracking-wider text-primary/60">Amministratore</TableHead>
                            <TableHead className="text-center font-bold uppercase text-[11px] tracking-wider text-primary/60">Impresa</TableHead>
                            <TableHead className="text-center font-bold uppercase text-[11px] tracking-wider text-primary/60">Condomini</TableHead>
                            <TableHead className="text-center font-bold uppercase text-[11px] tracking-wider text-primary/60">Professionista</TableHead>
                            <TableHead className="text-right font-bold uppercase text-[11px] tracking-wider text-primary/60">Totale Fatture</TableHead>
                            <TableHead className="text-right font-bold uppercase text-[11px] tracking-wider text-primary/60">Aggiornato</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((project) => (
                            <TableRow
                                key={project.id}
                                className="group hover:bg-slate-50/50 transition-colors cursor-pointer h-16"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setSheetOpen(true);
                                }}
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-primary group-hover:text-primary transition-colors">{project.name}</span>
                                        <span className="text-[10px] font-mono text-slate-400">#{project.id} · {project.owner}</span>
                                    </div>
                                </TableCell>

                                {['amministratore', 'impresa', 'condomino', 'professionista'].map((role) => (
                                    <TableCell key={role} className="text-center">
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            {role === 'condomino' && Array.isArray(project.wallets[role]) ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex -space-x-1.5 hover:space-x-1 transition-all duration-300 px-2 py-1 rounded-full hover:bg-slate-100">
                                                        {project.wallets[role].map((status, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={cn(
                                                                    "w-3.5 h-3.5 rounded-full border-2 border-white ring-1 shadow-sm transition-transform hover:scale-125 hover:z-10 cursor-pointer",
                                                                    status === WALLET_STATUS.ACTIVE ? "bg-emerald-500 ring-emerald-200" :
                                                                        status === WALLET_STATUS.PENDING ? "bg-amber-500 ring-amber-200" :
                                                                            "bg-slate-300 ring-slate-100"
                                                                )}
                                                                title={`Condomino ${idx + 1}: ${status}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                                        {project.wallets[role].length} Unit
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
                                        {formatCurrency(project.totalInvoices || 0)}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right text-xs font-semibold text-slate-500">
                                    {project.updated}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <ProjectPaymentDetailSheet
                project={selectedProject}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
            />
        </>
    );
}
