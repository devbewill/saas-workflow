import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRACTICES, CONDOMINIUM_DATA, FINANCIAL_DATA } from '@/data/mockData';
import { useWorkflowEngine } from '@/hooks/use-workflow-engine';
import { cn } from '@/lib/utils';
import workflowData from '@/data/workflow.json';

// Atomic Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

// Domain Components
// import { BundleWidget } from '@/components/domain/bundle-widget'; // Removed in favor of AtomicBundleCard
import { AtomicBundleCard } from './AtomicBundleCard';
import { AtomicFascicoloSheet } from './AtomicFascicoloSheet';
import { AtomicAssistantSheet } from './AtomicAssistantSheet';
import { AtomicTeamTab } from './AtomicTeamTab';

// Icons
import { Clock, Info, ArrowLeft, Home, FileText, Plus, ShieldCheck, Headset, Edit, CloudUpload, FileSignature } from 'lucide-react';

// Mock Documents Data
const DOCUMENTS = [
  { id: 1, name: "Codice Fiscale Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false },
  { id: 2, name: "Informativa Privacy Condominio", file: "InformativaPrivacyCondominio.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: true },
  { id: 3, name: "Informativa SIC Condominio", file: "InformativaSICCondominio.pdf", date: "23/06/25", status: "In attesa", statusColor: "bg-yellow-200 text-yellow-700", isSigned: false },
  { id: 4, name: "Verbale nomina", file: "Verbale_nomina.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: true },
  { id: 5, name: "Tessera sanitaria", file: "Tessera:sanitaria.jpg", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: false },
  { id: 6, name: "Presentazione Condominio", file: "PresentazioneCondominio.pdf", date: "23/05/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: false },
  { id: 7, name: "Preventivo spese", file: "Preventivo:spese.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: false },
  { id: 8, name: "Documento Identità Amministratore", file: "CI_Amm.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700", isSigned: true },
];

const DataGroup = ({ title, data }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold uppercase text-muted-foreground">{title.replace('_', ' ')}</h4>
    <div className="grid grid-cols-2 gap-4">
       {data.map((item, i) => (
          <div key={i}>
             <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
             <p className="text-sm font-medium">{item.value}</p>
          </div>
       ))}
    </div>
  </div>
);

export default function AtomicPraticaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const practiceData = PRACTICES.find(p => p.id === id) || PRACTICES[0];

  // Use the new Hook!
  const { currentStatusName, currentStep, getStatusColor, transitionTo } = useWorkflowEngine("Aperta - Validazione documenti");

  // State for side panels
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Fascicoli State
  const [isFascicoloSheetOpen, setIsFascicoloSheetOpen] = useState(false);
  const [editingFascicolo, setEditingFascicolo] = useState(null);
  const [bundles, setBundles] = useState([
     { id: 1, name: 'Documenti Amministratore', documentIds: [4, 5, 8], isSignatureEnabled: true, updatedAt: '04/02/2026', docCount: 3 },
     { id: 2, name: 'Privacy e GDPR', documentIds: [2, 3], isSignatureEnabled: false, updatedAt: '04/02/2026', docCount: 2 }
  ]);

  const handleCreateFascicolo = () => {
    setEditingFascicolo(null);
    setIsFascicoloSheetOpen(true);
  };

  const handleEditFascicolo = (bundle) => {
    setEditingFascicolo(bundle);
    setIsFascicoloSheetOpen(true);
  }

  const handleSaveFascicolo = (bundle) => {
    setBundles(prev => {
        const exists = prev.find(b => b.id === bundle.id);
        if (exists) return prev.map(b => b.id === bundle.id ? { ...bundle, docCount: bundle.documentIds.length } : b);
        return [...prev, { ...bundle, docCount: bundle.documentIds.length }];
    });
  };

    const handleDeleteFascicolo = (id) => {
        setBundles(prev => prev.filter(b => b.id !== id));
    };

    const handleSignFascicolo = (bundle) => {
        alert(`Avvio procedura firma per il fascicolo: ${bundle.name}`);
        // Mock updating status
        // In a real app this would call an API
    };

    // Get all steps for timeline
    const allSteps = workflowData.workflow.steps;


  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       {/* 1. Header Section */}
       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
                   <ArrowLeft size={16} />
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Pratica {practiceData.displayId}</h1>
                <Badge
                    variant={getStatusColor(currentStep.state)}
                    className="cursor-pointer hover:opacity-80 transition-opacity select-none"
                    onClick={() => setIsTimelineOpen(true)}
                >
                    {currentStatusName}
                </Badge>
             </div>
          </div>

          <div className="flex gap-2">
             <Button onClick={() => setIsAssistantOpen(true)}>
                <Headset className="w-4 h-4 mr-2" /> Help
             </Button>
          </div>
       </div>

       {/* 1.1 Info Header Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 border rounded-lg">
           <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Id Progetto</span>
               <p className="text-sm font-medium">{practiceData.displayId}</p>
           </div>
           <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Importo Finanziabile</span>
               <p className="text-sm font-medium">124.500,00 €</p>
           </div>
           <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase font-bold">Prodotto</span>
                <p className="text-sm font-medium">Cefin - Finanziamento Esposto 5,8%</p>
           </div>
           <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase font-bold">Rating</span>
                <div><Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Positiva</Badge></div>
           </div>



           <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Data Creazione</span>
               <p className="text-sm font-medium">12/01/2026</p>
           </div>
           <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Ultima Modifica</span>
               <p className="text-sm font-medium">04/02/2026</p>
           </div>
            <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Amministratore</span>
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">AI</div>
                 <p className="text-sm font-medium">Andrea Ippolito</p>
               </div>
           </div>
           <div className="space-y-1">
               <span className="text-xs text-muted-foreground uppercase font-bold">Gestito da</span>
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">MR</div>
                 <p className="text-sm font-medium">Marco Rossi</p>
               </div>
           </div>
       </div>

       {/* 2. Main Content Tabs */}
       <Tabs defaultValue="documenti" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
             <TabsTrigger value="documenti">Documenti</TabsTrigger>
             <TabsTrigger value="dati">Dati</TabsTrigger>
             <TabsTrigger value="fascicoli">Fascicoli</TabsTrigger>
             <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <div className="mt-6">
             {/* Tab: Documenti */}
             <TabsContent value="documenti" className="space-y-4">
                <Card>

                   <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Id</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Stato</TableHead>
                                <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {DOCUMENTS.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium text-muted-foreground">{doc.id}</TableCell>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("text-xs font-normal border-0", doc.statusColor)}>
                                            {doc.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                             {doc.status === "Da caricare" ? (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                    <CloudUpload className="h-4 w-4" />
                                                </Button>
                                             ) : (
                                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                    <FileSignature className="h-4 w-4" />
                                                </Button>
                                             )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                   </CardContent>
                </Card>
             </TabsContent>

             {/* Tab: Dati Completi */}
             <TabsContent value="dati">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Card>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <div className="bg-primary/10 p-2 rounded-lg">
                            <Home className="w-6 h-6 text-primary" />
                         </div>
                         <CardTitle>Dati Condominio</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         {Object.entries(CONDOMINIUM_DATA).map(([key, data]) => (
                            <DataGroup key={key} title={key} data={data} />
                         ))}
                      </CardContent>
                   </Card>

                   <Card>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                          <div className="bg-primary/10 p-2 rounded-lg">
                             <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle>Dati Finanziari</CardTitle>
                      </CardHeader>
                       <CardContent className="space-y-6">
                         {Object.entries(FINANCIAL_DATA).map(([key, data]) => (
                            <DataGroup key={key} title={key} data={data} />
                         ))}
                      </CardContent>
                   </Card>
                </div>
             </TabsContent>

             {/* Tab: Fascicoli (GRID VIEW) */}
             <TabsContent value="fascicoli">
                 <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                             <h3 className="text-lg font-medium">Gestione Fascicoli</h3>
                             <p className="text-sm text-muted-foreground">Gestisci i raggruppamenti di documenti per l'invio e la firma.</p>
                        </div>
                        <Button onClick={handleCreateFascicolo}>
                           <Plus className="mr-2 h-4 w-4" /> Nuovo Fascicolo
                        </Button>
                    </div>

                    {bundles.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-slate-50">
                             <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                 <Plus className="h-8 w-8 text-muted-foreground" />
                             </div>
                             <h3 className="font-semibold text-lg text-slate-900">Nessun fascicolo presente</h3>
                             <p className="text-muted-foreground max-w-sm mx-auto mt-2">Crea il primo fascicolo per raggruppare i documenti da inviare al cliente.</p>
                             <Button variant="outline" className="mt-6" onClick={handleCreateFascicolo}>Crea Fascicolo</Button>
                        </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {bundles.map(bundle => (
                                <AtomicBundleCard
                                    key={bundle.id}
                                    bundle={bundle}
                                    documents={DOCUMENTS} // Pass all docs, component filters them
                                    onEdit={handleEditFascicolo}
                                    onDelete={handleDeleteFascicolo}
                                    onSign={handleSignFascicolo}
                                />
                             ))}
                         </div>
                    )}
                 </div>
             </TabsContent>

              <TabsContent value="team">
                 <AtomicTeamTab />
              </TabsContent>
          </div>
       </Tabs>

       {/* Side Panels Implementation using Sheet */}

       {/* Timeline Sheet */}
       <Sheet open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
          <SheetContent>
             <SheetHeader>
                <SheetTitle>Cronologia Pratica</SheetTitle>
                <SheetDescription>Stato avanzamento lavori</SheetDescription>
             </SheetHeader>
             <div className="my-6 space-y-4">
                {allSteps.map((step) => {
                    const isCompleted = step.id < currentStep.id;
                    const isCurrent = step.id === currentStep.id;
                    const isFuture = step.id > currentStep.id;

                    return (
                        <div key={step.id} className={cn("flex gap-4 relative", isFuture && "opacity-50 grayscale")}>
                            {/* Vertical Line */}
                             {step.id !== allSteps[allSteps.length - 1].id && (
                                <div className="absolute left-[15px] top-8 bottom-[-16px] w-[2px] bg-muted z-0" />
                            )}

                            {/* Indicator */}
                            <div className={cn(
                                "relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors",
                                isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                isCurrent ? "bg-background border-primary text-primary ring-4 ring-primary/20" :
                                "bg-background border-muted text-muted-foreground"
                            )}>
                                {step.id}
                            </div>

                            {/* Content */}
                            <div className="pb-6 pt-1">
                                <h4 className={cn("font-medium text-sm", isCurrent ? "text-primary font-bold" : "text-foreground")}>
                                    {step.fullName}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{step.owner}</p>
                                {isCompleted && (
                                    <Badge variant="outline" className="mt-2 text-[10px] h-5 px-1.5 font-normal text-muted-foreground border-green-200 bg-green-50 text-green-700">
                                        Completato
                                    </Badge>
                                )}
                            </div>
                        </div>
                    );
                })}
             </div>
          </SheetContent>
       </Sheet>

       {/* Assistant Sheet */}
       <AtomicAssistantSheet
            isOpen={isAssistantOpen}
            onOpenChange={setIsAssistantOpen}
            currentStepName={currentStatusName}
       />

       {/* Fascicolo Sheet */}
       <AtomicFascicoloSheet
            isOpen={isFascicoloSheetOpen}
            onClose={() => setIsFascicoloSheetOpen(false)}
            initialData={editingFascicolo}
            availableDocuments={DOCUMENTS}
            onSave={handleSaveFascicolo}
            onDelete={handleDeleteFascicolo}
       />

    </div>
  );
}
