import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { DOCUMENTS } from '@/data/mockData';

export function FascicoliSheet({
    isOpen,
    onOpenChange,
    editingFascicolo,
    formData,
    setFormData,
    handleSaveFascicolo,
    handleDeleteFascicolo
}) {
    const handleToggleDoc = (docId) => {
        setFormData(prev => ({
            ...prev,
            documentIds: prev.documentIds.includes(docId)
                ? prev.documentIds.filter(id => id !== docId)
                : [...prev.documentIds, docId]
        }));
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col h-full p-0 sm:max-w-md bg-white/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
                <div className="flex-1 overflow-y-auto">
                    <div className="px-8 py-2 border-b border-border/40">
                        <SheetHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-6 w-1 bg-accent rounded-full"></div>
                                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Gestione Documentale</span>
                            </div>
                            <SheetTitle className="text-2xl font-bold tracking-tight text-primary">
                                {editingFascicolo ? 'Modifica fascicolo' : 'Nuovo fascicolo'}
                            </SheetTitle>
                            <SheetDescription className="font-medium text-slate-500">
                                {editingFascicolo ? 'Aggiorna i dettagli del raggruppamento.' : 'Crea un nuovo raggruppamento di documenti per azioni massive.'}
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <div className="space-y-2 px-8 py-2">
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
                            <div className="border border-border/60 rounded-lg h-[400px] overflow-y-auto p-4 space-y-2 bg-white">
                                {DOCUMENTS.map(doc => (
                                    <div key={doc.id} className="flex items-center space-x-3 p-0 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-border/40">
                                        <input
                                            type="checkbox"
                                            className=" h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                                            checked={formData.documentIds.includes(doc.id)}
                                            onChange={() => handleToggleDoc(doc.id)}
                                        />
                                        <div className="grid gap-1 leading-none">
                                            <label className="text-xs font-medium leading-none cursor-pointer">
                                                {doc.name}
                                            </label>
                                            {/* <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                                Stato: {doc.status}
                                            </p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 rounded-xl p-4 border border-border/40">
                            <input
                                type="checkbox"
                                id="sig-check"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                checked={formData.isSignatureEnabled}
                                onChange={(e) => setFormData(prev => ({ ...prev, isSignatureEnabled: e.target.checked }))}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor="sig-check" className="text-sm font-medium leading-none cursor-pointer">
                                    Abilita Firma Digitale
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    Richiedi firma massiva per i documenti in questo fascicolo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="px-8 pt-2 pb-8 border-t border-border/40">
                    <div className="flex flex-col gap-3 w-full">
                        <Button className="w-full" onClick={handleSaveFascicolo}>
                            <Save className="mr-2 h-4 w-4" /> Salva Fascicolo
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>Annulla</Button>
                        {editingFascicolo && (
                            <Button variant="destructive" className="w-full" onClick={() => { handleDeleteFascicolo(editingFascicolo.id); onOpenChange(false); }}>
                                <Trash2 className="mr-2 h-4 w-4" /> Elimina
                            </Button>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
