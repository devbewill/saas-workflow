import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/composed/page-header';
import { StatusBadge } from '@/components/composed/status-badge';
import { useWorkflow } from '@/hooks/use-workflow';
import { useAppContext } from '@/context/app-context';
import { getViewConfig, TAB_LABELS } from '@/config/workflow-views';
import { getAssistantConfig } from '@/config/assistant-steps';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { History, BotMessageSquare, ChevronRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

// Lazy-loaded tab views
const InfoView = lazy(() => import('../views/info-view'));
const DocumentsView = lazy(() => import('../views/documents-view'));
const FascicoliView = lazy(() => import('../views/fascicoli-view'));
const AmlView = lazy(() => import('../views/aml-view'));
const TeamView = lazy(() => import('../views/team-view'));
const PaymentsView = lazy(() => import('../views/payments-view'));
const PlaceholderView = lazy(() => import('../views/placeholder-view'));

const VIEW_COMPONENTS = {
    info: InfoView,
    documenti: DocumentsView,
    fascicoli: FascicoliView,
    aml: AmlView,
    team: TeamView,
    pagamenti: PaymentsView,
    crediti: PlaceholderView,
    delibera: PlaceholderView,
    contratto: PlaceholderView,
    finanziario: PlaceholderView,
    lavori: PlaceholderView,
    storico: PlaceholderView,
};

export default function ProjectDetailPage() {
    const { id } = useParams();
    const { activeApp } = useAppContext();
    const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
    const { currentStatusName, currentStep, currentOwner, allSteps, transitionTo, getAvailableActions, getStatusVariant } = useWorkflow();

    const viewConfig = useMemo(() => getViewConfig(currentStatusName), [currentStatusName]);
    const assistantConfig = viewConfig.assistantConfigKey ? getAssistantConfig(viewConfig.assistantConfigKey) : null;
    const [activeTab, setActiveTab] = useState(viewConfig.defaultTab);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const availableActions = getAvailableActions();

    return (
        <>
            <PageHeader
                title={project.name}
                subtitle={`Pratica #${project.displayId} · ${activeApp.name}`}
                backLabel="Torna ai progetti"
                actions={
                    <div className="flex gap-2">
                        {/* Timeline sheet */}
                        <Sheet open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <History size={14} />
                                    Timeline
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Timeline Workflow</SheetTitle>
                                    <SheetDescription>{activeApp.label}</SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-3">
                                    {allSteps.map((step, i) => (
                                        <div
                                            key={step.id}
                                            onClick={() => { transitionTo(step.fullName); setIsTimelineOpen(false); }}
                                            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${step.fullName === currentStatusName ? 'bg-accent/10 border border-accent/30' : 'hover:bg-muted'
                                                }`}
                                        >
                                            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${step.fullName === currentStatusName ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {step.id}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{step.fullName}</p>
                                                <p className="text-xs text-muted-foreground">{step.owner}</p>
                                            </div>
                                            {step.fullName === currentStatusName && <ChevronRight size={14} className="text-accent" />}
                                        </div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Assistant sheet */}
                        {viewConfig.showAssistant && assistantConfig && (
                            <Sheet open={isAssistantOpen} onOpenChange={setIsAssistantOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <BotMessageSquare size={14} />
                                        Assistente
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                                    <SheetHeader>
                                        <SheetTitle>{assistantConfig.title}</SheetTitle>
                                        <SheetDescription>{assistantConfig.description}</SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-4">
                                        {assistantConfig.warning && (
                                            <div className={`rounded-lg p-3 text-sm ${assistantConfig.warning.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
                                                }`}>
                                                <p className="font-semibold">{assistantConfig.warning.title}</p>
                                                <p>{assistantConfig.warning.message}</p>
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            {assistantConfig.requirements.map((req) => (
                                                <div key={req.id} className="flex items-center gap-3">
                                                    <div className={`h-4 w-4 rounded border ${req.checked ? 'bg-accent border-accent' : 'border-muted-foreground'}`} />
                                                    <span className="text-sm">{req.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button className="w-full">{assistantConfig.proceedLabel}</Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        )}

                        {/* Primary action */}
                        {availableActions.length > 0 && (
                            <Button onClick={() => transitionTo(availableActions[0])} className="gap-2">
                                <ChevronRight size={14} />
                                {viewConfig.primaryAction || 'Avanza'}
                            </Button>
                        )}
                    </div>
                }
            >
                {/* Status bar beneath title */}
                <div className="flex items-center gap-3 mt-2">
                    <Badge variant={getStatusVariant(currentStep.state)}>{currentStatusName}</Badge>
                    <span className="text-xs text-muted-foreground">Responsabile: {currentOwner}</span>
                </div>
            </PageHeader>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    {viewConfig.availableTabs.map((tabKey) => (
                        <TabsTrigger key={tabKey} value={tabKey}>
                            {TAB_LABELS[tabKey] || tabKey}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {viewConfig.availableTabs.map((tabKey) => {
                    const ViewComponent = VIEW_COMPONENTS[tabKey] || PlaceholderView;
                    return (
                        <TabsContent key={tabKey} value={tabKey}>
                            <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Caricamento...</div>}>
                                <ViewComponent tabKey={tabKey} project={project} />
                            </Suspense>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </>
    );
}
