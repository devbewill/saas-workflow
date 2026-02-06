/**
 * ProjectDetailPage - Main page component for project details
 * Uses Configuration Object pattern to render state-specific views
 */
import React, { useState, useMemo, Suspense } from 'react';
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
import { BundlesSection } from '../components/BundlesSection';

// Icons
import { ArrowLeft, Hand, Clock } from 'lucide-react';

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

    // Get the view component from config
    const ViewComponent = viewConfig.component;

    // All workflow steps for timeline
    const allSteps = workflowData.workflow.steps;

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
                            <Hand className="w-4 h-4 mr-2" /> Assistenza
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Nome Progetto</span>
                            <p className="text-sm font-medium">{projectData.name}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Id Progetto</span>
                            <p className="text-sm font-medium">{projectData.displayId}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Importo</span>
                            <p className="text-sm font-medium">124.500,00 €</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Prodotto</span>
                            <p className="text-sm font-medium">Cefin - Finanziamento Esposto 5,8%</p>
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

                {/* Main View Content - Rendered based on workflow state */}
                <TabsContent value={activeTab} className="mt-6">
                    <Suspense fallback={<ViewSkeleton />}>
                        <ViewComponent project={projectData} />
                    </Suspense>
                </TabsContent>
            </Tabs>

            {/* Bundles Section (Fascicoli) */}
            <BundlesSection projectId={projectData.id} documents={DOCUMENTS} />

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
