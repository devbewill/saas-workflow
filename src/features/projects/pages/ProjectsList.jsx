/**
 * ProjectsList - List view for all projects
 * Renamed from PratichesList
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, STATS } from '@/data/mockData';
import { Search, Filter, Edit, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterSheet } from '@/components/sheets/FilterSheet';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProjectsList() {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    return (
        <div className="transition-all duration-700">
            <div className="space-y-6 max-w-[1400px] mx-auto p-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {STATS.map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <h3 className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projects Table Section */}
                <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <FileText size={14} className="text-blue-600" />
                            <h3 className="text-sm font-semibold text-slate-800">Tutti i Progetti</h3>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Filtra..."
                                    className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-64 bg-white"
                                />
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <Filter size={14} /> Filtri
                            </button>
                        </div>
                    </div>

                    <FilterSheet isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />

                    <div className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200">
                                    <TableHead className="w-[100px] font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">ID</TableHead>
                                    <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Progetto</TableHead>
                                    <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Stato</TableHead>
                                    <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Owner</TableHead>
                                    <TableHead className="font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Data</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-500 text-xs uppercase tracking-wider h-10">Azioni</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {PROJECTS.map((project) => (
                                    <TableRow
                                        key={project.id}
                                        className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-0 group cursor-pointer"
                                        onClick={() => navigate('/projects/' + project.id)}
                                    >
                                        <TableCell className="font-mono text-xs text-slate-500">{project.displayId}</TableCell>
                                        <TableCell>
                                            <div className="font-medium text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {project.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                                                project.statusCategory === 'Aperta'
                                                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            )}>
                                                {project.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.owner}`}
                                                        alt={project.owner}
                                                    />
                                                    <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">
                                                        {project.owner?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{project.owner}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-500">{project.updated}</TableCell>
                                        <TableCell className="text-right">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                                                <Edit size={14} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </div>
        </div>
    );
}
