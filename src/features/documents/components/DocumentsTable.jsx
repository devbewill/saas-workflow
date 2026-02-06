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
    XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DocumentsTable({ projectId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

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

    return (
        <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                        placeholder="Cerca documento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {categories.slice(0, 5).map(cat => (
                        <Button
                            key={cat}
                            variant={categoryFilter === cat ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCategoryFilter(cat)}
                            className="text-xs"
                        >
                            {cat === 'all' ? 'Tutti' : cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Documents Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-[400px]">Documento</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(groupedDocuments).map(([category, docs]) => (
                            <React.Fragment key={category}>
                                {/* Category Header Row */}
                                <TableRow className="bg-slate-100/50">
                                    <TableCell colSpan={4} className="py-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                                            {category}
                                        </span>
                                        <Badge variant="outline" className="ml-2 text-[10px]">
                                            {docs.length} documenti
                                        </Badge>
                                    </TableCell>
                                </TableRow>

                                {/* Document Rows */}
                                {docs.map(doc => (
                                    <TableRow key={doc.id} className="hover:bg-blue-50/30">
                                        <TableCell>
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "mt-0.5 p-1.5 rounded-md border",
                                                    doc.status === "Da caricare"
                                                        ? "bg-gray-50 border-dashed border-gray-300 text-gray-400"
                                                        : "bg-blue-50 border-blue-100 text-blue-600"
                                                )}>
                                                    {doc.status === "Da caricare" ? (
                                                        <CloudUpload className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate">{doc.name}</p>
                                                    {doc.file !== '--' && (
                                                        <p className="text-xs text-slate-500 mt-0.5">{doc.file}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-slate-500">{doc.date}</span>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {doc.isTemplate && (
                                                    <div className="p-1 rounded-md bg-indigo-50 text-indigo-600" title="Richiede compilazione">
                                                        <FilePenLine className="h-4 w-4" />
                                                    </div>
                                                )}
                                                {doc.signature && (
                                                    <div className="p-1 rounded-md bg-amber-50 text-amber-600" title="Richiede firma digitale">
                                                        <FileSignature className="h-4 w-4" />
                                                    </div>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Carica</DropdownMenuItem>
                                                        <DropdownMenuItem>Valida</DropdownMenuItem>
                                                        <DropdownMenuItem>Sostituisci</DropdownMenuItem>
                                                        <DropdownMenuItem>Aggiungi nota</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}

                        {filteredDocuments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Nessun documento trovato
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center text-sm text-slate-500">
                <span>{filteredDocuments.length} documenti visualizzati</span>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {DOCUMENTS.filter(d => d.status === 'Validato').length} validati
                    </span>
                    <span className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-amber-600" />
                        {DOCUMENTS.filter(d => d.status === 'Da validare').length} da validare
                    </span>
                </div>
            </div>
        </div>
    );
}
