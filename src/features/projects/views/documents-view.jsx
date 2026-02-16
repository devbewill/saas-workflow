import React, { useState, useMemo } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { DOCUMENTS } from '@/data/documents';
import { FileText, PenTool, MessageSquare, Upload, Filter } from 'lucide-react';

export default function DocumentsView() {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState(null);
    const [notesDocId, setNotesDocId] = useState(null);

    const categories = useMemo(() => [...new Set(DOCUMENTS.map((d) => d.category))], []);

    const filtered = useMemo(() => {
        return DOCUMENTS.filter((d) => {
            const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
            const matchCat = !filterCategory || d.category === filterCategory;
            return matchSearch && matchCat;
        });
    }, [search, filterCategory]);

    return (
        <div className="space-y-4 pt-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4">
                <SearchInput
                    placeholder="Cerca documento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    {filterCategory && (
                        <Button variant="ghost" size="sm" onClick={() => setFilterCategory(null)}>
                            Rimuovi filtro
                        </Button>
                    )}
                    <Badge variant="outline">{filtered.length} di {DOCUMENTS.length} documenti</Badge>
                </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={filterCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Documents table */}
            <SectionPanel title="Elenco Documenti" icon={FileText} description={`Categoria: ${filterCategory || 'Tutte'}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Documento</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Firma</TableHead>
                            <TableHead className="w-12">Note</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="text-muted-foreground">{doc.id}</TableCell>
                                <TableCell className="font-medium max-w-xs truncate">{doc.name}</TableCell>
                                <TableCell><Badge variant="outline">{doc.category}</Badge></TableCell>
                                <TableCell>
                                    {doc.file === '--' ? (
                                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                            <Upload size={12} />
                                            Carica
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-accent cursor-pointer hover:underline">{doc.file}</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{doc.date}</TableCell>
                                <TableCell><StatusBadge status={doc.status} /></TableCell>
                                <TableCell>
                                    {doc.signature && (
                                        <PenTool size={14} className={doc.isSigned ? 'text-green-600' : 'text-muted-foreground'} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {doc.notesCount > 0 && (
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="ghost" size="sm" className="gap-1">
                                                    <MessageSquare size={12} />
                                                    {doc.notesCount}
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Note — {doc.name}</SheetTitle>
                                                    <SheetDescription>Note relative al documento</SheetDescription>
                                                </SheetHeader>
                                                <div className="mt-4 space-y-4">
                                                    <Textarea placeholder="Scrivi una nota..." />
                                                    <Button size="sm">Aggiungi nota</Button>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionPanel>
        </div>
    );
}
