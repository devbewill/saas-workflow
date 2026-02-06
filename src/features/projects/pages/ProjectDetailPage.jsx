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
import workflowData from '@/data/workflow.json';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// Feature Components
import { OperatorAssistantSheet } from '@/features/operator-assist/components/OperatorAssistantSheet';
import { WorkflowTimeline } from '@/features/workflow/components/WorkflowTimeline';

// Icons
import { ArrowLeft, Hand, Clock } from 'lucide-react';

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
        transitionTo,
        getAvailableActions,
        getStatusColor
    } = useWorkflowEngine("Aperta - Validazione documenti");

    // Get view configuration based on current workflow state
    const viewConfig = useMemo(() => {
        return getViewConfig(currentStatusName);
    }, [currentStatusName]);

    // UI State
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(viewConfig.defaultTab);

    // Sync activeTab with viewConfig when workflow state changes
    React.useEffect(() => {
        setActiveTab(viewConfig.defaultTab);
    }, [viewConfig.defaultTab]);

    // All workflow steps for timeline
    const allSteps = workflowData.workflow.steps;

    // Get view component for the active tab
    const getViewForTab = (tabKey) => {
        return TAB_VIEW_MAP[tabKey] || StandardView;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
                            <ArrowLeft size={16} />
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Progetto {projectData.displayId}
                        </h1>
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
                    {viewConfig.showAssistant && (
                        <Button onClick={() => setIsAssistantOpen(true)}>
                            <Hand className="w-4 h-4 mr-2" /> Supporto
                        </Button>
                    )}
                    {viewConfig.showTimeline && (
                        <Button variant="outline" onClick={() => setIsTimelineOpen(true)}>
                            <Clock className="w-4 h-4 mr-2" /> Timeline
                        </Button>
                    )}
                </div>
            </div>

            {/* Project Info Summary */}
            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Nome Progetto</span>
                            <p className="text-sm font-medium">{projectData.name}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Id Progetto</span>
                            <p className="text-sm font-medium">{projectData.displayId}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Importo Finanziabile</span>
                            <p className="text-sm font-medium">124.500,00 €</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Pratica Broker</span>
                            <p className="text-sm font-medium">{projectData.brokerId || '123456'}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Pratica OCS</span>
                            <p className="text-sm font-medium">{projectData.ocsId || '345342'}</p>
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
                            <p className="text-sm font-medium">{projectData.created || '12/01/2026'}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Ultima Modifica</span>
                            <p className="text-sm font-medium">{projectData.updated || '04/02/2026'}</p>
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
                                <p className="text-sm font-medium">{projectData.owner || 'Marco Rossi'}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs Section - Dynamic based on viewConfig */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    {viewConfig.availableTabs.map(tabKey => (
                        <TabsTrigger key={tabKey} value={tabKey}>
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
            <WorkflowTimeline
                isOpen={isTimelineOpen}
                onOpenChange={setIsTimelineOpen}
                steps={allSteps}
                currentStep={currentStep}
                onTransition={transitionTo}
            />
        </div>
    );
}
