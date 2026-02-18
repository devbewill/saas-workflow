import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Calculator, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_CRITERIA = [
    { id: 1, domanda: `Percentuale proprietari/affittuari`, description: `Rapporto tra proprietari residenti e affittuari.`, peso: 1.0, voto: 0, tooltipData: [`100% -> 1`, `<25% -> 5`] },
    { id: 2, domanda: `Grandezza condominio`, description: `Numero di unità abitative totali.`, peso: 1.0, voto: 0, tooltipData: [`≤8 unità -> 2`, `9-60 -> 4`, `>60 -> 2`] },
    { id: 3, domanda: `Zona di riferimento`, description: `Prestigio e contesto della zona urbana.`, peso: 1.0, voto: 0, tooltipData: [`Degradata -> 2`, `Normale -> 3`, `Lusso -> 5`] },
    { id: 4, domanda: `Ceto dei proprietari`, description: `Profilo socio-economico prevalente.`, peso: 1.0, voto: 0, tooltipData: [`Basso -> 2`, `Medio -> 3`, `Alto -> 4`] },
    { id: 5, domanda: `Andamento dei bilanci`, description: `Situazione finanziaria e deficit.`, peso: 1.5, voto: 0, tooltipData: [`>20% deficit -> -5`, `<0% -> 4`] },
    { id: 6, domanda: `Presenza decreti ingiuntivi`, description: `Azioni legali in corso contro il condominio.`, peso: 1.5, voto: 0, tooltipData: [`Sì -> -5`, `No -> 3`] },
    { id: 7, domanda: `% morosità condomini`, description: `Percentuale di condomini non in regola con i pagamenti.`, peso: 2.0, voto: 0, tooltipData: [`>20% -> -5`, `0-5% -> 3`] },
    { id: 8, domanda: `Risparmio per lavoro svolto`, description: `Efficienza economica dell'intervento.`, peso: 1.5, voto: 0, tooltipData: [`0-5% -> 0`, `>50% -> 5`] },
    { id: 9, domanda: `Valore medio mq`, description: `Prezzo di mercato al metro quadro.`, peso: 1.0, voto: 0, tooltipData: [`<1500€ -> 1`, `≥8000€ -> 5`] },
    { id: 10, domanda: `Classe energetica POST`, description: `Classe energetica prevista a fine lavori.`, peso: 1.0, voto: 0, tooltipData: [`A -> 5`, `G -> 0`] },
    { id: 11, domanda: `Quota spesa condòmino`, description: `Impatto economico medio per singola unità.`, peso: 1.0, voto: 0, tooltipData: [`>20k€ -> 2`, `≤20k€ -> 4`] },
    { id: 12, domanda: `Spesa riscaldamento annua`, description: `Costi energetici medi annui.`, peso: 1.0, voto: 0, tooltipData: [`<500€ -> 2`, `>2000€ -> 4`] },
];

export default function ScoringView({ project }) {
    const [criteria, setCriteria] = useState(INITIAL_CRITERIA);
    const [condoId, setCondoId] = useState(project?.displayId || '');
    const [isOpen, setIsOpen] = useState(false);

    const handleVoteChange = (id, value) => {
        const numValue = parseFloat(value) || 0;
        setCriteria(prev => prev.map(c => 
            c.id === id ? { ...c, voto: numValue, punteggio: numValue * c.peso } : c
        ));
    };

    const calculationResults = useMemo(() => {
        const totalPunteggio = criteria.reduce((acc, curr) => acc + (curr.voto * curr.peso), 0);
        const media = totalPunteggio / criteria.length;
        const allFilled = criteria.every(c => c.voto !== 0);

        let grade = { label: 'C', color: 'bg-red-500' };
        if (media >= 4.00) grade = { label: 'A1', color: 'bg-green-500' };
        else if (media >= 2.91) grade = { label: 'A2', color: 'bg-green-300 text-green-900' };
        else if (media >= 1.91) grade = { label: 'B1', color: 'bg-yellow-400 text-yellow-900' };
        else if (media >= 1.21) grade = { label: 'B2', color: 'bg-orange-400' };

        return { media, grade, allFilled };
    }, [criteria]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Rating Condominio</CardTitle>
                            <CardDescription>Valutazione dello stato di salute e del rischio del condominio.</CardDescription>
                        </div>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button className="gap-2">
                                    <Calculator size={16} />
                                    Vedi Scoring
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-[800px] overflow-y-auto">
                                <SheetHeader className="mb-6">
                                    <SheetTitle className="flex items-center gap-2">
                                        <Calculator className="text-primary" />
                                        Condo Rating Oracle
                                    </SheetTitle>
                                    <SheetDescription>
                                        Inserisci i parametri per calcolare il rating del condominio #{condoId}
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                        <div className="grid gap-1.5 flex-1">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ID Condominio</label>
                                            <Input 
                                                value={condoId} 
                                                onChange={(e) => setCondoId(e.target.value)}
                                                placeholder="Es. COND-001"
                                                className="bg-background"
                                            />
                                        </div>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-muted/30">
                                                <TableRow>
                                                    <TableHead className="w-[40%] text-xs uppercase">Criterio</TableHead>
                                                    <TableHead className="text-center text-xs uppercase">Peso</TableHead>
                                                    <TableHead className="w-[100px] text-center text-xs uppercase">Voto</TableHead>
                                                    <TableHead className="text-right text-xs uppercase">Punteggio</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {criteria.map((c) => (
                                                    <TableRow key={c.id} className="hover:bg-muted/20">
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium">{c.domanda}</span>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Info size={14} className="text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="max-w-[300px] p-3">
                                                                            <p className="font-semibold mb-1">{c.description}</p>
                                                                            <ul className="text-xs list-disc list-inside space-y-1">
                                                                                {c.tooltipData.map((t, i) => (
                                                                                    <li key={i}>{t}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge variant="outline" className="font-mono text-[10px] px-1.5">
                                                                x{c.peso.toFixed(1)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input 
                                                                type="number" 
                                                                step="0.1"
                                                                className="h-8 text-center px-1"
                                                                value={c.voto === 0 ? '' : c.voto}
                                                                onChange={(e) => handleVoteChange(c.id, e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono font-medium">
                                                            {(c.voto * c.peso).toFixed(2)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Result Section */}
                                    <div className={cn(
                                        "transition-all duration-500 ease-in-out p-6 rounded-xl border-2 flex flex-col items-center gap-4",
                                        calculationResults.allFilled ? "bg-background border-primary" : "bg-muted/30 border-dashed border-muted-foreground/30 opacity-60"
                                    )}>
                                        {!calculationResults.allFilled && (
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <AlertCircle size={18} />
                                                <span className="text-sm font-medium">Completa tutti i 12 campi per visualizzare il risultato finale</span>
                                            </div>
                                        )}

                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Rating Finale</span>
                                            <div className={cn(
                                                "w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-xl transition-all scale-100",
                                                calculationResults.allFilled ? calculationResults.grade.color : "bg-muted text-muted-foreground/50 grayscale",
                                                calculationResults.allFilled && "animate-in zoom-in-50 duration-300"
                                            )}>
                                                {calculationResults.allFilled ? calculationResults.grade.label : "?"}
                                            </div>
                                            <div className="mt-2 text-center">
                                                <p className="text-2xl font-bold font-mono">
                                                    {calculationResults.media.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-muted-foreground uppercase">Punteggio Medio</p>
                                            </div>
                                        </div>

                                        <div className="w-full grid grid-cols-5 gap-1 mt-4">
                                            {[
                                                { label: 'C', range: '< 1.21', color: 'bg-red-500' },
                                                { label: 'B2', range: '1.21-1.90', color: 'bg-orange-400' },
                                                { label: 'B1', range: '1.91-2.90', color: 'bg-yellow-400' },
                                                { label: 'A2', range: '2.91-3.99', color: 'bg-green-300' },
                                                { label: 'A1', range: '≥ 4.00', color: 'bg-green-500' },
                                            ].map((r) => (
                                                <div key={r.label} className="flex flex-col items-center gap-1">
                                                    <div className={cn(
                                                        "w-full h-1.5 rounded-full transition-opacity",
                                                        r.color,
                                                        calculationResults.grade.label === r.label ? "opacity-100 ring-2 ring-offset-2 ring-primary" : "opacity-30"
                                                    )} />
                                                    <span className="text-[10px] font-bold">{r.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button 
                                            disabled={!calculationResults.allFilled} 
                                            className="w-full mt-4 gap-2 h-12 text-lg shadow-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Save size={18} />
                                            Salva Valutazione
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center justify-center p-8 border rounded-xl bg-muted/20 border-dashed">
                             <Calculator className="w-12 h-12 text-muted-foreground/40 mb-3" />
                             <p className="text-sm text-muted-foreground text-center">Nessuna valutazione salvata per questo condominio.</p>
                             <p className="text-xs text-muted-foreground/60 mt-1">Usa il tasto "Vedi Scoring" per iniziare.</p>
                        </div>
                        
                        <div className="md:col-span-2 space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <Info size={16} className="text-primary" />
                                Come funziona il calcolo?
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="font-medium">Pesi Differenziati</p>
                                    <p className="text-xs text-muted-foreground mt-1">Criteri come morosità e bilanci hanno un impatto maggiore sul punteggio finale (fino a 2.0x).</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="font-medium">Grading Alfanumerico</p>
                                    <p className="text-xs text-muted-foreground mt-1">Da A1 (Eccellente) a C (Critico) basato sulla media ponderata di 12 parametri chiave.</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="font-medium">Real-time Feedback</p>
                                    <p className="text-xs text-muted-foreground mt-1">Il punteggio si aggiorna istantaneamente durante l'inserimento dei dati dell'analista.</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="font-medium">Supporto Operativo</p>
                                    <p className="text-xs text-muted-foreground mt-1">Ogni riga include suggerimenti di input per garantire coerenza nella valutazione.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
