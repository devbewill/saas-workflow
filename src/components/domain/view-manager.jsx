import React from 'react';
import { useWorkflowEngine } from '@/hooks/use-workflow-engine';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

// Placeholder Views for different states
const StandardView = () => (
  <Card>
    <CardHeader>
       <CardTitle>Dettaglio Pratica Standard</CardTitle>
    </CardHeader>
    <CardContent>
       <p className="text-muted-foreground">Visualizzazione standard per stati operativi generici.</p>
    </CardContent>
  </Card>
);

const DocumentValidationView = () => (
   <Card className="border-blue-200 bg-blue-50/50">
     <CardHeader>
        <CardTitle>Validazione Documentale</CardTitle>
     </CardHeader>
     <CardContent>
        <p className="text-blue-700">Questa vista è ottimizzata per la verifica rapida dei documenti caricati.</p>
     </CardContent>
   </Card>
);

const AMLCheckView = () => (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
         <CardTitle>Controlli AML & Risk</CardTitle>
      </CardHeader>
      <CardContent>
         <p className="text-amber-800">Interfaccia dedicata per l'adeguata verifica e controlli antiriciclaggio.</p>
      </CardContent>
    </Card>
);


export function ViewManager() {
  const { currentStep, currentStatusName, transitionTo, getAvailableActions, getStatusColor, currentOwner } = useWorkflowEngine();

  // Simple Router Logic based on Step Name
  const renderCurrentView = () => {
      // Logic could be more complex, e.g. mapping IDs
      if (currentStatusName.includes("Validazione documenti")) return <DocumentValidationView />;
      if (currentStatusName.includes("AML")) return <AMLCheckView />;
      return <StandardView />;
  };

  return (
    <div className="space-y-6">
       {/* Workflow Header / Stepper */}
       <div className="flex items-center justify-between p-6 bg-card border rounded-lg shadow-sm">
          <div>
             <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold tracking-tight">Pratica #0001</h1>
                <Badge variant={getStatusColor(currentStep.state)} className="text-sm px-3 py-1">
                   {currentStatusName}
                </Badge>
             </div>
             <p className="text-sm text-muted-foreground">In carico a: <span className="font-medium text-foreground">{currentOwner}</span></p>
          </div>

          <div className="flex gap-2">
             {getAvailableActions().map(action => (
                <Button key={action} onClick={() => transitionTo(action)}>
                   Avanza a {action} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             ))}
          </div>
       </div>

       {/* Dynamic Content Area */}
       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderCurrentView()}
       </div>
    </div>
  );
}
