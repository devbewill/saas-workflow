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

import { FileText, Settings, Heart, AlertTriangle, Inbox, ChevronDown, Users, Wallet, Info } from 'lucide-react';

export default function DesignSystemPage() {
    const [checklistItems, setChecklistItems] = useState([
        { id: 'item-1', label: 'Verifica documenti', checked: true },
        { id: 'item-2', label: 'Controllo AML completato', checked: false },
        { id: 'item-3', label: 'Firma digitale ottenuta', checked: false },
    ]);

    const handleChecklistChange = (id, checked) => {
        setChecklistItems((prev) => prev.map((item) => item.id === id ? { ...item, checked } : item));
    };

    return (
        <>
            <PageHeader title="Design System" subtitle="Catalogo completo dei componenti UI della piattaforma" />

            <Tabs defaultValue="primitivi" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="primitivi">Primitivi (shadcn/ui)</TabsTrigger>
                    <TabsTrigger value="composti">Componenti Composti</TabsTrigger>
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
                    <SectionPanel title="PageHeader" description="Intestazione pagina con azioni (demo non interattiva)">
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Titolo Pagina</h1>
                                    <p className="text-muted-foreground">Sottotitolo con descrizione</p>
                                </div>
                                <Button>Azione</Button>
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
            </Tabs>
        </>
    );
}
