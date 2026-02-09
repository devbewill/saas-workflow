/**
 * WorkflowTimeline - Sheet showing the workflow progression
 * Clicking on any step transitions to that state
 */
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock person data for each owner role
const OWNER_PERSONS = {
    'Supervisor': { name: 'Marco Bianchi', initials: 'MB', avatar: null },
    'Front office': { name: 'Laura Rossi', initials: 'LR', avatar: null },
    'Back office': { name: 'Andrea Verdi', initials: 'AV', avatar: null },
    'Middle office': { name: 'Giulia Ferrari', initials: 'GF', avatar: null },
    'Ufficio crediti': { name: 'Paolo Esposito', initials: 'PE', avatar: null },
    'Organo deliberante': { name: 'Comitato Crediti', initials: 'CC', avatar: null },
    'Amministratore': { name: 'Mario Rossi', initials: 'MR', avatar: null },
};

const getOwnerPerson = (ownerRole) => {
    return OWNER_PERSONS[ownerRole] || { name: ownerRole, initials: ownerRole.substring(0, 2).toUpperCase(), avatar: null };
};

export function WorkflowTimeline({ isOpen, onOpenChange, steps, currentStep, onTransition }) {
    const currentIndex = steps.findIndex(s => s.id === currentStep?.id);

    const getStepStatus = (step, index) => {
        if (index < currentIndex) return 'completed';
        if (index === currentIndex) return 'current';
        return 'future';
    };

    const handleStepClick = (step) => {
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

                <div className="py-6">
                    <div className="relative">
                        {steps.map((step, index) => {
                            const status = getStepStatus(step, index);
                            const isLast = index === steps.length - 1;
                            const ownerPerson = getOwnerPerson(step.owner);

                            return (
                                <div
                                    key={step.id}
                                    onClick={() => handleStepClick(step)}
                                    className="relative flex gap-4 cursor-pointer group"
                                >
                                    {/* Icon + Vertical Line */}
                                    <div className="flex flex-col items-center">
                                        {/* Icon */}
                                        <div className={cn(
                                            "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center z-10 transition-all",
                                            status === 'completed' && "bg-emerald-500 text-white",
                                            status === 'current' && "bg-white border-2 border-blue-500",
                                            status === 'future' && "bg-slate-100 border border-slate-200"
                                        )}>
                                            {status === 'completed' ? (
                                                <CheckCircle2 className="h-4 w-4" />
                                            ) : status === 'current' ? (
                                                <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                                            ) : (
                                                <Circle className="h-3 w-3 text-slate-300" />
                                            )}
                                        </div>

                                        {/* Vertical Line */}
                                        {!isLast && (
                                            <div className={cn(
                                                "w-0.5 flex-1 min-h-[40px]",
                                                status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                                            )} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={cn(
                                        "flex-1 pb-6 min-w-0 transition-all rounded-lg -ml-1 pl-1",
                                        status === 'completed' && "group-hover:bg-emerald-50",
                                        status === 'current' && "group-hover:bg-blue-50",
                                        status === 'future' && "group-hover:bg-slate-50"
                                    )}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm font-semibold leading-tight",
                                                    status === 'current' && "text-blue-700",
                                                    status === 'completed' && "text-slate-700",
                                                    status === 'future' && "text-slate-400"
                                                )}>
                                                    {step.subState || step.fullName}
                                                </p>

                                                {/* Owner with Avatar */}
                                                <div className={cn(
                                                    "flex items-center gap-1.5 mt-1.5",
                                                    status === 'future' && "opacity-50"
                                                )}>
                                                    <Avatar className="h-5 w-5">
                                                        <AvatarImage src={ownerPerson.avatar} />
                                                        <AvatarFallback className={cn(
                                                            "text-[9px] font-medium",
                                                            status === 'completed' && "bg-emerald-100 text-emerald-700",
                                                            status === 'current' && "bg-blue-100 text-blue-700",
                                                            status === 'future' && "bg-slate-100 text-slate-400"
                                                        )}>
                                                            {ownerPerson.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className={cn(
                                                        "text-xs",
                                                        status === 'future' ? "text-slate-300" : "text-slate-500"
                                                    )}>
                                                        {ownerPerson.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            {status === 'completed' && (
                                                <span className="text-xs text-slate-400 whitespace-nowrap font-medium">
                                                    {step.completedDate || '02/02/2026'}
                                                </span>
                                            )}
                                            {status === 'current' && (
                                                <span className="text-xs text-blue-500 whitespace-nowrap font-medium">
                                                    In corso
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
