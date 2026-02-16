import React, { useState } from 'react';
import { PageHeader } from '@/components/composed/page-header';
import { SectionPanel } from '@/components/composed/section-panel';
import { StatCard } from '@/components/composed/stat-card';
import { InfoGrid } from '@/components/composed/info-grid';
import { StatusBadge } from '@/components/composed/status-badge';
import { SearchInput } from '@/components/composed/search-input';
import { UserAvatar } from '@/components/composed/user-avatar';
import { FileUpload } from '@/components/composed/file-upload';
import { Checklist } from '@/components/composed/checklist';
import { EmptyState } from '@/components/composed/empty-state';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip } from '@/components/ui/tooltip';

import {
    FileText, Settings, Heart, AlertTriangle, Inbox, ChevronDown, Users, Wallet, Info,
    Globe, Lock, MessageSquare, User, Check, Loader2, ShieldAlert, Database,
    CheckCircle2, Circle, Upload, PenTool
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DesignSystemPage() {
    const [checklistItems, setChecklistItems] = useState([
        { id: 'item-1', label: 'Verifica documenti', checked: true },
        { id: 'item-2', label: 'Controllo AML completato', checked: false },
        { id: 'item-3', label: 'Firma digitale ottenuta', checked: false },
    ]);

    const handleChecklistChange = (id, checked) => {
        setChecklistItems((prev) => prev.map((item) => item.id === id ? { ...item, checked } : item));
    };

    // --- States for interactive demos ---
    const [isPublic, setIsPublic] = useState(true);
    const [demoNote, setDemoNote] = useState('');
    const [demoNotes, setDemoNotes] = useState([
        { id: 1, text: 'Verifica completata senza segnalazioni.', author: 'Marco Bianchi', date: '08/02/2026 14:30', isPublic: true },
        { id: 2, text: 'Nota interna per il team legale.', author: 'Laura Rossi', date: '07/02/2026 10:15', isPublic: false },
    ]);
    const [riskOutcome, setRiskOutcome] = useState('arancione');

    const addDemoNote = () => {
        if (!demoNote.trim()) return;
        setDemoNotes((prev) => [
            { id: Date.now(), text: demoNote, author: 'Stefano Perelli', date: new Date().toLocaleString('it-IT'), isPublic },
            ...prev,
        ]);
        setDemoNote('');
    };

    // Risk config helper
    const getRiskConfig = (outcome) => {
        if (!outcome) return { color: 'bg-muted', textColor: 'text-muted-foreground', label: 'Non valutato', icon: '?' };
        if (outcome === 'rosso') return { color: 'bg-red-500', textColor: 'text-red-600', label: 'KO', icon: '✕' };
        if (outcome === 'arancione') return { color: 'bg-orange-500', textColor: 'text-orange-600', label: 'Forzante', icon: '⚠' };
        return { color: 'bg-green-500', textColor: 'text-green-600', label: 'Rischio Basso', icon: '✓' };
    };
    const riskConfig = getRiskConfig(riskOutcome);

    // Timeline demo steps
    const timelineSteps = [
        { id: 1, name: 'Onboarding', owner: 'Gestore', status: 'completed' },
        { id: 2, name: 'Verifica AML', owner: 'Back Office', status: 'completed' },
        { id: 3, name: 'Delibera', owner: 'Commissione', status: 'current' },
        { id: 4, name: 'Stipula', owner: 'Notaio', status: 'future' },
        { id: 5, name: 'Erogazione', owner: 'Banca', status: 'future' },
    ];

    return (
        <>
            <PageHeader title="Design System" subtitle="Catalogo completo dei componenti UI della piattaforma" />

            <Tabs defaultValue="primitivi" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="primitivi">Primitivi (shadcn/ui)</TabsTrigger>
                    <TabsTrigger value="composti">Componenti Composti</TabsTrigger>
                    <TabsTrigger value="patterns">Pattern Applicativi</TabsTrigger>
                </TabsList>

                {/* ===== PRIMITIVI ===== */}
                <TabsContent value="primitivi" className="space-y-8">

                    {/* Button */}
                    <SectionPanel title="Button" description="Pulsanti per azioni e interazioni">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button size="sm">Small</Button>
                                <Button>Default</Button>
                                <Button size="lg">Large</Button>
                                <Button size="icon"><Heart size={16} /></Button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button className="gap-2"><FileText size={14} /> Con Icona</Button>
                                <Button disabled>Disabilitato</Button>
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Badge */}
                    <SectionPanel title="Badge" description="Indicatori di stato e categorizzazione">
                        <div className="flex flex-wrap gap-3">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                        </div>
                    </SectionPanel>

                    {/* Card */}
                    <SectionPanel title="Card" description="Contenitore principale per raggruppare informazioni">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Titolo Card</CardTitle>
                                    <CardDescription>Descrizione opzionale della card.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Contenuto della card con qualsiasi tipo di contenuto.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" size="sm">Azione</Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-sm">Card senza header — utilizzabile per contenuti semplici.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </SectionPanel>

                    {/* Input + Label + Textarea */}
                    <SectionPanel title="Input / Textarea" description="Campi di testo per form e filtri">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                            <div className="space-y-2">
                                <Label htmlFor="demo-input">Label standard</Label>
                                <Input id="demo-input" placeholder="Placeholder..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Input disabilitato</Label>
                                <Input disabled placeholder="Non modificabile" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Note aggiuntive</Label>
                                <Textarea placeholder="Scrivi una nota..." />
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Select */}
                    <SectionPanel title="Select" description="Menu a tendina per selezioni">
                        <div className="max-w-xs">
                            <Label>Seleziona un ruolo</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Scegli..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Amministratore</SelectItem>
                                    <SelectItem value="gestore">Gestore</SelectItem>
                                    <SelectItem value="tech">Tech Support</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </SectionPanel>

                    {/* Checkbox + Switch */}
                    <SectionPanel title="Checkbox / Switch" description="Elementi per selezioni booleane">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Checkbox id="ds-check" />
                                <Label htmlFor="ds-check">Accetto i termini</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch id="ds-switch" />
                                <Label htmlFor="ds-switch">Notifiche email</Label>
                            </div>
                            {/* NEW: Visibility switch pattern */}
                            <div className="flex items-center gap-3 pt-2 border-t">
                                <Switch
                                    id="ds-visibility"
                                    checked={isPublic}
                                    onCheckedChange={setIsPublic}
                                />
                                <Label htmlFor="ds-visibility" className="flex items-center gap-1.5 cursor-pointer">
                                    {isPublic ? <Globe size={14} /> : <Lock size={14} />}
                                    {isPublic ? 'Nota Pubblica' : 'Nota Privata'}
                                </Label>
                                <span className="text-xs text-muted-foreground ml-2">
                                    — Pattern usato nelle note processo
                                </span>
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Avatar */}
                    <SectionPanel title="Avatar" description="Visualizzazione utente con iniziali">
                        <div className="flex gap-4 items-center">
                            <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">SP</AvatarFallback></Avatar>
                            <Avatar className="h-10 w-10"><AvatarFallback>SP</AvatarFallback></Avatar>
                            <Avatar className="h-12 w-12"><AvatarFallback className="text-lg">SP</AvatarFallback></Avatar>
                        </div>
                    </SectionPanel>

                    {/* Table */}
                    <SectionPanel title="Table" description="Tabelle dati con header, body and row styling">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Stato</TableHead>
                                    <TableHead className="text-right">Valore</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow><TableCell>001</TableCell><TableCell>Progetto Alpha</TableCell><TableCell><Badge>Attivo</Badge></TableCell><TableCell className="text-right">€ 25.000</TableCell></TableRow>
                                <TableRow><TableCell>002</TableCell><TableCell>Progetto Beta</TableCell><TableCell><Badge variant="outline">Draft</Badge></TableCell><TableCell className="text-right">€ 18.500</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </SectionPanel>

                    {/* Tabs */}
                    <SectionPanel title="Tabs" description="Navigazione a schede">
                        <Tabs defaultValue="tab1">
                            <TabsList>
                                <TabsTrigger value="tab1">Primo</TabsTrigger>
                                <TabsTrigger value="tab2">Secondo</TabsTrigger>
                                <TabsTrigger value="tab3">Terzo</TabsTrigger>
                            </TabsList>
                            <TabsContent value="tab1"><p className="text-sm text-muted-foreground pt-2">Contenuto del primo tab.</p></TabsContent>
                            <TabsContent value="tab2"><p className="text-sm text-muted-foreground pt-2">Contenuto del secondo tab.</p></TabsContent>
                            <TabsContent value="tab3"><p className="text-sm text-muted-foreground pt-2">Contenuto del terzo tab.</p></TabsContent>
                        </Tabs>
                    </SectionPanel>

                    {/* Accordion */}
                    <SectionPanel title="Accordion" description="Sezioni espandibili">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Come funziona?</AccordionTrigger>
                                <AccordionContent>L'accordion permette di nascondere e mostrare contenuti senza occupare spazio.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>È personalizzabile?</AccordionTrigger>
                                <AccordionContent>Sì, puoi utilizzare qualsiasi contenuto all'interno dell'accordion.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </SectionPanel>

                    {/* Sheet */}
                    <SectionPanel title="Sheet" description="Pannello laterale per azioni contestuali">
                        <div className="flex gap-3">
                            <Sheet>
                                <SheetTrigger asChild><Button variant="outline">Apri Sheet (Destra)</Button></SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Titolo Sheet</SheetTitle>
                                        <SheetDescription>Descrizione del pannello laterale.</SheetDescription>
                                    </SheetHeader>
                                    <p className="text-sm text-muted-foreground mt-4">Contenuto del pannello.</p>
                                </SheetContent>
                            </Sheet>
                            <Sheet>
                                <SheetTrigger asChild><Button variant="outline">Apri Sheet (Sinistra)</Button></SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader><SheetTitle>Side: Left</SheetTitle></SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </SectionPanel>

                    {/* DropdownMenu */}
                    <SectionPanel title="Dropdown Menu" description="Menu contestuale per azioni">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    Azioni <ChevronDown size={14} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Modifica</DropdownMenuItem>
                                <DropdownMenuItem>Duplica</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Elimina</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SectionPanel>

                    {/* Tooltip */}
                    <SectionPanel title="Tooltip" description="Informazioni al passaggio del mouse">
                        <Tooltip content="Questo è un tooltip informativo">
                            <Button variant="outline" size="icon"><Info size={16} /></Button>
                        </Tooltip>
                    </SectionPanel>

                </TabsContent>

                {/* ===== COMPOSTI ===== */}
                <TabsContent value="composti" className="space-y-8">

                    {/* StatCard */}
                    <SectionPanel title="StatCard" description="Card per metriche e KPI">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard label="Progetti Totali" value="1,240" icon={FileText}>
                                <p className="text-xs text-green-600 mt-1">+12% dal mese scorso</p>
                            </StatCard>
                            <StatCard label="Wallet Attivi" value="156" icon={Wallet} />
                            <StatCard label="Team Members" value="24" icon={Users} />
                        </div>
                    </SectionPanel>

                    {/* InfoGrid */}
                    <SectionPanel title="InfoGrid" description="Griglia label:valore per dati strutturati">
                        <InfoGrid items={[
                            { label: 'Nome', value: 'Condominio Einaudi' },
                            { label: 'Codice Fiscale', value: '80012345678' },
                            { label: 'Tipologia', value: 'Supercondominio' },
                            { label: 'Unità', value: '48' },
                        ]} columns={2} />
                    </SectionPanel>

                    {/* StatusBadge */}
                    <SectionPanel title="StatusBadge" description="Badge semantico per stati del dominio">
                        <div className="flex flex-wrap gap-3">
                            <StatusBadge status="Validato" />
                            <StatusBadge status="Da validare" />
                            <StatusBadge status="Da caricare" />
                            <StatusBadge status="Aperta">Aperta - Verifica</StatusBadge>
                            <StatusBadge status="attivo">Wallet Attivo</StatusBadge>
                            <StatusBadge status="paid">Pagato</StatusBadge>
                        </div>
                    </SectionPanel>

                    {/* SearchInput */}
                    <SectionPanel title="SearchInput" description="Input con icona di ricerca">
                        <SearchInput placeholder="Cerca un progetto..." className="max-w-sm" />
                    </SectionPanel>

                    {/* PageHeader */}
                    <SectionPanel title="PageHeader" description="Intestazione pagina con status e owner inline">
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Condominio Einaudi</h1>
                                    <span className="flex items-center gap-2 flex-wrap text-muted-foreground">
                                        Pratica #P001 · HD - 110
                                        <StatusBadge status="Aperta" />
                                        <span className="text-xs text-muted-foreground">· In carico a: Marco Bianchi</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Timeline</Button>
                                    <Button variant="outline" size="sm">Assistente</Button>
                                </div>
                            </div>
                        </div>
                    </SectionPanel>

                    {/* UserAvatar */}
                    <SectionPanel title="UserAvatar" description="Avatar con nome ed email">
                        <div className="flex flex-col gap-4">
                            <UserAvatar name="Stefano Perelli" email="stefano@blueprint.it" size="sm" />
                            <UserAvatar name="Stefano Perelli" email="stefano@blueprint.it" />
                            <UserAvatar name="Stefano Perelli" email="stefano@blueprint.it" size="lg" />
                        </div>
                    </SectionPanel>

                    {/* FileUpload */}
                    <SectionPanel title="FileUpload" description="Area di caricamento file">
                        <div className="max-w-sm">
                            <FileUpload label="Carica documento HAWK" accept=".pdf,.doc" />
                        </div>
                    </SectionPanel>

                    {/* Checklist */}
                    <SectionPanel title="Checklist" description="Lista interattiva con checkbox">
                        <Checklist items={checklistItems} onChange={handleChecklistChange} />
                    </SectionPanel>

                    {/* EmptyState */}
                    <SectionPanel title="EmptyState" description="Placeholder per aree vuote">
                        <EmptyState icon={Inbox} title="Nessun risultato" description="Non ci sono elementi da mostrare in questa sezione." />
                    </SectionPanel>

                    {/* SectionPanel (self-referencing) */}
                    <SectionPanel
                        title="SectionPanel"
                        description="Card titolata — è il componente che stai vedendo adesso!"
                        icon={Settings}
                        actions={<Button variant="outline" size="sm">Azione</Button>}
                    >
                        <p className="text-sm text-muted-foreground">SectionPanel è il wrapper più usato nell'app per raggruppare contenuti con titolo, icona e azioni.</p>
                    </SectionPanel>

                </TabsContent>

                {/* ===== PATTERN APPLICATIVI ===== */}
                <TabsContent value="patterns" className="space-y-8">

                    {/* Timeline with 3-state steps */}
                    <SectionPanel title="Timeline Workflow" icon={Loader2} description="Rappresentazione verticale degli step con stati completato/corrente/futuro, linea di connessione e badge">
                        <div className="max-w-md">
                            {timelineSteps.map((step, i) => {
                                const isLast = i === timelineSteps.length - 1;
                                return (
                                    <div key={step.id} className="relative flex gap-4 group">
                                        {/* Icon + Vertical line */}
                                        <div className="flex flex-col items-center">
                                            <div className={cn(
                                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold z-10 transition-all',
                                                step.status === 'completed' && 'bg-accent text-accent-foreground',
                                                step.status === 'current' && 'bg-orange-400 text-white shadow-md',
                                                step.status === 'future' && 'bg-muted text-muted-foreground border border-border'
                                            )}>
                                                {step.status === 'completed' ? (
                                                    <Check size={14} />
                                                ) : step.status === 'current' ? (
                                                    <Loader2 size={14} className="animate-spin" />
                                                ) : (
                                                    <span>{i + 1}</span>
                                                )}
                                            </div>
                                            {!isLast && (
                                                <div className={cn(
                                                    'w-0.5 flex-1 min-h-[28px]',
                                                    step.status === 'completed' ? 'bg-accent' : 'bg-border'
                                                )} />
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className={cn(
                                            'flex-1 pb-5 pt-0.5 min-w-0',
                                            step.status === 'future' && 'opacity-50 group-hover:opacity-80'
                                        )}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        'text-sm font-semibold leading-tight',
                                                        step.status === 'current' && 'text-orange-500',
                                                        step.status === 'completed' && 'text-foreground',
                                                        step.status === 'future' && 'text-muted-foreground'
                                                    )}>{step.name}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{step.owner}</p>
                                                </div>
                                                {step.status === 'current' && (
                                                    <Badge className="bg-orange-400 text-white border-none animate-pulse shrink-0">In corso</Badge>
                                                )}
                                                {step.status === 'completed' && (
                                                    <Badge variant="outline" className="text-muted-foreground shrink-0">Completato</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionPanel>

                    {/* Risk Indicator */}
                    <SectionPanel title="Indicatore di Rischio" icon={ShieldAlert} description="Cerchio colorato dinamico usato nella verifica AML e Banche Dati">
                        <div className="flex flex-wrap items-start gap-8">
                            {/* Interactive demo */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center py-4 border-y border-dashed rounded-lg bg-muted/30 px-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg transition-all',
                                            riskConfig.color
                                        )}>
                                            {riskConfig.icon}
                                        </div>
                                        <span className={cn('text-xs font-bold tracking-wider', riskConfig.textColor)}>
                                            {riskConfig.label}
                                        </span>
                                    </div>
                                </div>
                                <Select value={riskOutcome} onValueChange={setRiskOutcome}>
                                    <SelectTrigger className="w-[220px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="verde">Verde — Rischio Basso</SelectItem>
                                        <SelectItem value="arancione">Arancione — Forzante</SelectItem>
                                        <SelectItem value="rosso">Rosso — KO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* All states side by side */}
                            <div className="flex gap-6">
                                {[
                                    { color: 'bg-green-500', textColor: 'text-green-600', icon: '✓', label: 'Positivo' },
                                    { color: 'bg-orange-500', textColor: 'text-orange-600', icon: '⚠', label: 'Forzante' },
                                    { color: 'bg-red-500', textColor: 'text-red-600', icon: '✕', label: 'KO' },
                                ].map((cfg) => (
                                    <div key={cfg.label} className="flex flex-col items-center gap-1">
                                        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow', cfg.color)}>
                                            {cfg.icon}
                                        </div>
                                        <span className={cn('text-[10px] font-bold', cfg.textColor)}>{cfg.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Forzante Warning */}
                    <SectionPanel title="Componente Forzante" icon={AlertTriangle} description="Warning alert + upload aggiuntivo visibile quando l'esito AML è 'Arancione — Forzante'">
                        <div className="max-w-lg space-y-3">
                            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                                <div className="flex items-center gap-2 font-semibold mb-1">
                                    <AlertTriangle size={16} />
                                    Verifica Rafforzata Richiesta
                                </div>
                                <p>In caso di esito "Arancione — Forzante" è necessaria una verifica rafforzata con documentazione aggiuntiva obbligatoria.</p>
                            </div>
                            <FileUpload label="Carica documentazione rafforzata" accept=".pdf,.doc,.docx" />
                            <Textarea placeholder="Motivazione della forzatura..." rows={3} />
                        </div>
                    </SectionPanel>

                    {/* Note di Processo */}
                    <SectionPanel title="Note di Processo" icon={MessageSquare} description="Sezione note con switch pubblica/privata — ogni processo (AML, Banche Dati) ha le proprie note indipendenti">
                        <div className="max-w-lg space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={14} className="text-primary" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Note Verifica AML</span>
                                </div>
                                <Badge variant="outline" className="text-xs">{demoNotes.length} note</Badge>
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Scrivi una nota per il team..."
                                    value={demoNote}
                                    onChange={(e) => setDemoNote(e.target.value)}
                                    rows={2}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="ds-note-vis"
                                            checked={isPublic}
                                            onCheckedChange={setIsPublic}
                                        />
                                        <Label htmlFor="ds-note-vis" className="text-xs cursor-pointer flex items-center gap-1.5">
                                            {isPublic ? <Globe size={12} /> : <Lock size={12} />}
                                            {isPublic ? 'Pubblica' : 'Privata'}
                                        </Label>
                                    </div>
                                    <Button onClick={addDemoNote} disabled={!demoNote.trim()} size="sm">
                                        Aggiungi
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                {demoNotes.map((note) => (
                                    <div key={note.id} className="rounded-lg border p-3 space-y-1">
                                        <p className="text-sm">{note.text}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">
                                                {note.author} · {note.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                {note.isPublic ? <Globe size={10} /> : <Lock size={10} />}
                                                {note.isPublic ? 'Pubblica' : 'Privata'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Document Row States */}
                    <SectionPanel title="Riga Documento" icon={FileText} description="Pattern tabellare documenti con indicatore upload, CTA note per tutti i documenti, e visibilità nota">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10"></TableHead>
                                    <TableHead>Documento</TableHead>
                                    <TableHead>File</TableHead>
                                    <TableHead>Stato</TableHead>
                                    <TableHead>Firma</TableHead>
                                    <TableHead>Note</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Uploaded */}
                                <TableRow>
                                    <TableCell><CheckCircle2 size={16} className="text-green-600" /></TableCell>
                                    <TableCell className="font-medium">Ricevuta consegna</TableCell>
                                    <TableCell><span className="text-sm text-primary cursor-pointer hover:underline">ricevuta_consegna.pdf</span></TableCell>
                                    <TableCell><StatusBadge status="Validato" /></TableCell>
                                    <TableCell><PenTool size={14} className="text-green-600" /></TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <MessageSquare size={12} /> 2
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {/* Pending upload */}
                                <TableRow className="opacity-50">
                                    <TableCell><Circle size={16} className="text-muted-foreground" /></TableCell>
                                    <TableCell className="font-medium">Foglio informativo</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                                            <Upload size={12} /> Carica
                                        </Button>
                                    </TableCell>
                                    <TableCell><StatusBadge status="Da caricare" /></TableCell>
                                    <TableCell><PenTool size={14} className="text-muted-foreground" /></TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <MessageSquare size={12} /> +
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </SectionPanel>

                    {/* Condomino Dots Pattern */}
                    <SectionPanel title="Condomino Dots" icon={Users} description="Pattern compatto per visualizzare lo stato di multipli wallet (es. condomini) in una tabella, con espansione all'hover">
                        <div className="flex items-center gap-8 p-4 border rounded-lg">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-semibold text-muted-foreground">Stato Normale</span>
                                <div className="flex -space-x-1.5 px-2 py-1">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <div key={i} className={cn(
                                            "w-3.5 h-3.5 rounded-full border-2 border-white ring-1 shadow-sm",
                                            i < 3 ? "bg-emerald-500 ring-emerald-200" : "bg-amber-500 ring-amber-200"
                                        )} />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-semibold text-muted-foreground">Hover State (Espanso)</span>
                                <div className="flex space-x-1 px-2 py-1 rounded-full bg-slate-100 transition-all">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <div key={i} className={cn(
                                            "w-3.5 h-3.5 rounded-full border-2 border-white ring-1 shadow-sm hover:scale-125 cursor-pointer",
                                            i < 3 ? "bg-emerald-500 ring-emerald-200" : "bg-amber-500 ring-amber-200"
                                        )} title={`Unit ${i + 1}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground max-w-[200px]">
                                <p>Utilizzato nella vista <strong>Gestore</strong> per mostrare a colpo d'occhio lo stato di attivazione di tutti i condomini di un progetto.</p>
                            </div>
                        </div>
                    </SectionPanel>

                </TabsContent>
            </Tabs>
        </>
    );
}
