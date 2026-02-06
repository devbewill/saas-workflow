/**
 * OperatorAssistantSheet - Contextual help panel for operators
 * Uses configuration from assistant-config.js
 */
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
            <SheetContent className="flex flex-col h-full p-0 sm:max-w-md">
                <div className="flex-1 overflow-y-auto p-6">
                    <SheetHeader>
                        <SheetTitle>Supporto Operatore</SheetTitle>
                        <SheetDescription>Supporto guidato per la lavorazione.</SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6 py-6">
                        {/* Phase Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                    Fase Corrente
                                </Badge>
                            </div>
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <h3 className="font-semibold text-lg">{config.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium uppercase text-muted-foreground">Checklist Operativa</h4>
                            <div className="rounded-lg border p-4 space-y-3">
                                {requirements.map(req => (
                                    <div key={req.id} className="flex items-center gap-3">
                                        {req.checked ? (
                                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                                        )}
                                        <span className={cn("text-sm", req.checked ? "font-medium" : "text-muted-foreground")}>
                                            {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning if exists */}
                        {config.warning && (
                            <div className={cn(
                                "p-4 rounded-lg flex gap-3 text-sm",
                                config.warning.type === 'warning'
                                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                                    : "bg-blue-50 text-blue-800 border border-blue-200"
                            )}>
                                {config.warning.type === 'warning' ? (
                                    <AlertTriangle className="h-5 w-5 shrink-0" />
                                ) : (
                                    <Info className="h-5 w-5 shrink-0" />
                                )}
                                <div>
                                    <p className="font-bold">{config.warning.title}</p>
                                    <p>{config.warning.message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <SheetFooter className="p-6 border-t bg-slate-50 flex-col gap-2 sm:flex-col sm:space-x-0 mt-auto">
                    <Button disabled={!allRequirementsMet} className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" /> {config.proceedLabel}
                    </Button>
                    <Button variant="destructive" className="w-full">
                        Manda in KO
                    </Button>
                    <Button variant="link" className="w-full">
                        Segnala un problema
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
