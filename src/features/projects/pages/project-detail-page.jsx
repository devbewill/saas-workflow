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
import { History, BotMessageSquare, ChevronRight, CheckCircle2, Circle, AlertTriangle, Info, Check, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/data/projects';

// Lazy-loaded tab views
const InfoView = lazy(() => import('../views/info-view'));
const DocumentsView = lazy(() => import('../views/documents-view'));
const FascicoliView = lazy(() => import('../views/fascicoli-view'));
const AmlView = lazy(() => import('../views/aml-view'));
const TeamView = lazy(() => import('../views/team-view'));
const PaymentsView = lazy(() => import('../views/payments-view'));
const PlaceholderView = lazy(() => import('../views/placeholder-view'));
const ScoringView = lazy(() => import('../views/scoring-view'));

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
    scoring: ScoringView,
};

export default function ProjectDetailPage() {
    const { id } = useParams();
    const { activeApp } = useAppContext();
    const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
    const { currentStatusName, currentStep, currentOwner, allSteps, transitionTo, getAvailableActions, getStatusVariant } = useWorkflow();

    const viewConfig = useMemo(() => getViewConfig(currentStatusName), [currentStatusName]);
    const assistantConfig = viewConfig.assistantConfigKey ? getAssistantConfig(viewConfig.assistantConfigKey) : null;
    const allRequirementsMet = assistantConfig?.requirements?.every((r) => r.checked) ?? false;
    const [activeTab, setActiveTab] = useState(viewConfig.defaultTab);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const availableActions = getAvailableActions();

    // Determine step status relative to the current step
    const currentStepIndex = allSteps.findIndex((s) => s.fullName === currentStatusName);
    const getStepStatus = (index) => {
        if (index < currentStepIndex) return 'completed';
        if (index === currentStepIndex) return 'current';
        return 'future';
    };

    return (
        <>
            <PageHeader
                title={project.name}
                subtitle={
                    <span className="flex items-center gap-2 flex-wrap">
                        Pratica #{project.displayId} · {activeApp.name}
                        <StatusBadge status={currentStatusName} />
                        <span className="text-xs text-muted-foreground">· In carico a: {currentOwner}</span>
                    </span>
                }
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
                                <div className="mt-6">
                                    {allSteps.map((step, i) => {
                                        const status = getStepStatus(i);
                                        const isLast = i === allSteps.length - 1;

                                        return (
                                            <div
                                                key={step.id}
                                                onClick={() => { transitionTo(step.fullName); setIsTimelineOpen(false); }}
                                                className="relative flex gap-4 cursor-pointer group"
                                            >
                                                {/* Icon + Vertical line */}
                                                <div className="flex flex-col items-center">
                                                    <div className={cn(
                                                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold z-10 transition-all',
                                                        status === 'completed' && 'bg-accent text-accent-foreground',
                                                        status === 'current' && 'bg-orange-400 text-white shadow-md',
                                                        status === 'future' && 'bg-muted text-muted-foreground border border-border'
                                                    )}>
                                                        {status === 'completed' ? (
                                                            <Check size={14} />
                                                        ) : status === 'current' ? (
                                                            <Loader2 size={14} className="animate-spin" />
                                                        ) : (
                                                            <span>{i + 1}</span>
                                                        )}
                                                    </div>
                                                    {/* Vertical connector */}
                                                    {!isLast && (
                                                        <div className={cn(
                                                            'w-0.5 flex-1 min-h-[28px]',
                                                            status === 'completed' ? 'bg-accent' : 'bg-border'
                                                        )} />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className={cn(
                                                    'flex-1 pb-5 pt-0.5 min-w-0',
                                                    status === 'future' && 'opacity-50 group-hover:opacity-80'
                                                )}>
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <p className={cn(
                                                                'text-sm font-semibold leading-tight',
                                                                status === 'current' && 'text-orange-500',
                                                                status === 'completed' && 'text-foreground',
                                                                status === 'future' && 'text-muted-foreground'
                                                            )}>
                                                                {step.fullName}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">{step.owner}</p>
                                                        </div>
                                                        {/* Status badge */}
                                                        {status === 'current' && (
                                                            <Badge className="bg-orange-400 text-white border-none animate-pulse shrink-0">
                                                                In corso
                                                            </Badge>
                                                        )}
                                                        {status === 'completed' && (
                                                            <Badge variant="outline" className="text-muted-foreground shrink-0">
                                                                Completato
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                <SheetContent side="right" className="flex flex-col w-[400px] sm:w-[540px]">
                                    <SheetHeader>
                                        <SheetTitle>Assistente operativo</SheetTitle>
                                        <SheetDescription>Supporto dinamico per la lavorazione della fase corrente.</SheetDescription>
                                    </SheetHeader>

                                    <div className="flex-1 overflow-y-auto space-y-6 mt-6">
                                        {/* Phase context */}
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contesto lavorazione</p>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <h3 className="font-bold text-lg">{assistantConfig.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{assistantConfig.description}</p>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Requirements checklist */}
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Requisiti di fase</p>
                                            <div className="space-y-2">
                                                {assistantConfig.requirements.map((req) => (
                                                    <div
                                                        key={req.id}
                                                        className={cn(
                                                            'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                                                            req.checked ? 'bg-primary/5 border-primary/20' : 'border-border'
                                                        )}
                                                    >
                                                        {req.checked ? (
                                                            <CheckCircle2 size={18} className="text-primary shrink-0" />
                                                        ) : (
                                                            <Circle size={18} className="text-muted-foreground shrink-0" />
                                                        )}
                                                        <span className={cn(
                                                            'text-sm',
                                                            req.checked ? 'font-semibold' : 'text-muted-foreground'
                                                        )}>
                                                            {req.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Warning / Info alert */}
                                        {assistantConfig.warning && (
                                            <div className={cn(
                                                'flex gap-3 rounded-lg border p-4 text-sm',
                                                assistantConfig.warning.type === 'warning'
                                                    ? 'bg-yellow-50 text-yellow-900 border-yellow-200'
                                                    : 'bg-blue-50 text-blue-900 border-blue-200'
                                            )}>
                                                {assistantConfig.warning.type === 'warning' ? (
                                                    <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
                                                ) : (
                                                    <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                                )}
                                                <div className="space-y-1">
                                                    <p className="font-semibold">{assistantConfig.warning.title}</p>
                                                    <p className="leading-relaxed">{assistantConfig.warning.message}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer actions */}
                                    <div className="border-t pt-4 mt-4 space-y-3">
                                        <Button disabled={!allRequirementsMet} className="w-full gap-2">
                                            <CheckCircle2 size={14} />
                                            {assistantConfig.proceedLabel}
                                        </Button>
                                        <div className="flex gap-3">
                                            <Button variant="destructive" className="flex-1">
                                                Manda in KO
                                            </Button>
                                            <Button variant="outline" className="flex-1">
                                                Segnala errore
                                            </Button>
                                        </div>
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
            />


            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    {viewConfig.availableTabs.map((tabKey) => (
                        <TabsTrigger key={tabKey} value={tabKey}>
                            {TAB_LABELS[tabKey] || tabKey}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {
                    viewConfig.availableTabs.map((tabKey) => {
                        const ViewComponent = VIEW_COMPONENTS[tabKey] || PlaceholderView;
                        return (
                            <TabsContent key={tabKey} value={tabKey}>
                                <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Caricamento...</div>}>
                                    <ViewComponent tabKey={tabKey} project={project} />
                                </Suspense>
                            </TabsContent>
                        );
                    })
                }
            </Tabs >
        </>
    );
}
