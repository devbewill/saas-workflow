/**
 * ProjectDetailPage - Main page component for project details
 * Uses Configuration Object pattern to render state-specific views
 * Each tab renders a different view component
 */
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS, CONDOMINIUM_DATA, FINANCIAL_DATA, DOCUMENTS } from '@/data/mockData';
import { getViewConfig, TAB_LABELS } from '@/config/workflow-views';
import { useWorkflowEngine } from '@/hooks/use-workflow-engine';
import { useAppContext } from '@/context/AppContext';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// Feature Components
import { OperatorAssistantSheet } from '@/components/sheets/OperatorAssistantSheet';
import { WorkflowTimelineSheet } from '@/components/sheets/WorkflowTimelineSheet';

// Icons
import { ArrowLeft, Hand, Clock, Loader2 } from 'lucide-react';

// Lazy load all view components
const StandardView = lazy(() => import('@/features/projects/views/StandardView'));
const DocumentsView = lazy(() => import('@/features/projects/views/DocumentsView'));
const AMLVerificationView = lazy(() => import('@/features/projects/views/AMLVerificationView'));
const FascicoliView = lazy(() => import('@/features/projects/views/FascicoliView'));
const TeamView = lazy(() => import('@/features/projects/views/TeamView'));
const CreditCheckView = lazy(() => import('@/features/projects/views/CreditCheckView'));
const ApprovalView = lazy(() => import('@/features/projects/views/ApprovalView'));
const ContractView = lazy(() => import('@/features/projects/views/ContractView'));

// Tab to View Component mapping
const TAB_VIEW_MAP = {
    info: StandardView,
    documenti: DocumentsView,
    fascicoli: FascicoliView,
    aml: AMLVerificationView,
    crediti: CreditCheckView,
    delibera: ApprovalView,
    contratto: ContractView,
    team: TeamView,
    finanziario: StandardView, // Financial uses StandardView for now
    lavori: StandardView, // Works uses StandardView for now
    storico: StandardView, // History uses StandardView for now
};

// Loading skeleton for lazy-loaded views
function ViewSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-64 bg-slate-100 rounded"></div>
        </div>
    );
}

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find project data
    const projectData = useMemo(() => {
        return PROJECTS.find(p => p.id === id) || PROJECTS[0];
    }, [id]);

    // Workflow engine
    const {
        currentStatusName,
        currentStep,
        currentOwner,
        allSteps,
        transitionTo,
        getAvailableActions,
        getStatusColor
    } = useWorkflowEngine("Aperta - Validazione documenti");

    const { activeApp } = useAppContext();

    // Get view configuration based on current workflow state
    const viewConfig = useMemo(() => {
        const config = getViewConfig(currentStatusName);
        // Filter tabs based on active app features
        return {
            ...config,
            availableTabs: config.availableTabs.filter(tab => activeApp.features.tabs.includes(tab))
        };
    }, [currentStatusName, activeApp]);

    // UI State
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(viewConfig.defaultTab);

    // Sync activeTab with viewConfig when workflow state changes
    React.useEffect(() => {
        // If current activeTab is not in availableTabs anymore, switch to default
        if (!viewConfig.availableTabs.includes(activeTab)) {
            setActiveTab(viewConfig.defaultTab);
        }
    }, [viewConfig.availableTabs, viewConfig.defaultTab]);

    // Get view component for the active tab
    const getViewForTab = (tabKey) => {
        return TAB_VIEW_MAP[tabKey] || StandardView;
    };

    return (
        <div className="space-y-8 p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                        INDIETRO AI PROGETTI
                    </button>
                    <div className="flex flex-wrap items-center gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                            Progetto {projectData.displayId}
                        </h1>
                        <Badge
                            variant="secondary"
                            className="px-3 py-1 text-xs font-bold bg-white border border-border shadow-sm hover:border-accent hover:text-accent transition-all cursor-pointer rounded-full flex items-center gap-2"
                            onClick={() => setIsTimelineOpen(true)}
                        >
                            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                            {currentStatusName.toUpperCase()}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium max-w-2xl">
                        {projectData.name} — Gestione integrata e monitoraggio workflow per {activeApp.label}.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {viewConfig.showAssistant && (
                        <Button
                            onClick={() => setIsAssistantOpen(true)}
                            className="rounded-xl px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            <Hand className="w-4 h-4 mr-2" /> Supporto Operativo
                        </Button>
                    )}
                    {viewConfig.showTimeline && (
                        <Button
                            variant="outline"
                            onClick={() => setIsTimelineOpen(true)}
                            className="rounded-xl px-6 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all shadow-sm active:scale-95"
                        >
                            <Clock className="w-4 h-4 mr-2" /> Visualizza Timeline
                        </Button>
                    )}
                </div>
            </div>

            {/* Project Info Summary - Refined Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                <div className="lg:col-span-3">
                    <Card className="h-full overflow-hidden border-none shadow-xl shadow-black/[0.03] bg-white ring-1 ring-border/50">
                        <CardContent className="p-0 h-full">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-border/40 h-full">
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-bold tracking-widest">Cliente / Condominio</span>
                                    <p className="text-sm font-bold text-primary truncate">{projectData.name}</p>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-bold tracking-widest">Importo finanziamento</span>
                                    <p className="text-sm font-bold text-accent">€ 124.500,00</p>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">ID Pratica OCS</span>
                                    <p className="text-sm font-bold text-primary font-mono tracking-tighter">{projectData.ocsId || '345342'}</p>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">Stato Delibera</span>
                                    <div><Badge className="bg-blue-50 text-blue-700 border-blue-200/50 shadow-none font-bold text-[10px] rounded-sm px-2">RATING OK</Badge></div>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">Prodotto Attivo</span>
                                    <p className="text-[11px] font-semibold text-primary/80">
                                        {activeApp.id === 'HD_CEF' && 'Cefin - Finanziamento Esposto'}
                                        {activeApp.id === 'HD_RISTR' && 'RISTR - Finanziamento Ristrutturazioni'}
                                        {activeApp.id === 'HD_BRK' && 'Broker Plus - Gestione Terzi'}
                                    </p>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">Ultimo Check AML</span>
                                    <p className="text-sm font-bold text-primary">04/02/2026</p>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">Assegnatario</span>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-primary">{projectData.owner || 'Marzia Brambilla'}</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-1.5 hover:bg-slate-50/50 transition-colors border-b-0">
                                    <span className="text-[10px] text-muted-foreground/80 uppercase font-extrabold tracking-widest">Documenti Validati</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent w-3/4 rounded-full"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-accent italic">75%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="hidden lg:block lg:col-span-1 h-full">
                    <Card className="h-full border-none shadow-xl shadow-black/[0.05] bg-accent text-accent-foreground overflow-hidden relative group cursor-pointer flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                            <Hand className="w-6 h-6 mb-4 opacity-80" />
                            <div>
                                <h3 className="text-base font-extrabold tracking-tight leading-tight mb-2">Hai bisogno di supporto?</h3>
                                <p className="text-[11px] font-medium text-accent-foreground/80 mb-4 tracking-tight leading-relaxed">Il nostro sistema IA è pronto a guidarti nei prossimi step.</p>
                                <Button size="sm" variant="secondary" className="w-full font-bold shadow-sm h-9 text-[10px] tracking-widest uppercase rounded-xl" onClick={() => setIsAssistantOpen(true)}>
                                    CHIEDI ALLA PIATTAFORMA
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Tabs Section - Dynamic based on viewConfig */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-slate-100/50 p-1 rounded-xl h-auto flex-wrap">
                    {viewConfig.availableTabs.map(tabKey => (
                        <TabsTrigger
                            key={tabKey}
                            value={tabKey}
                            className="rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                        >
                            {TAB_LABELS[tabKey] || tabKey}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Render TabsContent for each available tab */}
                {viewConfig.availableTabs.map(tabKey => {
                    const ViewComponent = getViewForTab(tabKey);
                    return (
                        <TabsContent key={tabKey} value={tabKey} className="mt-6">
                            <Suspense fallback={<ViewSkeleton />}>
                                <ViewComponent project={projectData} />
                            </Suspense>
                        </TabsContent>
                    );
                })}
            </Tabs>

            {/* Operator Assistant Sheet */}
            {viewConfig.showAssistant && (
                <OperatorAssistantSheet
                    isOpen={isAssistantOpen}
                    onOpenChange={setIsAssistantOpen}
                    configKey={viewConfig.assistantConfigKey}
                />
            )}

            {/* Workflow Timeline Sheet */}
            <WorkflowTimelineSheet
                isOpen={isTimelineOpen}
                onOpenChange={setIsTimelineOpen}
                steps={allSteps}
                currentStep={currentStep}
                onTransition={transitionTo}
            />
        </div>
    );
}
