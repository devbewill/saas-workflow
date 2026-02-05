import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Edit, Trash2, FileText, PenTool } from 'lucide-react';

export function AtomicBundleCard({ bundle, documents, onEdit, onDelete, onSign }) {
  // Logic for signature status
  const isSigEnabled = bundle.isSignatureEnabled;
  const bundleDocs = documents.filter(d => bundle.documentIds.includes(d.id));

  // If no docs, status is ambiguous, but technically "nothing to sign".
  // If signature enabled, check if all are signed.
  const allSigned = bundleDocs.length > 0 && bundleDocs.every(d => d.isSigned);
  const someSigned = bundleDocs.some(d => d.isSigned);

  let statusBadge;
  if (!isSigEnabled) {
      statusBadge = <Badge variant="secondary" className="font-normal text-slate-500">Firma non richiesta</Badge>;
  } else if (bundleDocs.length === 0) {
       statusBadge = <Badge variant="outline" className="text-slate-400 border-slate-200">Vuoto</Badge>;
  } else if (allSigned) {
      statusBadge = <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">Firmato</Badge>;
  } else {
      // If none or some signed, but not all -> To Sign
      statusBadge = <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 border-transparent">Da firmare</Badge>;
  }

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b bg-slate-50/50">
         <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white border rounded-xl text-primary shadow-sm">
                    <FolderOpen size={20} />
                </div>
                <div>
                    <CardTitle className="text-base font-semibold leading-none">{bundle.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1.5">{bundleDocs.length} documenti</p>
                </div>
            </div>
            {statusBadge}
         </div>
      </CardHeader>

      <CardContent className="flex-1 py-4">
         <div className="space-y-3">
            <div className="flex items-center justify-between">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contenuto Fascicolo</p>
            </div>

            {bundleDocs.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-lg">
                    <p className="text-sm text-slate-400">Nessun documento inserito.</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {bundleDocs.map(doc => (
                        <li key={doc.id} className="group flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                            <FileText size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="truncate flex-1 text-slate-700 font-medium">{doc.name}</span>
                            {isSigEnabled && (
                                doc.isSigned
                                ? <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600" title="Firmato"><PenTool size={10} /></div>
                                : <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600" title="Da firmare"></div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
         </div>
      </CardContent>

      <CardFooter className="pt-3 pb-3 px-4 border-t flex items-center gap-2 bg-slate-50/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                if(window.confirm('Eliminare il fascicolo?')) onDelete(bundle.id)
            }}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 -ml-2"
          >
              <Trash2 size={16} className="mr-2" /> Elimina
          </Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={() => onEdit(bundle)} className="bg-white hover:bg-slate-50">
              <Edit size={16} className="mr-2" /> Gestisci
          </Button>
          {isSigEnabled && !allSigned && (
             <Button size="sm" onClick={() => onSign && onSign(bundle)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20">
                <PenTool size={16} className="mr-2" /> Manda in Firma
             </Button>
          )}
      </CardFooter>
    </Card>
  )
}
