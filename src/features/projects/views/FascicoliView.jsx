/**
 * FascicoliView - View for managing document bundles (Fascicoli)
 * Full implementation with side sheet editing
 */
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Plus, FileStack, Send, MoreHorizontal, Edit, Trash2, Save, FileSignature } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DOCUMENTS } from '@/data/mockData';

// Initial bundles data
const INITIAL_BUNDLES = [
    { id: 1, name: 'Documenti Amministratore', documentIds: [46, 47, 51], isSignatureEnabled: true, updatedAt: '04/02/2026', docCount: 3 },
    { id: 2, name: 'Privacy e GDPR', documentIds: [12, 13], isSignatureEnabled: false, updatedAt: '04/02/2026', docCount: 2 }
];

export default function FascicoliView({ project }) {
    const [bundles, setBundles] = useState(INITIAL_BUNDLES);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingFascicolo, setEditingFascicolo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        documentIds: [],
        isSignatureEnabled: false
    });

    const handleCreateFascicolo = () => {
        setEditingFascicolo(null);
        setFormData({
            name: '',
            documentIds: [],
            isSignatureEnabled: false
        });
        setIsSheetOpen(true);
    };

    const handleEditFascicolo = (bundle) => {
        setEditingFascicolo(bundle);
        setFormData({
            name: bundle.name,
            documentIds: bundle.documentIds || [],
            isSignatureEnabled: bundle.isSignatureEnabled || false
        });
        setIsSheetOpen(true);
    };

    const handleSaveFascicolo = () => {
        if (!formData.name.trim()) return;

        const bundle = {
            id: editingFascicolo?.id || Date.now(),
            ...formData,
            docCount: formData.documentIds.length,
            updatedAt: new Date().toLocaleDateString('it-IT')
        };

        setBundles(prev => {
            const exists = prev.find(b => b.id === bundle.id);
            if (exists) return prev.map(b => b.id === bundle.id ? bundle : b);
            return [...prev, bundle];
        });

        setIsSheetOpen(false);
    };

    const handleDeleteFascicolo = (id) => {
        setBundles(prev => prev.filter(b => b.id !== id));
    };

    const handleSignFascicolo = (bundle) => {
        alert(`Avvio procedura firma per il fascicolo: ${bundle.name}`);
    };

    const handleToggleDoc = (docId) => {
        setFormData(prev => ({
            ...prev,
            documentIds: prev.documentIds.includes(docId)
                ? prev.documentIds.filter(id => id !== docId)
                : [...prev.documentIds, docId]
        }));
    };

    const getStatusBadge = (bundle) => {
        if (bundle.isSignatureEnabled) {
            return <Badge className="bg-violet-100 text-violet-800 border-violet-200">Firma abilitata</Badge>;
        }
        return <Badge variant="outline" className="text-slate-600">In preparazione</Badge>;
    };

    return (
        <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileStack className="h-5 w-5 text-violet-600" />
                    <h3 className="text-lg font-semibold">Fascicoli per Firma</h3>
                </div>
                <Button onClick={handleCreateFascicolo}>
                    <Plus className="h-4 w-4 mr-2" /> Nuovo Fascicolo
                </Button>
            </div>

            {/* Bundles Grid */}
            {bundles.length === 0 ? (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center text-muted-foreground">
                            <FileStack className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p className="font-medium">Nessun fascicolo creato</p>
                            <p className="text-sm mt-1">Crea un fascicolo per raggruppare documenti da inviare in firma</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bundles.map((bundle) => (
                        <Card
                            key={bundle.id}
                            className={cn(
                                "transition-all hover:shadow-md cursor-pointer",
                                bundle.isSignatureEnabled && "border-violet-200 bg-violet-50/30"
                            )}
                            onClick={() => handleEditFascicolo(bundle)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-sm">{bundle.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {bundle.docCount} documenti • Aggiornato {bundle.updatedAt}
                                        </p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditFascicolo(bundle); }}>
                                                <Edit className="h-4 w-4 mr-2" /> Modifica
                                            </DropdownMenuItem>
                                            {bundle.isSignatureEnabled && (
                                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleSignFascicolo(bundle); }}>
                                                    <FileSignature className="h-4 w-4 mr-2" /> Invia in Firma
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={(e) => { e.stopPropagation(); handleDeleteFascicolo(bundle.id); }}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" /> Elimina
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center justify-between">
                                    {getStatusBadge(bundle)}

                                    {bundle.isSignatureEnabled && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => { e.stopPropagation(); handleSignFascicolo(bundle); }}
                                        >
                                            <Send className="h-3 w-3 mr-1" /> Invia
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit/Create Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>{editingFascicolo ? 'Modifica Fascicolo' : 'Nuovo Fascicolo'}</SheetTitle>
                        <SheetDescription>
                            {editingFascicolo ? 'Aggiorna i dettagli del raggruppamento.' : 'Crea un nuovo raggruppamento di documenti per azioni massive.'}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6 py-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Nome Fascicolo
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Es. Documenti Amministratore"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium leading-none">Seleziona Documenti</label>
                            <div className="border rounded-md h-[400px] overflow-y-auto p-4 space-y-2">
                                {DOCUMENTS.map(doc => (
                                    <div key={doc.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors">
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            checked={formData.documentIds.includes(doc.id)}
                                            onChange={() => handleToggleDoc(doc.id)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label className="text-sm font-medium leading-none">
                                                {doc.name}
                                            </label>
                                            <p className="text-xs text-muted-foreground">
                                                Stato: {doc.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="sig-check"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={formData.isSignatureEnabled}
                                onChange={(e) => setFormData(prev => ({ ...prev, isSignatureEnabled: e.target.checked }))}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor="sig-check" className="text-sm font-medium leading-none">
                                    Abilita Firma Digitale
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    Richiedi firma massiva per i documenti in questo fascicolo.
                                </p>
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="flex-col sm:justify-between sm:flex-row gap-2">
                        {editingFascicolo && (
                            <Button variant="destructive" onClick={() => { handleDeleteFascicolo(editingFascicolo.id); setIsSheetOpen(false); }}>
                                <Trash2 className="mr-2 h-4 w-4" /> Elimina
                            </Button>
                        )}
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>Annulla</Button>
                            <Button onClick={handleSaveFascicolo}>
                                <Save className="mr-2 h-4 w-4" /> Salva Fascicolo
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
