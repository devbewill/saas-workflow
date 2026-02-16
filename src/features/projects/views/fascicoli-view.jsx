import React, { useState } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { EmptyState } from '@/components/composed/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DOCUMENTS } from '@/data/documents';
import { FolderOpen, Plus, Edit, Trash2, PenTool, Save } from 'lucide-react';

const INITIAL_FASCICOLI = [
    { id: 1, name: 'Fascicolo Documentale Principale', status: 'Completo', documentIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], updated: '15/01/2026', isSignatureEnabled: true },
    { id: 2, name: 'Fascicolo AML', status: 'In lavorazione', documentIds: [10, 46, 47, 48], updated: '10/01/2026', isSignatureEnabled: false },
    { id: 3, name: 'Fascicolo Garanzie', status: 'Da completare', documentIds: [32, 33], updated: '05/01/2026', isSignatureEnabled: false },
];

const EMPTY_FORM = { name: '', status: 'Da completare', documentIds: [], isSignatureEnabled: false };

export default function FascicoliView() {
    const [fascicoli, setFascicoli] = useState(INITIAL_FASCICOLI);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editingFascicolo, setEditingFascicolo] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);

    const openNew = () => {
        setEditingFascicolo(null);
        setFormData(EMPTY_FORM);
        setSheetOpen(true);
    };

    const openEdit = (f) => {
        setEditingFascicolo(f);
        setFormData({ name: f.name, status: f.status, documentIds: [...f.documentIds], isSignatureEnabled: f.isSignatureEnabled });
        setSheetOpen(true);
    };

    const handleToggleDoc = (docId) => {
        setFormData((prev) => ({
            ...prev,
            documentIds: prev.documentIds.includes(docId)
                ? prev.documentIds.filter((id) => id !== docId)
                : [...prev.documentIds, docId],
        }));
    };

    const handleSave = () => {
        if (editingFascicolo) {
            setFascicoli((prev) =>
                prev.map((f) => f.id === editingFascicolo.id
                    ? { ...f, ...formData, docs: formData.documentIds.length, updated: new Date().toLocaleDateString('it-IT') }
                    : f
                )
            );
        } else {
            setFascicoli((prev) => [...prev, {
                id: Date.now(),
                ...formData,
                docs: formData.documentIds.length,
                updated: new Date().toLocaleDateString('it-IT'),
            }]);
        }
        setSheetOpen(false);
    };

    const handleDelete = (id) => {
        setFascicoli((prev) => prev.filter((f) => f.id !== id));
        setSheetOpen(false);
    };

    return (
        <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Fascicoli Documentali</h3>
                <Button className="gap-2" onClick={openNew}>
                    <Plus size={14} />
                    Nuovo Fascicolo
                </Button>
            </div>

            {fascicoli.length === 0 ? (
                <EmptyState icon={FolderOpen} title="Nessun fascicolo" description="Crea il primo fascicolo documentale per organizzare i documenti." />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fascicoli.map((f) => (
                        <SectionPanel
                            key={f.id}
                            title={f.name}
                            icon={FolderOpen}
                            actions={
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(f)}>
                                        <Edit size={14} />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)}>
                                        <Trash2 size={14} className="text-destructive" />
                                    </Button>
                                </div>
                            }
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Stato</span>
                                    <StatusBadge status={f.status}>{f.status}</StatusBadge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Documenti</span>
                                    <Badge variant="outline">{f.documentIds.length}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Aggiornato</span>
                                    <span className="text-sm text-muted-foreground">{f.updated}</span>
                                </div>
                                {f.isSignatureEnabled && (
                                    <div className="flex items-center gap-2 text-green-600 text-xs">
                                        <PenTool size={12} />
                                        Firma digitale richiesta
                                    </div>
                                )}
                            </div>
                        </SectionPanel>
                    ))}
                </div>
            )}

            {/* Fascicolo create/edit Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>{editingFascicolo ? 'Modifica fascicolo' : 'Nuovo fascicolo'}</SheetTitle>
                        <SheetDescription>
                            {editingFascicolo
                                ? 'Aggiorna i dettagli del raggruppamento.'
                                : 'Crea un nuovo raggruppamento di documenti per azioni massive.'}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto space-y-5 mt-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label>Nome Fascicolo</Label>
                            <Input
                                placeholder="Es. Documenti Amministratore"
                                value={formData.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label>Stato</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Completo">Completo</SelectItem>
                                    <SelectItem value="In lavorazione">In lavorazione</SelectItem>
                                    <SelectItem value="Da completare">Da completare</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Document selection */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Seleziona Documenti</Label>
                                <span className="text-xs text-muted-foreground">{formData.documentIds.length} selezionati</span>
                            </div>
                            <ScrollArea className="h-[320px] rounded-md border p-3">
                                <div className="space-y-1">
                                    {DOCUMENTS.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
                                        >
                                            <Checkbox
                                                id={`doc-${doc.id}`}
                                                checked={formData.documentIds.includes(doc.id)}
                                                onCheckedChange={() => handleToggleDoc(doc.id)}
                                                className="mt-0.5"
                                            />
                                            <label htmlFor={`doc-${doc.id}`} className="text-xs leading-snug cursor-pointer">
                                                {doc.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Digital signature switch */}
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <Label htmlFor="sig-switch">Abilita Firma Digitale</Label>
                                <p className="text-xs text-muted-foreground">
                                    Richiedi firma massiva per i documenti in questo fascicolo.
                                </p>
                            </div>
                            <Switch
                                id="sig-switch"
                                checked={formData.isSignatureEnabled}
                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isSignatureEnabled: checked }))}
                            />
                        </div>
                    </div>

                    <SheetFooter className="mt-6">
                        <div className="flex flex-col gap-3 w-full">
                            <Button className="w-full gap-2" onClick={handleSave}>
                                <Save size={14} />
                                Salva Fascicolo
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => setSheetOpen(false)}>
                                Annulla
                            </Button>
                            {editingFascicolo && (
                                <Button variant="destructive" className="w-full gap-2" onClick={() => handleDelete(editingFascicolo.id)}>
                                    <Trash2 size={14} />
                                    Elimina
                                </Button>
                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
