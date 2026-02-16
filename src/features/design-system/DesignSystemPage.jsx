import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Search, Mail, Lock, User, Bell, Save, Trash2, Plus } from "lucide-react";

const Section = ({ title, description, children }) => (
    <section className="space-y-4">
        <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-primary">{title}</h2>
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        <div className="grid gap-8 mt-6">
            {children}
        </div>
    </section>
);

const ComponentGroup = ({ label, children }) => (
    <div className="space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</h3>
        <div className="flex flex-wrap gap-4 items-center">
            {children}
        </div>
    </div>
);

export default function DesignSystemPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                    Design System
                </div>
                <h1 className="text-4xl font-black tracking-tight text-primary">BluePrint UI Engine</h1>
                <p className="text-lg text-slate-500 max-w-2xl">
                    Una libreria di componenti atomici e molecolari costruita per la massima coerenza visiva e velocità di sviluppo nelle applicazioni del gruppo.
                </p>
            </header>

            {/* BUTTONS */}
            <Section
                title="Buttons"
                description="L'elemento interattivo primario. Supporta diverse varianti per comunicare gerarchia e intento."
            >
                <ComponentGroup label="Varianti">
                    <Button variant="default">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="destructiveOutline">Destructive Outline</Button>
                </ComponentGroup>

                <ComponentGroup label="Dimensioni">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Plus size={18} /></Button>
                </ComponentGroup>

                <ComponentGroup label="Con Icone">
                    <Button className="gap-2"><Save size={16} /> Salva modifiche</Button>
                    <Button variant="outline" className="gap-2"><Bell size={16} /> Notifiche</Button>
                    <Button variant="destructive" className="gap-2"><Trash2 size={16} /> Elimina</Button>
                </ComponentGroup>

                <ComponentGroup label="Stati">
                    <Button disabled>Disabled Button</Button>
                    <Button variant="secondary" disabled>Disabled Secondary</Button>
                </ComponentGroup>
            </Section>

            {/* INPUTS */}
            <Section
                title="Inputs & Forms"
                description="Elementi di input standardizzati con supporto per etichette, icone e stati di validazione."
            >
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input id="nome" placeholder="Es. Mario Rossi" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Aziendale</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="email" className="pl-10" placeholder="m.rossi@azienda.it" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="pass">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="pass" type="password" className="pl-10" placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="search">Ricerca Universale</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="search" className="pl-10 rounded-md" placeholder="Cerca pratiche, utenti..." />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ACCORDION */}
            <Section
                title="Accordion"
                description="Utilizzato per organizzare contenuti densi in sezioni collassabili. Ottimo per FAQ o dettagli tecnici."
            >
                <Card className="border-none shadow-xl shadow-black/[0.03] overflow-hidden rounded-2xl">
                    <CardContent className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-b border-slate-100 px-6">
                                <AccordionTrigger className="hover:no-underline font-bold text-primary">
                                    Come funziona il sistema di permessi?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 pb-6">
                                    Il sistema utilizza un modello RBAC (Role-Based Access Control) per gestire le autorizzazioni a livello di applicazione e progetto.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-b border-slate-100 px-6">
                                <AccordionTrigger className="hover:no-underline font-bold text-primary">
                                    Posso esportare i dati in Excel?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 pb-6">
                                    Sì, ogni tabella del sistema supporta l'esportazione in formato CSV ed XLSX tramite il menu "Azioni" in alto a destra.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border-none px-6">
                                <AccordionTrigger className="hover:no-underline font-bold text-primary">
                                    Quali sono i requisiti di sicurezza per le password?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 pb-6">
                                    Le password devono contenere almeno 12 caratteri, una lettera maiuscola, un numero e un carattere speciale.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </Section>

            {/* BADGES */}
            <Section
                title="Badges & Indicators"
                description="Piccoli elementi di stato utilizzati per categorizzare o indicare condizioni di workflow."
            >
                <div className="grid md:grid-cols-2 gap-8">
                    <ComponentGroup label="Varianti Base">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </ComponentGroup>

                    <ComponentGroup label="Stati di Business">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50">ATTIVO</Badge>
                        <Badge className="bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100/50">PENDENTE</Badge>
                        <Badge className="bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100/50">DA ATTIVARE</Badge>
                    </ComponentGroup>
                </div>

                <ComponentGroup label="Micro-indicatori">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                </ComponentGroup>
            </Section>

            {/* TABLES */}
            <Section
                title="Data Tables"
                description="Organizzazione dei dati in righe e colonne con allineamenti tipografici ottimizzati."
            >
                <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-xl shadow-black/[0.02]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">ID Pratica</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Oggetto</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Data</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 text-right">Importo</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 text-right pr-6">Stato</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: 'PR-1024', subject: 'Ristrutturazione Facciate', date: '12/02/2026', amount: 45000.00, status: 'active' },
                                { id: 'PR-1025', subject: 'Efficientamento Energetico', date: '08/02/2026', amount: 125000.00, status: 'pending' },
                                { id: 'PR-1026', subject: 'Installazione Impianto Fotovoltaico', date: '05/01/2026', amount: 18450.00, status: 'paid' },
                            ].map((row) => (
                                <TableRow key={row.id} className="hover:bg-slate-50/30 transition-colors">
                                    <TableCell className="font-bold text-xs text-primary">{row.id}</TableCell>
                                    <TableCell className="text-xs text-slate-600 font-medium">{row.subject}</TableCell>
                                    <TableCell className="text-xs text-slate-400">{row.date}</TableCell>
                                    <TableCell className="text-xs font-bold text-primary text-right">
                                        {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(row.amount)}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        {row.status === 'active' && <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">ATTIVO</Badge>}
                                        {row.status === 'pending' && <Badge className="bg-amber-50 text-amber-700 border-amber-100">IN ATTESA</Badge>}
                                        {row.status === 'paid' && <Badge variant="outline" className="border-emerald-200 text-emerald-600">PAGATO</Badge>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Section>

            <footer className="pt-12 border-t border-slate-100 text-center flex flex-col items-center gap-4">
                <div className="flex gap-6 text-slate-300">
                    <Save size={18} />
                    <Trash2 size={18} />
                    <Bell size={18} />
                    <Plus size={18} />
                </div>
                <p className="text-sm text-slate-400 font-medium">
                    BluePrint Design System v1.2.0 • Progetto riservato uso interno
                </p>
            </footer>
        </div>
    );
}
