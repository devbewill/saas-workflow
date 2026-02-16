import React, { useState } from 'react';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Wallet, ArrowUpDown, FileText, Clock, Landmark } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

const GLOBAL_DATA = [
    { id: 'WLT-001', condominio: 'Cond. Einaudi - Corpo 1', status: 'attivo', balance: 145000, transactions: 23, lastActivity: '12/01/2026' },
    { id: 'WLT-002', condominio: 'Cond. Giambellino 12', status: 'in_attesa', balance: 0, transactions: 0, lastActivity: '-' },
    { id: 'WLT-003', condominio: 'Cond. Piazza Napoli 2', status: 'attivo', balance: 89500, transactions: 15, lastActivity: '10/01/2026' },
    { id: 'WLT-004', condominio: 'Cond. Via Roma 123', status: 'da_attivare', balance: 0, transactions: 0, lastActivity: '-' },
];

export default function GestoreView() {
    const [search, setSearch] = useState('');
    const filtered = GLOBAL_DATA.filter((d) =>
        d.condominio.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search)
    );

    const totalBalance = GLOBAL_DATA.reduce((sum, d) => sum + d.balance, 0);
    const activeWallets = GLOBAL_DATA.filter((d) => d.status === 'attivo').length;

    return (
        <>
            <PageHeader
                title="Pagamenti — Monitoraggio Globale"
                subtitle="Panoramica di tutti i wallet e transazioni"
                actions={
                    <Button variant="outline" className="gap-2">
                        <Download size={14} />
                        Esporta Excel
                    </Button>
                }
            />

            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Volume Totale" value={formatCurrency(totalBalance)} icon={Landmark} />
                <StatCard label="Wallet Attivi" value={activeWallets} icon={Wallet} />
                <StatCard label="Totale Transazioni" value={GLOBAL_DATA.reduce((s, d) => s + d.transactions, 0)} icon={ArrowUpDown} />
                <StatCard label="In Attesa" value={GLOBAL_DATA.filter((d) => d.status !== 'attivo').length} icon={Clock} />
            </div>

            {/* Search */}
            <div className="mb-4">
                <SearchInput
                    placeholder="Cerca wallet o condominio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Wallet ID</TableHead>
                            <TableHead>Condominio</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead className="text-right">Saldo</TableHead>
                            <TableHead className="text-right">Transazioni</TableHead>
                            <TableHead>Ultima Attività</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium font-mono text-xs">{row.id}</TableCell>
                                <TableCell>{row.condominio}</TableCell>
                                <TableCell><StatusBadge status={row.status}>{row.status.replace('_', ' ')}</StatusBadge></TableCell>
                                <TableCell className="text-right font-medium">{formatCurrency(row.balance)}</TableCell>
                                <TableCell className="text-right">{row.transactions}</TableCell>
                                <TableCell className="text-muted-foreground">{row.lastActivity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}
