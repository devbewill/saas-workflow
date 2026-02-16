import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PROJECTS, STATS } from '@/data/projects';
import { Plus, Filter, Download } from 'lucide-react';

export default function ProjectsListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredProjects = PROJECTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.displayId.includes(search)
    );

    return (
        <>
            <PageHeader
                title="Progetti"
                subtitle={`${PROJECTS.length} progetti totali`}
                actions={
                    <Button className="gap-2">
                        <Plus size={16} />
                        Nuovo Progetto
                    </Button>
                }
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
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter size={14} />
                        Filtri
                    </Button>
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
