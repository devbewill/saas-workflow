import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRACTICES, CONDOMINIUM_DATA, FINANCIAL_DATA, DOCUMENTS } from '@/data/mockData';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Domain Components
// import { BundleWidget } from '@/components/domain/bundle-widget'; // Removed in favor of AtomicBundleCard
import { AtomicBundleCard } from './AtomicBundleCard';
import { AtomicFascicoloSheet } from './AtomicFascicoloSheet';
import { AtomicAssistantSheet } from './AtomicAssistantSheet';
import { AtomicTeamTab } from './AtomicTeamTab';
import { AMLVerificationView } from './AMLVerificationView';

// Icons
import { Clock, Info, ArrowLeft, Home, FileText, Plus, ShieldCheck, Hand, Headset, Edit, CloudUpload, FileSignature } from 'lucide-react';

// Mock Documents Data


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

    // Document Filtering State
    const [docSearch, setDocSearch] = useState('');
    const [docCategoryFilter, setDocCategoryFilter] = useState('all');
    const [docStatusFilter, setDocStatusFilter] = useState('all');

    const filteredDocuments = useMemo(() => {
        return DOCUMENTS.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(docSearch.toLowerCase());
            const matchesCategory = docCategoryFilter === 'all' || doc.category === docCategoryFilter;
            const matchesStatus = docStatusFilter === 'all' || doc.status === docStatusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [docSearch, docCategoryFilter, docStatusFilter]);

    // Use the new Hook!
    const { currentStatusName, currentStep, getStatusColor, transitionTo } = useWorkflowEngine("Aperta - Validazione documenti");

    // State for side panels
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    // Fascicoli State
    const [isFascicoloSheetOpen, setIsFascicoloSheetOpen] = useState(false);
    const [editingFascicolo, setEditingFascicolo] = useState(null);
    const [bundles, setBundles] = useState([
        { id: 1, name: 'Documenti Amministratore', documentIds: [46, 47, 51], isSignatureEnabled: true, updatedAt: '04/02/2026', docCount: 3 },
        { id: 2, name: 'Privacy e GDPR', documentIds: [12, 13], isSignatureEnabled: false, updatedAt: '04/02/2026', docCount: 2 }
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
                        <Hand className="w-4 h-4 mr-2" /> Help
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

            {/* 2. Main Content - Dynamic Switch */}
            {currentStatusName === "Caricata - Lavorazione AML e Banche Dati" ? (
                <div className="mt-6 animate-in fade-in zoom-in-95 duration-300">
                    <AMLVerificationView />
                </div>
            ) : (
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
                                    <div className="p-4 border-b space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder="Cerca documento..."
                                                    value={docSearch}
                                                    onChange={(e) => setDocSearch(e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="w-[200px]">
                                                <Select value={docCategoryFilter} onValueChange={setDocCategoryFilter}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Tutte le categorie" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">Tutte le categorie</SelectItem>
                                                        {Array.from(new Set(DOCUMENTS.map(d => d.category))).map(cat => (
                                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="w-[200px]">
                                                <Select value={docStatusFilter} onValueChange={setDocStatusFilter}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Tutti gli stati" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">Tutti gli stati</SelectItem>
                                                        {Array.from(new Set(DOCUMENTS.map(d => d.status))).map(st => (
                                                            <SelectItem key={st} value={st}>{st}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[80px]">Id</TableHead>
                                                <TableHead>Categoria</TableHead>
                                                <TableHead>Documento</TableHead>
                                                <TableHead>Caricato il</TableHead>
                                                <TableHead>Stato</TableHead>
                                                <TableHead className="text-right">Azioni</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredDocuments.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                        Nessun documento trovato con i filtri selezionati.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredDocuments.map((doc) => {
                                                    let statusColor = "";
                                                    if (doc.status === "Da caricare") statusColor = "bg-red-100 text-red-700 border-red-200";
                                                    else if (doc.status === "Caricato") statusColor = "bg-blue-100 text-blue-700 border-blue-200";
                                                    else if (doc.status === "Validato") statusColor = "bg-green-100 text-green-700 border-green-200";
                                                    else statusColor = "bg-slate-100 text-slate-700 border-slate-200";

                                                    return (
                                                        <TableRow key={doc.id}>
                                                            <TableCell className="font-medium text-muted-foreground">{doc.id}</TableCell>
                                                            <TableCell><Badge variant="secondary" className="font-normal text-xs">{doc.category}</Badge></TableCell>
                                                            <TableCell className="font-medium">{doc.name}</TableCell>
                                                            <TableCell>{doc.date}</TableCell>
                                                            <TableCell>
                                                                <Badge variant="outline" className={cn("text-xs font-normal", statusColor)}>
                                                                    {doc.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    {doc.status === "Da caricare" ? (
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                                            <CloudUpload className="h-4 w-4" />
                                                                        </Button>
                                                                    ) : doc.status === "Caricato" ? (
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                            <FileText className="h-4 w-4" />
                                                                        </Button>
                                                                    ) : (
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                                            <ShieldCheck className="h-4 w-4" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }))}
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
            )}

            {/* Side Panels Implementation using Sheet */}

            {/* Timeline Sheet */}
            <Sheet open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Cronologia Pratica</SheetTitle>
                        <SheetDescription>Stato avanzamento lavori</SheetDescription>
                    </SheetHeader>
                    <div className="my-6 space-y-0">
                        {allSteps.map((step) => {
                            const isCompleted = step.id < currentStep.id;
                            const isCurrent = step.id === currentStep.id;
                            const isFuture = step.id > currentStep.id;

                            return (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex gap-4 relative p-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-100",
                                        isFuture && "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                                    )}
                                    onClick={() => {
                                        transitionTo(step.fullName);
                                        // Optional: close timeline after selection if desired, but maybe user wants to see change
                                        // setIsTimelineOpen(false);
                                    }}
                                >
                                    {/* Vertical Line */}
                                    {step.id !== allSteps[allSteps.length - 1].id && (
                                        <div className="absolute left-[23px] top-8 bottom-[-8px] w-[2px] bg-muted z-0" />
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
                                    <div className="pb-4 pt-1">
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
