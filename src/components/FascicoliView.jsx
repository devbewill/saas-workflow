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
    { id: 1, name: 'Documenti Amministratore', documentIds: [46, 47, 51], isSignatureEnabled: true, signatureStatus: 'da_firmare', updatedAt: '04/02/2026', docCount: 3 },
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
            signatureStatus: formData.isSignatureEnabled ? (editingFascicolo?.signatureStatus || 'da_firmare') : null,
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
        setBundles(prev => prev.map(b => b.id === bundle.id ? { ...b, signatureStatus: 'firmato' } : b));
    };

    const getSignatureStatusBadge = (status) => {
        switch (status) {
            case 'firmato':
                return (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200/60 text-[10px] font-bold tracking-tight py-0.5 px-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5" />
                        Firmato
                    </Badge>
                );
            case 'da_firmare':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200/60 text-[10px] font-bold tracking-tight py-0.5 px-2">
                        <div className="w-1 h-1 rounded-full bg-amber-500 mr-1.5" />
                        Da firmare
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-none shadow-xl shadow-black/[0.02] overflow-hidden">
                <CardHeader className="flex flex-row justify-between items-center bg-slate-50/50 border-b border-border/40 px-6 py-4">
                    <CardTitle className="text-sm font-bold tracking-widest text-primary uppercase">Fascicoli</CardTitle>
                    <Button
                        onClick={() => setIsSheetOpen(true)}
                    >
                        <Plus className="h-3 w-3 mr-1" /> Nuovo fascicolo
                    </Button>
                </CardHeader>
                {/* Header with Create Button */}
                <div className=" p-6">
                    <div className="">
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
                                    const bundleDocs = DOCUMENTS.filter(doc => bundle.documentIds.includes(doc.id));
                                    const isSignature = bundle.isSignatureEnabled;

                                    return (
                                        <Card
                                            key={bundle.id}
                                            className={cn(
                                                "group relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-2xl overflow-hidden bg-white",
                                                "border-2 border-primary/20 hover:border-primary transition-colors"
                                            )}
                                            onClick={() => handleEditFascicolo(bundle)}
                                        >
                                            <CardContent className="p-5">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex gap-4">
                                                        <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                                                            {isSignature ? <FileSignature size={24} strokeWidth={2.5} /> : <FileStack size={24} strokeWidth={2.5} />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-extrabold text-[14px] text-primary tracking-tight truncate leading-tight">
                                                                    {bundle.name}
                                                                </h4>
                                                                {isSignature && getSignatureStatusBadge(bundle.signatureStatus)}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1.5">
                                                                <div className="px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10">
                                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
                                                                        {bundle.docCount} docs
                                                                    </span>
                                                                </div>
                                                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                                <span className="text-[10px] text-slate-400 font-medium leading-none">
                                                                    Aggiornato {bundle.updatedAt}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/5">
                                                                <MoreHorizontal className="h-4 w-4 text-primary/40" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="rounded-xl p-1 shadow-xl border-border/40">
                                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditFascicolo(bundle); }}>
                                                                <Edit className="h-4 w-4 mr-2" /> Modifica
                                                            </DropdownMenuItem>
                                                            {isSignature && (
                                                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleSignFascicolo(bundle); }}>
                                                                    <Send className="h-4 w-4 mr-2" /> Invia in Firma
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteFascicolo(bundle.id); }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" /> Elimina
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                {/* Document Preview List - Elegant Blue Tint */}
                                                <div className="mb-5 space-y-2.5 bg-primary/[0.01] rounded-2xl p-4 border border-primary/[0.03]">
                                                    {bundleDocs.length > 0 ? (
                                                        <>
                                                            {bundleDocs.slice(0, 2).map(doc => (
                                                                <div key={doc.id} className="flex items-center gap-2.5 text-[11px] text-slate-600 font-medium">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                                                                    <span className="truncate group-hover:text-primary transition-colors">{doc.name}</span>
                                                                </div>
                                                            ))}
                                                            {bundleDocs.length > 2 && (
                                                                <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest pl-4">
                                                                    +{bundleDocs.length - 2} altri documenti
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p className="text-[11px] text-slate-400 italic text-center py-1">Nessun documento aggiunto</p>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-end pt-1">
                                                    {isSignature && bundle.signatureStatus === 'da_firmare' && (
                                                        <Button
                                                            size="sm"
                                                            className="h-9 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all font-bold text-[11px] px-5 shadow-lg shadow-primary/20 active:scale-95 border-none"
                                                            onClick={(e) => { e.stopPropagation(); handleSignFascicolo(bundle); }}
                                                        >
                                                            <Send className="h-3.5 w-3.5 mr-2" /> Invia ora
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
                    </div>
                </div>
            </Card>



            <FascicoliSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                editingFascicolo={editingFascicolo}
                formData={formData}
                setFormData={setFormData}
                handleSaveFascicolo={handleSaveFascicolo}
                handleDeleteFascicolo={handleDeleteFascicolo}
            />
        </div >
    );
}
