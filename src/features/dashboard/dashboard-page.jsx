import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatCard } from '@/components/composed/stat-card';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PROJECTS, STATS, RECENT_ACTIONS } from '@/data/projects';
import { Clock, LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
    const navigate = useNavigate();

    return (
        <>
            <PageHeader title="Dashboard" subtitle="Panoramica generale della piattaforma" />

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {STATS.map((stat, i) => (
                    <StatCard key={i} label={stat.label} value={stat.value} icon={stat.icon}>
                        <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                            {stat.change} rispetto al mese scorso
                        </p>
                    </StatCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Projects table */}
                <SectionPanel title="Progetti Recenti" icon={LayoutDashboard} className="col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome Progetto</TableHead>
                                <TableHead>Stato</TableHead>
                                <TableHead>Aggiornato</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PROJECTS.map((p) => (
                                <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate(`/projects/${p.id}`)}>
                                    <TableCell className="font-medium">{p.displayId}</TableCell>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell><StatusBadge status={p.statusCategory}>{p.status}</StatusBadge></TableCell>
                                    <TableCell className="text-muted-foreground">{p.updated}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionPanel>

                {/* Recent actions */}
                <SectionPanel title="Attività Recenti" icon={Clock}>
                    <div className="space-y-4">
                        {RECENT_ACTIONS.map((action) => (
                            <div key={action.id} className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0">
                                <p className="text-sm">{action.text}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">{action.target}</span>
                                    <span className="text-xs text-muted-foreground">{action.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionPanel>
            </div>
        </>
    );
}
