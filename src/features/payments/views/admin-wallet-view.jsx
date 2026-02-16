import React from 'react';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Pause, Send, Calendar, Landmark } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export default function AdminWalletView() {
    return (
        <>
            <PageHeader title="Il Mio Wallet" subtitle="Gestione wallet e pagamenti del condominio" />

            {/* Wallet card */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Wallet size={20} className="text-accent" />
                                <h3 className="text-lg font-semibold">Wallet Condominio Einaudi</h3>
                                <Badge variant="default">Attivo</Badge>
                            </div>
                            <p className="text-3xl font-bold">{formatCurrency(145000)}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Landmark size={12} />
                                    WLT-2024-SP-001
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    Attivato il: 12 Gen 2026
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button className="gap-2">
                                <ArrowDownToLine size={14} />
                                Ricarica
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Send size={14} />
                                Trasferisci su IBAN
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Pause size={14} />
                                Sospendi
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard label="Entrate Mese" value={formatCurrency(25000)} icon={ArrowDownToLine} />
                <StatCard label="Uscite Mese" value={formatCurrency(18500)} icon={ArrowUpFromLine} />
                <StatCard label="Fatture in Sospeso" value="3" icon={Wallet} />
            </div>

            {/* Recent transactions */}
            <SectionPanel title="Ultime Transazioni" icon={Wallet}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Descrizione</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Importo</TableHead>
                            <TableHead>Stato</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">12/01/2026</TableCell>
                            <TableCell>Pagamento fattura FT-001 — Impresa Rossi</TableCell>
                            <TableCell><Badge variant="outline">Uscita</Badge></TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(-45000)}</TableCell>
                            <TableCell><StatusBadge status="paid">Completato</StatusBadge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">10/01/2026</TableCell>
                            <TableCell>Ricarica wallet da CEFIN</TableCell>
                            <TableCell><Badge variant="outline">Entrata</Badge></TableCell>
                            <TableCell className="text-right font-medium text-green-600">{formatCurrency(75000)}</TableCell>
                            <TableCell><StatusBadge status="paid">Completato</StatusBadge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">05/01/2026</TableCell>
                            <TableCell>Pagamento fattura FT-002 — Studio Verdi</TableCell>
                            <TableCell><Badge variant="outline">Uscita</Badge></TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(-8500)}</TableCell>
                            <TableCell><StatusBadge status="pending">In sospeso</StatusBadge></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </SectionPanel>
        </>
    );
}
