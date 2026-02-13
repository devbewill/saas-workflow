/**
 * DocumentsTable - Table component for document management
 * Extracted from AtomicPraticaDetail for reusability
 */
import React, { useState, useMemo } from 'react';
import { DOCUMENTS } from '@/data/mockData';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    Filter,
    CloudUpload,
    Eye,
    MoreHorizontal,
    FileSignature,
    FilePenLine,
    CheckCircle2,
    XCircle,
    MessageSquare,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotesSheet } from '@/components/sheets/NotesSheet';

export function DocumentsTable({ projectId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedDocForNotes, setSelectedDocForNotes] = useState(null);
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(DOCUMENTS.map(d => d.category))];
        return ['all', ...cats];
    }, []);

    // Filter documents
    const filteredDocuments = useMemo(() => {
        return DOCUMENTS.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, categoryFilter]);

    // Group by category
    const groupedDocuments = useMemo(() => {
        const groups = {};
        filteredDocuments.forEach(doc => {
            if (!groups[doc.category]) groups[doc.category] = [];
            groups[doc.category].push(doc);
        });
        return groups;
    }, [filteredDocuments]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Validato':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Validato</Badge>;
            case 'Da validare':
                return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Da validare</Badge>;
            case 'Da caricare':
                return <Badge variant="outline" className="text-slate-500">Da caricare</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleOpenNotes = (doc) => {
        setSelectedDocForNotes(doc);
        setIsNotesOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Filters Row - Refined */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative group w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={16} />
                    <Input
                        placeholder="Cerca documento o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-11 pl-12 pr-4 rounded-full border-border/50 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-accent/10 focus:border-accent"
                    />
                </div>
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    {categories.slice(0, 5).map(cat => (
                        <Button
                            key={cat}
                            variant={categoryFilter === cat ? 'default' : 'outline'}
                            onClick={() => setCategoryFilter(cat)}
                            className={cn(
                                "h-9 rounded-xl px-5 text-[10px] font-extrabold uppercase tracking-widest transition-all",
                                categoryFilter === cat
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "border-border/60 hover:bg-slate-50"
                            )}
                        >
                            {cat === 'all' ? 'TUTTI' : cat.toUpperCase()}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Documents Table - Premium Design */}
            <div className="border border-border/40 rounded-2xl overflow-hidden shadow-xl shadow-black/[0.02] bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-border/40">
                            <TableHead className="w-[80px] text-[10px] font-bold uppercase tracking-widest text-primary/60 px-6">ID</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Categoria</TableHead>
                            <TableHead className="w-[450px] text-[10px] font-bold uppercase tracking-widest text-primary/60">Documento</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Data Caricamento</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Stato</TableHead>
                            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-primary/60 px-6">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDocuments.map(doc => (
                            <TableRow key={doc.id} className="group hover:bg-slate-50/50 transition-colors border-b border-border/30 last:border-0">
                                <TableCell className="px-6">
                                    <span className="text-[10px] font-bold font-mono text-slate-400 group-hover:text-primary transition-colors">#{doc.id}</span>
                                </TableCell>
                                <TableCell className="w-[120px]">
                                    <span className="text-[12px] font-bold text-slate-700 uppercase tracking-tight block">
                                        {doc.category}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-start gap-4 py-1">
                                        <div className={cn(
                                            "mt-0.5 h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm",
                                            doc.status === "Da caricare"
                                                ? "bg-slate-50 border-dashed border-slate-300 text-slate-400"
                                                : "bg-white border-border/60 text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                                        )}>
                                            {doc.status === "Da caricare" ? (
                                                <CloudUpload className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1 flex flex-col justify-center h-10">
                                            <div className="flex items-center gap-2">
                                                <p className={cn(
                                                    "text-sm tracking-tight truncate transition-colors",
                                                    doc.status === "Da caricare"
                                                        ? "font-medium text-slate-400 italic"
                                                        : "font-extrabold text-primary group-hover:text-accent"
                                                )}>
                                                    {doc.name}
                                                </p>
                                                {doc.notesCount > 0 && (
                                                    <div
                                                        onClick={() => handleOpenNotes(doc)}
                                                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[9px] font-bold tracking-tighter cursor-pointer hover:bg-accent hover:text-white transition-all shadow-sm"
                                                    >
                                                        <MessageSquare className="w-3 h-3" />
                                                        {doc.notesCount}
                                                    </div>
                                                )}
                                            </div>
                                            {doc.file !== '--' && (
                                                <p className="text-[12px] font-bold text-muted-foreground/60 italic tracking-tight">{doc.file}</p>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs font-bold text-slate-500">{doc.date}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {doc.status === 'Validato' ? (
                                            <div className="flex items-center gap-2 text-accent font-bold text-[10px] tracking-widest">
                                                <CheckCircle2 className="h-4 w-4" /> Validato
                                            </div>
                                        ) : doc.status === 'Da validare' ? (
                                            <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] tracking-widest animate-pulse">
                                                <Loader2 className="h-4 w-4 animate-spin" /> Da validare
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-widest italic">
                                                <XCircle className="h-4 w-4" /> Da caricare
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                        {doc.isTemplate && (
                                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shadow-sm" title="Richiede compilazione">
                                                <FilePenLine className="h-4 w-4" />
                                            </div>
                                        )}
                                        {doc.signature && (
                                            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shadow-sm" title="Richiede firma digitale">
                                                <FileSignature className="h-4 w-4" />
                                            </div>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-9 w-9 p-0 rounded-xl hover:bg-primary hover:text-white transition-all">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl">
                                                <DropdownMenuItem className="rounded-lg font-bold text-xs uppercase tracking-tight py-2.5">
                                                    Carica File
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg font-bold text-xs uppercase tracking-tight py-2.5 text-accent focus:bg-accent/10 focus:text-accent">
                                                    Valida Ora
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-50" />
                                                <DropdownMenuItem onClick={() => handleOpenNotes(doc)} className="rounded-lg font-bold text-xs uppercase tracking-tight py-2.5">
                                                    Aggiungi Nota
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filteredDocuments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-20 bg-slate-50/20">
                                    <div className="flex flex-col items-center gap-3">
                                        <Search className="h-10 w-10 text-slate-200" />
                                        <p className="text-[11px] font-bold tracking-widest text-slate-400">Nessun documento trovato per la ricerca</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Summary - Refined Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-2 bg-slate-50/50 rounded-2xl border border-border/40">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{filteredDocuments.length} DOCUMENTI TOTALI</span>
                <div className="flex gap-6">
                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                        {DOCUMENTS.filter(d => d.status === 'Validato').length} Validati
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-amber-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        {DOCUMENTS.filter(d => d.status === 'Da validare').length} In attesa
                    </span>
                </div>
            </div>

            <NotesSheet
                document={selectedDocForNotes}
                isOpen={isNotesOpen}
                onOpenChange={setIsNotesOpen}
            />
        </div>
    );
}
