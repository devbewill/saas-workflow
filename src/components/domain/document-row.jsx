import React from 'react';
import { FileText, MoreVertical, ShieldCheck, Download, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DocumentRow({ doc, onDownload, onDelete }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Caricato': return 'default'; // primary
      case 'Da caricare': return 'destructive';
      case 'In attesa': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-lg">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-medium text-sm text-foreground">{doc.name}</h4>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge>
             <span className="text-xs text-muted-foreground">{doc.date || '--'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {doc.isSigned && (
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
               <ShieldCheck className="w-3 h-3 mr-1" /> Firmato
            </Badge>
        )}
        <Button variant="ghost" size="icon" onClick={() => onDownload?.(doc)}>
           <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete?.(doc)}>
           <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
