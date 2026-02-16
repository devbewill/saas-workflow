import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PROJECTS, STATS } from '@/data/projects';
import { Filter, Download } from 'lucide-react';

export default function ProjectsListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProjects = PROJECTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.displayId.includes(search)
    );

    return (
        <>
            <PageHeader
                title="Progetti"
                subtitle={`${PROJECTS.length} progetti totali`}
            />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {STATS.map((stat, i) => (
                    <StatCard key={i} label={stat.label} value={stat.value} icon={stat.icon} />
                ))}
            </div>

            {/* Filters bar */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <SearchInput
                    placeholder="Cerca per nome o ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    {/* Filter Sheet */}
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter size={14} />
                                Filtri
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filtri avanzati</SheetTitle>
                                <SheetDescription>Affina la tua ricerca sulle pratiche.</SheetDescription>
                            </SheetHeader>

                            <div className="space-y-5 mt-6">
                                <div className="space-y-2">
                                    <Label>Codice fiscale condominio</Label>
                                    <Input placeholder="PRLSFN85C01G388H" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Nome amministratore</Label>
                                    <Input placeholder="Mario Rossi" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Pratica creata da</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tutti" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tutti">Tutti</SelectItem>
                                            <SelectItem value="broker">Broker</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>In carico a</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tutti" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tutti">Tutti</SelectItem>
                                            <SelectItem value="stefano">Stefano Perelli</SelectItem>
                                            <SelectItem value="mario">Mario Rossi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Importo da</Label>
                                        <Input placeholder="€" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Importo a</Label>
                                        <Input placeholder="€" />
                                    </div>
                                </div>
                            </div>

                            <SheetFooter className="mt-8">
                                <div className="flex flex-col gap-3 w-full">
                                    <Button variant="outline" className="w-full" onClick={() => setIsFilterOpen(false)}>
                                        Deseleziona tutto
                                    </Button>
                                    <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                                        Applica Filtri
                                    </Button>
                                </div>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    <Button variant="outline" size="sm" className="gap-2">
                        <Download size={14} />
                        Esporta
                    </Button>
                </div>
            </div>

            {/* Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Nome Progetto</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Broker</TableHead>
                            <TableHead>Titolare</TableHead>
                            <TableHead className="text-right">Aggiornato</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.map((p) => (
                            <TableRow
                                key={p.id}
                                className="cursor-pointer"
                                onClick={() => navigate(`/projects/${p.id}`)}
                            >
                                <TableCell className="font-medium">{p.displayId}</TableCell>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell><StatusBadge status={p.statusCategory}>{p.status}</StatusBadge></TableCell>
                                <TableCell className="text-muted-foreground">{p.brokerId}</TableCell>
                                <TableCell className="text-muted-foreground">{p.owner}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{p.updated}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}
