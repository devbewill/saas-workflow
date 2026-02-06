/**
 * WorkflowTimeline - Sheet showing the workflow progression
 * Clicking on any step transitions to that state
 */
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';
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

    const handleStepClick = (step) => {
        // Transition to the clicked step
        onTransition(step.fullName);
        onOpenChange(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Timeline Progetto</SheetTitle>
                    <SheetDescription>Clicca su uno stato per andare a quello stato</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                    {Object.entries(groupedSteps).map(([state, stateSteps]) => (
                        <div key={state} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                    {state}
                                </Badge>
                            </div>

                            <div className="space-y-2 ml-2">
                                {stateSteps.map((step) => {
                                    const stepIndex = steps.findIndex(s => s.id === step.id);
                                    const status = getStepStatus(step, stepIndex);

                                    return (
                                        <div
                                            key={step.id}
                                            onClick={() => handleStepClick(step)}
                                            className={cn(
                                                "flex items-center gap-3 py-2 rounded-lg transition-all cursor-pointer",
                                                status === 'current' && "",
                                                status === 'completed' && "hover:bg-green-50",
                                                status === 'future' && "hover:bg-slate-50"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center bg-white",
                                                status === 'current' && "border-blue-500",
                                                status === 'completed' && "border-green-500 bg-green-500",
                                                status === 'future' && "bg-slate-100 border-slate-10    0"
                                            )}>
                                                {status === 'completed' ? (
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                ) : status === 'current' ? (
                                                    <Circle className="h-4 w-4 fill-blue-500 text-blue-500" />
                                                ) : (
                                                    <Circle className="h-4 w-4 text-slate-300" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm font-medium",
                                                    status === 'current' && "text-blue-900",
                                                    status === 'completed' && "text-slate-600",
                                                    status === 'future' && "text-slate-500"
                                                )}>
                                                    {step.subState || step.fullName}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Owner: {step.owner}
                                                </p>
                                            </div>
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
