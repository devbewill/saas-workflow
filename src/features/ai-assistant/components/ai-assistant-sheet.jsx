import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Send, Sparkles, FileCode, Camera, GitCommit, Bot, User,
    CheckCircle2, Loader2, Download
} from 'lucide-react';
import { cn } from "@/lib/utils";

export function AiAssistantSheet({ open, onOpenChange }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Cosa vuoi simulare?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Mock Actions State
    const [isGeneratingSpec, setIsGeneratingSpec] = useState(false);
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
    const [isCommitting, setIsCommitting] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                role: 'assistant',
                content: "Ho ricevuto la tua richiesta. Essendo una demo, non posso ancora elaborare codice reale, ma posso simulare le azioni dai pulsanti qui sotto!"
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleGenerateSpec = () => {
        setIsGeneratingSpec(true);
        // Simulate generation
        setTimeout(() => {
            setIsGeneratingSpec(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "✅ Specifica tecnica generata con successo! Il file `technical_spec.md` è pronto per il download."
            }]);
        }, 2000);
    };

    const handleScreenshot = () => {
        setIsTakingScreenshot(true);
        // Simulate screenshot
        setTimeout(() => {
            setIsTakingScreenshot(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "📸 Screenshot del flusso catturato! Salvato in `/screenshots/flow_capture_001.png`."
            }]);
        }, 1500);
    };

    const handleCommitPush = () => {
        setIsCommitting(true);
        // Simulate git operation
        setTimeout(() => {
            setIsCommitting(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "🚀 Modifiche committate e pushate su `origin/feature-ai-support`!"
            }]);
        }, 2500);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l-slate-200 shadow-2xl">
                <SheetHeader className="pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg shadow-indigo-500/20">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <SheetTitle className="text-lg font-black tracking-tight text-slate-900">AI Dev Assistant</SheetTitle>
                        </div>
                    </div>
                </SheetHeader>

                {/* Chat Area */}
                <div className="flex-1 overflow-hidden relative -mx-6 px-6 bg-slate-50/50">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-4 py-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                                    <Avatar className={cn("w-8 h-8 border border-white shadow-sm", msg.role === 'assistant' ? "bg-indigo-100" : "bg-slate-200")}>
                                        <AvatarFallback className={cn("text-xs font-bold", msg.role === 'assistant' ? "text-indigo-600" : "text-slate-600")}>
                                            {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={cn(
                                        "rounded-2xl px-4 py-3 text-sm shadow-sm max-w-[85%]",
                                        msg.role === 'user'
                                            ? "bg-slate-900 text-white rounded-tr-sm"
                                            : "bg-white border border-slate-100 text-slate-600 rounded-tl-sm"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <Avatar className="w-8 h-8 bg-indigo-50 border border-indigo-100">
                                        <AvatarFallback><Loader2 size={14} className="animate-spin text-indigo-500" /></AvatarFallback>
                                    </Avatar>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </div>

                {/* Actions Bar */}
                <div className="py-2 grid grid-cols-3 gap-2">
                    <Button
                        variant="outline"
                        className="h-auto py-3 flex flex-col gap-1 items-center bg-white border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
                        onClick={handleGenerateSpec}
                        disabled={isGeneratingSpec}
                    >
                        {isGeneratingSpec ? <Loader2 size={16} className="animate-spin" /> : <FileCode size={16} />}
                        <span className="text-[10px] font-bold">Genera Spec</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto py-3 flex flex-col gap-1 items-center bg-white border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
                        onClick={handleScreenshot}
                        disabled={isTakingScreenshot}
                    >
                        {isTakingScreenshot ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                        <span className="text-[10px] font-bold">Screenshot</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto py-3 flex flex-col gap-1 items-center bg-white border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all"
                        onClick={handleCommitPush}
                        disabled={isCommitting}
                    >
                        {isCommitting ? <Loader2 size={16} className="animate-spin" /> : <GitCommit size={16} />}
                        <span className="text-[10px] font-bold">Commit & Push</span>
                    </Button>
                </div>

                {/* Input Area */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                    <form
                        className="flex gap-2"
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    >
                        <Input
                            placeholder="Chiedi qualcosa all'assistente..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
                        />
                        <Button type="submit" size="icon" className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20">
                            <Send size={16} />
                        </Button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-400">AI can make mistakes. Review generated code.</p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
