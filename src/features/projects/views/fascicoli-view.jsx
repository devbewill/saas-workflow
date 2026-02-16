import React, { useState } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatusBadge } from '@/components/composed/status-badge';
import { EmptyState } from '@/components/composed/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderOpen, Plus, Edit, Trash2, PenTool } from 'lucide-react';

const INITIAL_FASCICOLI = [
    { id: 1, name: 'Fascicolo Documentale Principale', status: 'Completo', docs: 12, updated: '15/01/2026', isSigned: true },
    { id: 2, name: 'Fascicolo AML', status: 'In lavorazione', docs: 4, updated: '10/01/2026', isSigned: false },
    { id: 3, name: 'Fascicolo Garanzie', status: 'Da completare', docs: 2, updated: '05/01/2026', isSigned: false },
];

export default function FascicoliView() {
    const [fascicoli, setFascicoli] = useState(INITIAL_FASCICOLI);
    const [editingId, setEditingId] = useState(null);

    const handleDelete = (id) => setFascicoli((prev) => prev.filter((f) => f.id !== id));

    return (
        <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Fascicoli Documentali</h3>
                <Button className="gap-2">
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
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => setEditingId(f.id)}>
                                                <Edit size={14} />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Modifica Fascicolo</SheetTitle>
                                                <SheetDescription>{f.name}</SheetDescription>
                                            </SheetHeader>
                                            <div className="mt-6 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Nome</Label>
                                                    <Input defaultValue={f.name} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Stato</Label>
                                                    <Select defaultValue={f.status}>
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
                                                <Button className="w-full">Salva Modifiche</Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
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
                                    <Badge variant="outline">{f.docs}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Aggiornato</span>
                                    <span className="text-sm text-muted-foreground">{f.updated}</span>
                                </div>
                                {f.isSigned && (
                                    <div className="flex items-center gap-2 text-green-600 text-xs">
                                        <PenTool size={12} />
                                        Firmato digitalmente
                                    </div>
                                )}
                            </div>
                        </SectionPanel>
                    ))}
                </div>
            )}
        </div>
    );
}
