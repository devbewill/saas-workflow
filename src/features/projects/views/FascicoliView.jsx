/**
 * FascicoliView - View for managing document bundles (Fascicoli)
 * Full implementation with side sheet editing
 */
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileStack, Send, MoreHorizontal, Edit, Trash2, FileSignature } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DOCUMENTS } from '@/data/mockData';
import { FascicoliSheet } from '@/components/sheets/FascicoliSheet';

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

    const getStatusBadge = (bundle) => {
        if (bundle.isSignatureEnabled) {
            return <Badge className="bg-primary/10 text-primary border-primary/20">Firma abilitata</Badge>;
        }
        return <Badge variant="outline" className="text-slate-600">In preparazione</Badge>;
    };

    return (
        <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileStack className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Fascicoli per Firma</h3>
                </div>
                <Button onClick={handleCreateFascicolo} className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20">
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
                    {bundles.map((bundle) => {
                        // Get document names for this bundle
                        const bundleDocs = DOCUMENTS.filter(doc => bundle.documentIds.includes(doc.id));

                        return (
                            <Card
                                key={bundle.id}
                                className={cn(
                                    "transition-all hover:shadow-md cursor-pointer rounded-2xl",
                                    bundle.isSignatureEnabled && "border-primary/20 bg-primary/5"
                                )}
                                onClick={() => handleEditFascicolo(bundle)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-sm text-primary tracking-tight">{bundle.name}</h4>
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

                                    {/* Document List */}
                                    {bundleDocs.length > 0 && (
                                        <div className="mb-3 space-y-1.5 border-t border-border pt-3">
                                            {bundleDocs.slice(0, 3).map(doc => (
                                                <div key={doc.id} className="flex items-center gap-2 text-xs text-slate-600">
                                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                                                    <span className="truncate">{doc.name}</span>
                                                </div>
                                            ))}
                                            {bundleDocs.length > 3 && (
                                                <p className="text-xs text-muted-foreground pl-3.5">
                                                    +{bundleDocs.length - 3} altri documenti
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        {getStatusBadge(bundle)}

                                        {bundle.isSignatureEnabled && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="rounded-lg border-primary/20 text-primary hover:bg-primary/10 transition-all font-bold"
                                                onClick={(e) => { e.stopPropagation(); handleSignFascicolo(bundle); }}
                                            >
                                                <Send className="h-3 w-3 mr-1" /> Invia
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )
            }

            {/* Edit/Create Sheet */}
            <FascicoliSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                editingFascicolo={editingFascicolo}
                formData={formData}
                setFormData={setFormData}
                handleSaveFascicolo={handleSaveFascicolo}
                handleDeleteFascicolo={handleDeleteFascicolo}
            />
        </div>
    );
}
