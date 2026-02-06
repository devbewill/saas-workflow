/**
 * WorkflowTimeline - Sheet showing the workflow progression
 */
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WorkflowTimeline({ isOpen, onOpenChange, steps, currentStep, onTransition }) {
    // Group steps by state
    const groupedSteps = steps.reduce((acc, step) => {
        if (!acc[step.state]) acc[step.state] = [];
        acc[step.state].push(step);
        return acc;
    }, {});

    const currentIndex = steps.findIndex(s => s.id === currentStep?.id);

    const getStepStatus = (step, index) => {
        if (index < currentIndex) return 'completed';
        if (index === currentIndex) return 'current';
        return 'future';
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Timeline Progetto</SheetTitle>
                    <SheetDescription>Progressione del workflow</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                    {Object.entries(groupedSteps).map(([state, stateSteps]) => (
                        <div key={state} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                    {state}
                                </Badge>
                            </div>

                            <div className="relative pl-6 space-y-4">
                                {/* Vertical line */}
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />

                                {stateSteps.map((step) => {
                                    const stepIndex = steps.findIndex(s => s.id === step.id);
                                    const status = getStepStatus(step, stepIndex);

                                    return (
                                        <div
                                            key={step.id}
                                            className={cn(
                                                "relative flex items-start gap-3 p-3 rounded-lg transition-all",
                                                status === 'current' && "bg-blue-50 border border-blue-200",
                                                status === 'completed' && "opacity-60",
                                                status === 'future' && "opacity-50"
                                            )}
                                        >
                                            {/* Step indicator */}
                                            <div className={cn(
                                                "absolute -left-6 mt-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center bg-white",
                                                status === 'current' && "border-blue-500",
                                                status === 'completed' && "border-green-500 bg-green-500",
                                                status === 'future' && "border-slate-300"
                                            )}>
                                                {status === 'completed' ? (
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                ) : status === 'current' ? (
                                                    <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />
                                                ) : (
                                                    <Circle className="h-3 w-3 text-slate-300" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm font-medium",
                                                    status === 'current' && "text-blue-900",
                                                    status === 'completed' && "text-slate-600 line-through",
                                                    status === 'future' && "text-slate-500"
                                                )}>
                                                    {step.subState || step.fullName}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Owner: {step.owner}
                                                </p>
                                            </div>

                                            {/* Transition button for next possible states */}
                                            {status === 'current' && step.nextPossible?.length > 0 && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="shrink-0"
                                                    onClick={() => onTransition(step.nextPossible[0])}
                                                >
                                                    Avanza <ChevronRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
