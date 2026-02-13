import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAssistantConfig } from '@/config/assistant-config';

export function OperatorAssistantSheet({ isOpen, onOpenChange, configKey }) {
    const config = getAssistantConfig(configKey);

    if (!config) {
        return null;
    }

    const requirements = config.requirements || [];
    const allRequirementsMet = requirements.every(req => req.checked);

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col h-full p-0 sm:max-w-md bg-white/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 border-b border-border/40">
                        <SheetHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-6 w-1 bg-accent rounded-full"></div>
                                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Intelligenza Artificiale</span>
                            </div>
                            <SheetTitle className="text-2xl font-bold tracking-tight text-primary">Assistente operativo</SheetTitle>
                            <SheetDescription className="font-medium text-slate-500">
                                Supporto dinamico per la lavorazione della fase corrente.
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <div className="space-y-8 p-8">
                        {/* Phase Info */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Contesto lavorazione</h4>
                            <div className="rounded-2xl border border-border/60 bg-slate-50/50 p-6 shadow-sm">
                                <h3 className="font-bold text-xl text-primary tracking-tight leading-tight">{config.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium mt-2 leading-relaxed">{config.description}</p>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Requisiti di fase</h4>
                            <div className="space-y-3">
                                {requirements.map(req => (
                                    <div key={req.id} className={cn(
                                        "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                                        req.checked
                                            ? "bg-accent/[0.03] border-accent/20"
                                            : "bg-white border-border/50 shadow-sm"
                                    )}>
                                        <div className={cn(
                                            "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                                            req.checked ? "bg-accent text-white" : "bg-slate-100 text-slate-300"
                                        )}>
                                            {req.checked ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <Circle className="h-4 w-4" />
                                            )}
                                        </div>
                                        <span className={cn(
                                            "text-sm tracking-tight",
                                            req.checked ? "font-bold text-primary" : "font-medium text-slate-500"
                                        )}>
                                            {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning if exists */}
                        {config.warning && (
                            <div className={cn(
                                "p-6 rounded-2xl flex gap-4 text-sm shadow-sm",
                                config.warning.type === 'warning'
                                    ? "bg-amber-50/50 text-amber-900 border border-amber-200/50"
                                    : "bg-blue-50/50 text-blue-900 border border-blue-200/50"
                            )}>
                                {config.warning.type === 'warning' ? (
                                    <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
                                ) : (
                                    <Info className="h-6 w-6 text-blue-500 shrink-0" />
                                )}
                                <div className="space-y-1">
                                    <p className="font-bold text-xs tracking-wider uppercase">{config.warning.title}</p>
                                    <p className="font-medium leading-relaxed italic">{config.warning.message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <SheetFooter className="p-8 border-t border-border/40 bg-slate-50/50 flex flex-col gap-3 sm:flex-col sm:space-x-0">
                    <Button disabled={!allRequirementsMet} className="w-full h-12 rounded-xl font-bold tracking-tight bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all active:scale-95">
                        <CheckCircle className="mr-2 h-4 w-4" /> {config.proceedLabel}
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-xs">
                            Manda in KO
                        </Button>
                        <Button variant="link" className="flex-1 h-11 rounded-xl font-bold text-slate-500 transition-colors text-xs">
                            Segnala errore
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
