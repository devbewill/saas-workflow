import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // You might need to create this if not using default html input
import { Label } from '@/components/ui/label'; // You might need to create this
import { Checkbox } from '@/components/ui/checkbox'; // You might need to create this
import { ScrollArea } from '@/components/ui/scroll-area'; // You might need to create this
import { FileText, Save, Trash2, X } from 'lucide-react';

export function AtomicFascicoloSheet({ isOpen, onClose, initialData, availableDocuments, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: '',
    documentIds: [],
    isSignatureEnabled: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        documentIds: initialData.documentIds || [],
        isSignatureEnabled: initialData.isSignatureEnabled || false
      });
    } else {
      setFormData({
        name: '',
        documentIds: [],
        isSignatureEnabled: false
      });
    }
  }, [initialData, isOpen]);

  const handleToggleDoc = (docId) => {
    setFormData(prev => ({
      ...prev,
      documentIds: prev.documentIds.includes(docId)
        ? prev.documentIds.filter(id => id !== docId)
        : [...prev.documentIds, docId]
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    const bundle = {
      id: initialData?.id || Date.now(),
      ...formData,
      updatedAt: new Date().toLocaleDateString('it-IT')
    };

    onSave(bundle);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{initialData ? 'Modifica Fascicolo' : 'Nuovo Fascicolo'}</SheetTitle>
          <SheetDescription>
            {initialData ? 'Aggiorna i dettagli del raggruppamento.' : 'Crea un nuovo raggruppamento di documenti per azioni massive.'}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Nome Fascicolo
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Es. Documenti Amministratore"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-4">
             <label className="text-sm font-medium leading-none">Seleziona Documenti</label>
             <div className="border rounded-md h-[400px] overflow-y-auto p-4 space-y-2">
                {availableDocuments.map(doc => (
                   <div key={doc.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        checked={formData.documentIds.includes(doc.id)}
                        onChange={() => handleToggleDoc(doc.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                         <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                <label htmlFor="sig-check" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Abilita Firma Digitale
                </label>
                <p className="text-xs text-muted-foreground">
                  Richiedi firma massiva per i documenti in questo fascicolo.
                </p>
              </div>
            </div>
        </div>

        <SheetFooter className="flex-col sm:justify-between sm:flex-row gap-2">
            {initialData && (
              <Button variant="destructive" onClick={() => { onDelete(initialData.id); onClose(); }}>
                <Trash2 className="mr-2 h-4 w-4" /> Elimina
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Annulla</Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Salva Fascicolo
              </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
