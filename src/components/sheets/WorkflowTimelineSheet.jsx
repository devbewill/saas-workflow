import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Circle, Loader2 } from 'lucide-react';
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

export function WorkflowTimelineSheet({ isOpen, onOpenChange, steps, currentStep, onTransition }) {
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
            <SheetContent className="flex flex-col h-full p-0 sm:max-w-md bg-white/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 border-b border-border/40">
                        <SheetHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-6 w-1 bg-accent rounded-full"></div>
                                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Workflow</span>
                            </div>
                            <SheetTitle className="text-2xl font-bold tracking-tight text-primary">Timeline Operativa</SheetTitle>
                            <SheetDescription className="font-medium text-slate-500">
                                Gestione e controllo del flusso di lavoro corrente.
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <div className="p-8">
                        <div className="relative space-y-0">
                            {steps.map((step, index) => {
                                const status = getStepStatus(step, index);
                                const isLast = index === steps.length - 1;
                                const ownerPerson = getOwnerPerson(step.owner);

                                return (
                                    <div
                                        key={step.id}
                                        onClick={() => handleStepClick(step)}
                                        className="relative flex gap-6 group cursor-pointer"
                                    >
                                        {/* Icon + Vertical Line */}
                                        <div className="flex flex-col items-center">
                                            {/* Icon Container */}
                                            <div className={cn(
                                                "flex-shrink-0 h-6 w-6 rounded-sm flex items-center justify-center z-10 transition-all duration-300 shadow-sm",
                                                status === 'completed' && "bg-accent text-accent-foreground",
                                                status === 'current' && "bg-orange-400 text-white shadow-md",
                                                status === 'future' && "bg-slate-50 border border-slate-200 text-slate-300"
                                            )}>
                                                {status === 'completed' ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : status === 'current' ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <span className="text-[9px] font-bold">{index + 1}</span>
                                                )}
                                            </div>

                                            {/* Vertical Line */}
                                            {!isLast && (
                                                <div className={cn(
                                                    "w-0.5 flex-1 min-h-[30px] transition-colors duration-500",
                                                    status === 'completed' ? "bg-accent" : "bg-slate-200"
                                                )} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={cn(
                                            "flex-1 pb-4 pt-1 min-w-0 transition-all",
                                            status === 'current' ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                                        )}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "text-sm font-bold tracking-tight leading-none mb-2 transition-colors",
                                                        status === 'current' && "text-orange-400",
                                                        status === 'completed' && "text-primary",
                                                        status === 'future' && "text-slate-400"
                                                    )}>
                                                        {(step.subState || step.fullName)}
                                                    </p>

                                                    {/* Owner with Avatar */}
                                                    <div className={cn(
                                                        "flex items-center gap-2 mt-3",
                                                        status === 'future' && "opacity-60"
                                                    )}>
                                                        <Avatar className="h-6 w-6 shadow-sm">
                                                            <AvatarImage src={ownerPerson.avatar} />
                                                            <AvatarFallback className={cn(
                                                                "text-[9px] font-bold",
                                                                status === 'completed' && "bg-accent/10 text-accent",
                                                                status === 'current' && "bg-orange-300 text-accent-foreground",
                                                                status === 'future' && "bg-slate-100 text-slate-400"
                                                            )}>
                                                                {ownerPerson.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className={cn(
                                                                "text-[10px] font-bold tracking-tight uppercase",
                                                                status === 'future' ? "text-slate-300" : "text-slate-500"
                                                            )}>
                                                                Responsabile
                                                            </span>
                                                            <span className={cn(
                                                                "text-[11px] font-bold tracking-tight",
                                                                status === 'future' ? "text-slate-400" : "text-primary"
                                                            )}>
                                                                {ownerPerson.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Status / Date Label */}
                                                <div className="flex flex-col items-end gap-1 text-[10px]">
                                                    {status === 'completed' && (
                                                        <>
                                                            <span className=" font-bold text-slate-400 tracking-widest uppercase">Completato il</span>
                                                            <span className="text-slate-500 font-mono italic">
                                                                {step.completedDate || '02/02/2026'}
                                                            </span>
                                                        </>
                                                    )}
                                                    {status === 'current' && (
                                                        <Badge className="bg-orange-400 text-accent-foreground font-bold px-2 py-0 border-none shadow-sm animate-pulse">
                                                            In corso
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
