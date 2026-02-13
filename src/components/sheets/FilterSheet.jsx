import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FilterSheet({ isOpen, onOpenChange }) {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col h-full p-0 sm:max-w-md bg-white/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 border-b border-border/40">
                        <SheetHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-6 w-1 bg-accent rounded-full"></div>
                                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Ricerca</span>
                            </div>
                            <SheetTitle className="text-2xl font-bold tracking-tight text-primary">Filtri avanzati</SheetTitle>
                            <SheetDescription className="font-medium text-slate-500">
                                Affina la tua ricerca sui documenti.
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <div className="space-y-6 p-8">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Codice fiscale condominio</label>
                            <input type="text" placeholder="PRLSFN85C01G388H" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Nome aministratore</label>
                            <input type="text" placeholder="Mario Rossi" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Pratica creata da</label>
                            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all appearance-none cursor-pointer">
                                <option>Tutti</option>
                                <option>Broker</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">In carico a</label>
                            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all appearance-none cursor-pointer">
                                <option>Tutti</option>
                                <option>Stefano Perelli</option>
                                <option>Mario Rossi</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Importo da</label>
                                <input type="text" placeholder="€" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Importo a</label>
                                <input type="text" placeholder="€" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-accent/10 outline-none transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="p-8 border-t border-border/40 bg-slate-50/50 flex gap-4">
                    <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold border-border hover:bg-white text-slate-500 transition-colors" onClick={() => onOpenChange(false)}>
                        Deseleziona tutto
                    </Button>
                    <Button className="flex-1 h-11 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all" onClick={() => onOpenChange(false)}>
                        Applica 3 Filtri
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
