import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileSignature, AlertTriangle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPaymentsTable({ projects, onProjectClick }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-xl shadow-black/[0.02]">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">Il Mio Progetto</TableHead>
                        <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Stato Firma</TableHead>
                        <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-primary/60">Documenti</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Scadenza Prossima</TableHead>
                        <TableHead className="text-right px-6 text-[10px] font-bold uppercase tracking-widest text-primary/60">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow
                            key={project.id}
                            className="group hover:bg-amber-50/20 transition-colors cursor-pointer h-16"
                            onClick={() => onProjectClick(project.id)}
                        >
                            <TableCell className="px-6">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-primary">{project.name}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">ID: {project.id}</span>
                                </div>
                            </TableCell>

                            <TableCell className="text-center">
                                <div className="flex flex-col items-center gap-1">
                                    {project.wallets.amministratore === 'active' ? (
                                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                                            <CheckCircle2 size={14} /> Firmato
                                        </div>
                                    ) : (
                                        <Badge className="bg-amber-500 text-white border-none text-[9px] font-black uppercase">
                                            Firma Necessaria
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
                                    <div className="w-px h-6 bg-slate-100" />
                                    <AlertTriangle size={14} className="text-amber-500" />
                                </div>
                            </TableCell>

                            <TableCell>
                                <span className="text-xs font-bold text-slate-600">22 Mar 2026</span>
                            </TableCell>

                            <TableCell className="text-right px-6">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-amber-500 hover:text-white transition-all">
                                    <FileSignature size={14} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
