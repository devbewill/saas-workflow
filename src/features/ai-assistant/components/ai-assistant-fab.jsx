import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, X } from 'lucide-react';
import { AiAssistantSheet } from './ai-assistant-sheet';
import { cn } from "@/lib/utils";

export function AiAssistantFab() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                {/* Notification Badge / Teaser (optional, simulated for now) */}
                <Button
                    onClick={() => setOpen(!open)}
                    size="icon"
                    className={cn(
                        "h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95",
                        open
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-900 rotate-90"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/30"
                    )}
                >
                    {open ? <X size={24} /> : <Sparkles size={24} />}
                </Button>
            </div>

            <AiAssistantSheet open={open} onOpenChange={setOpen} />
        </>
    );
}
