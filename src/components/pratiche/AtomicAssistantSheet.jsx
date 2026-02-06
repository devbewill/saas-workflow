import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Info, AlertTriangle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWorkflowEngine } from '@/hooks/use-workflow-engine';


// State-specific configurations (Copied from OperatorAssistant.jsx)
const STATE_CONFIGS = {
  "Aperta - Validazione documenti": {
    title: "Verifica Documentale",
    description: "Analizza attentamente tutti i documenti caricati e procedi con la validazione.",
    requirements: [
      { id: 'privacy', label: 'Validità documenti privacy', checked: true },
      { id: 'verbali', label: 'Coerenza date verbali', checked: false }
    ],
    warning: {
      type: 'info',
      title: 'PROMEMORIA',
      message: 'Ricorda che il documento x deve contenere necessariamente....'
    },
    proceedLabel: 'Ho verificato i documenti'
  },
  "Caricata - Lavorazione AML e Banche Dati": {
    title: "Controllo AML e Banche Dati",
    description: "Esegui le verifiche AML (Anti-Money Laundering) e controlla le banche dati per valutare il profilo di rischio del cliente.",
    requirements: [
      { id: 'hawk', label: 'Documento HAWK caricato', checked: false },
      { id: 'db', label: 'Esito banche dati caricato', checked: true },
      { id: 'aml', label: 'Esito AML selezionato', checked: true }
    ],
    warning: {
      type: 'warning',
      title: 'ATTENZIONE',
      message: 'In caso di esito "Arancione - Forzante" è necessaria una verifica rafforzata prima di procedere.'
    },
    proceedLabel: 'Controlli completati'
  },
  "Bozza": {
    title: "Creazione Pratica",
    description: "Inserisci i dati preliminari della pratica e verifica che tutte le informazioni di base siano corrette.",
    requirements: [
      { id: 'dati', label: 'Dati anagrafici completi', checked: true },
      { id: 'importo', label: 'Importo finanziamento inserito', checked: true }
    ],
    warning: null,
    proceedLabel: 'Apri la pratica'
  }
};

export function AtomicAssistantSheet({ isOpen, onOpenChange, currentStepName }) {
  const config = STATE_CONFIGS[currentStepName] || STATE_CONFIGS["Bozza"];

  // Check if configuration exists before accessing properties
  const requirements = config?.requirements || [];
  const allRequirementsMet = requirements.every(req => req.checked);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Supporto operatore</SheetTitle>
          <SheetDescription>Supporto guidato per la lavorazione.</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">

          {/* Phase Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider">Fase Corrente</Badge>
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-semibold text-lg">{config.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
            </div>
          </div>
          {/* Checklist */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium uppercase text-muted-foreground">Checklist Operativa</h4>
            <div className="rounded-lg border p-4 space-y-3">
              {requirements.map(req => (
                <div key={req.id} className="flex items-center gap-3">
                  {req.checked ? (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={cn("text-sm", req.checked ? "font-medium" : "text-muted-foreground")}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning if exists */}
          {config.warning && (
            <div className={cn("p-4 rounded-lg flex gap-3 text-sm",
              config.warning.type === 'warning' ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-blue-50 text-blue-800 border border-blue-200"
            )}>
              {config.warning.type === 'warning' ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <Info className="h-5 w-5 shrink-0" />}
              <div>
                <p className="font-bold">{config.warning.title}</p>
                <p>{config.warning.message}</p>
              </div>
            </div>
          )}


        </div>

        <SheetFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button disabled={!allRequirementsMet}>
            <CheckCircle className="mr-2 h-4 w-4" /> {config.proceedLabel}
          </Button>
          <Button variant="destructive">
            Manda in KO
          </Button>



          <Button variant="link">
            Segnala un problema
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
