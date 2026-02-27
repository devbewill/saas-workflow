import React, { useState, useMemo } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { SearchInput } from '@/components/composed/search-input';
import { StatusBadge } from '@/components/composed/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DOCUMENTS } from '@/data/documents';
import { FileText, PenTool, MessageSquare, Upload, CheckCircle2, Circle, Globe, Lock, Building2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Document Note Sheet with public/private and internal/external switches ---
function DocumentNoteSheet({ doc }) {
    const [noteText, setNoteText] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isInternal, setIsInternal] = useState(true);
    const [notes, setNotes] = useState(
        doc.notesCount > 0
            ? [{ id: 1, text: 'Documento verificato e conforme.', author: 'Marco Bianchi', date: '10/01/2026 11:00', isPublic: true, isInternal: true }]
            : []
    );

    const handleAdd = () => {
        if (!noteText.trim()) return;
        setNotes((prev) => [
            { id: Date.now(), text: noteText, author: 'Stefano Perelli', date: new Date().toLocaleString('it-IT'), isPublic, isInternal },
            ...prev,
        ]);
        setNoteText('');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare size={12} />
                    {notes.length > 0 ? notes.length : '+'}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Note — {doc.name}</SheetTitle>
                    <SheetDescription>Aggiungi o consulta le note relative al documento</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                    {/* Note input */}
                    <Textarea
                        placeholder="Scrivi una nota..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows={3}
                    />

                    {/* Switches card */}
                    <div className="rounded-md border bg-muted/30 p-3 space-y-3">
                        {/* Switch 1 — Pubblica / Privata */}
                        <div className="flex items-start gap-3">
                            <Switch
                                id={`doc-note-vis-${doc.id}`}
                                checked={isPublic}
                                onCheckedChange={setIsPublic}
                                className="mt-0.5 shrink-0"
                            />
                            <div className="space-y-0.5">
                                <Label htmlFor={`doc-note-vis-${doc.id}`} className="text-xs font-medium cursor-pointer flex items-center gap-1.5">
                                    {isPublic ? <Globe size={12} /> : <Lock size={12} />}
                                    {isPublic ? 'Pubblica' : 'Privata'}
                                </Label>
                                <p className="text-xs text-muted-foreground leading-tight">
                                    {isPublic
                                        ? 'La nota è condivisa in tutte le applicazioni che condividono questo documento.'
                                        : "La nota è visibile solo nell'applicazione in cui viene creata."}
                                </p>
                            </div>
                        </div>
                        {/* Divider */}
                        <div className="border-t" />
                        {/* Switch 2 — Interna / Esterna */}
                        <div className="flex items-start gap-3">
                            <Switch
                                id={`doc-note-aud-${doc.id}`}
                                checked={isInternal}
                                onCheckedChange={setIsInternal}
                                className="mt-0.5 shrink-0"
                            />
                            <div className="space-y-0.5">
                                <Label htmlFor={`doc-note-aud-${doc.id}`} className="text-xs font-medium cursor-pointer flex items-center gap-1.5">
                                    {isInternal ? <Building2 size={12} /> : <Users size={12} />}
                                    {isInternal ? 'Interna' : 'Esterna'}
                                </Label>
                                <p className="text-xs text-muted-foreground leading-tight">
                                    {isInternal
                                        ? "La nota è visibile solo alle persone interne all'azienda."
                                        : "La nota è visibile anche agli utenti esterni all'azienda."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleAdd} disabled={!noteText.trim()} size="sm">
                            Aggiungi nota
                        </Button>
                    </div>

                    {/* Notes list */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {notes.length === 0 ? (
                            <p className="text-xs text-muted-foreground text-center py-6">Nessuna nota presente. Aggiungi la prima nota.</p>
                        ) : (
                            notes.map((note) => (
                                <div key={note.id} className="rounded-lg border p-3 space-y-1">
                                    <p className="text-sm">{note.text}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {note.author} · {note.date}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                {note.isPublic ? <Globe size={10} /> : <Lock size={10} />}
                                                {note.isPublic ? 'Pubblica' : 'Privata'}
                                            </span>
                                            <span>·</span>
                                            <span className="flex items-center gap-1">
                                                {note.isInternal ? <Building2 size={10} /> : <Users size={10} />}
                                                {note.isInternal ? 'Interna' : 'Esterna'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default function DocumentsView() {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState(null);

    const categories = useMemo(() => [...new Set(DOCUMENTS.map((d) => d.category))], []);

    const filtered = useMemo(() => {
        return DOCUMENTS.filter((d) => {
            const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
            const matchCat = !filterCategory || d.category === filterCategory;
            return matchSearch && matchCat;
        });
    }, [search, filterCategory]);

    const uploadedCount = filtered.filter((d) => d.file !== '--').length;
    const pendingCount = filtered.filter((d) => d.file === '--').length;

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
                <div className="flex gap-2 items-center">
                    {filterCategory && (
                        <Button variant="ghost" size="sm" onClick={() => setFilterCategory(null)}>
                            Rimuovi filtro
                        </Button>
                    )}
                    <Badge variant="outline" className="gap-1.5">
                        <CheckCircle2 size={12} className="text-green-600" />
                        {uploadedCount} caricati
                    </Badge>
                    <Badge variant="outline" className="gap-1.5">
                        <Circle size={12} className="text-muted-foreground" />
                        {pendingCount} da caricare
                    </Badge>
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
                            <TableHead className="w-10"></TableHead>
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
                        {filtered.map((doc) => {
                            const isUploaded = doc.file !== '--';
                            return (
                                <TableRow
                                    key={doc.id}
                                    className={cn(!isUploaded && 'opacity-50')}
                                >
                                    <TableCell>
                                        {isUploaded ? (
                                            <CheckCircle2 size={16} className="text-green-600" />
                                        ) : (
                                            <Circle size={16} className="text-muted-foreground" />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{doc.id}</TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">{doc.name}</TableCell>
                                    <TableCell><Badge variant="outline">{doc.category}</Badge></TableCell>
                                    <TableCell>
                                        {!isUploaded ? (
                                            <Button variant="outline" size="sm" className="gap-1 text-xs">
                                                <Upload size={12} />
                                                Carica
                                            </Button>
                                        ) : (
                                            <span className="text-sm text-primary cursor-pointer hover:underline">{doc.file}</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{doc.date}</TableCell>
                                    <TableCell><StatusBadge status={doc.status} /></TableCell>
                                    <TableCell>
                                        {doc.signature && (
                                            <PenTool size={14} className={doc.isSigned ? 'text-green-600' : 'text-muted-foreground'} />
                                        )}
                                    </TableCell>
                                    {/* Notes — always show CTA */}
                                    <TableCell>
                                        <DocumentNoteSheet doc={doc} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </SectionPanel>
        </div>
    );
}
