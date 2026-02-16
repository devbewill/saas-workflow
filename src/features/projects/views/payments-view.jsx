import React from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

const PROJECT_INVOICES = [
    { id: 'FT-001', issuer: 'Impresa Rossi Srl', role: 'Impresa', amount: 45000, date: '10/01/2026', status: 'paid' },
    { id: 'FT-002', issuer: 'Studio Tecnico Verdi', role: 'Professionista', amount: 8500, date: '15/01/2026', status: 'pending' },
    { id: 'FT-003', issuer: 'Admin. Bianchi', role: 'Amministratore', amount: 3200, date: '20/01/2026', status: 'pending' },
];

export default function PaymentsView() {
    const totalPending = PROJECT_INVOICES.filter((i) => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="space-y-6 pt-4">
            <SectionPanel
                title="Fatture del Progetto"
                icon={Wallet}
                description={`${PROJECT_INVOICES.length} fatture — ${formatCurrency(totalPending)} in sospeso`}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>N. Fattura</TableHead>
                            <TableHead>Emittente</TableHead>
                            <TableHead>Ruolo</TableHead>
                            <TableHead className="text-right">Importo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Stato</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PROJECT_INVOICES.map((inv) => (
                            <TableRow key={inv.id}>
                                <TableCell className="font-medium">{inv.id}</TableCell>
                                <TableCell>{inv.issuer}</TableCell>
                                <TableCell><Badge variant="outline">{inv.role}</Badge></TableCell>
                                <TableCell className="text-right font-medium">{formatCurrency(inv.amount)}</TableCell>
                                <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                                <TableCell><StatusBadge status={inv.status}>{inv.status === 'paid' ? 'Pagato' : 'In sospeso'}</StatusBadge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionPanel>
        </div>
    );
}
