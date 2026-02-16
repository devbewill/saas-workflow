import React, { useState } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { FileUpload } from '@/components/composed/file-upload';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldAlert, Database, AlertTriangle, CheckCircle2, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- AML outcome options ---
const AML_OUTCOMES = [
    { value: 'verde-basso', label: 'Verde — Rischio Basso' },
    { value: 'verde-medio', label: 'Verde — Rischio Medio' },
    { value: 'arancione', label: 'Arancione — Forzante' },
    { value: 'rosso', label: 'Rosso — KO' },
];

const DB_OUTCOMES = [
    { value: 'verde', label: 'Verde — Positivo' },
    { value: 'arancione', label: 'Arancione — Da verificare' },
    { value: 'rosso', label: 'Rosso — KO' },
];

// --- Risk indicator config ---
const getRiskConfig = (outcome) => {
    if (!outcome) return { color: 'bg-muted', textColor: 'text-muted-foreground', label: 'Non valutato', icon: '?' };
    if (outcome.startsWith('rosso')) return { color: 'bg-red-500', textColor: 'text-red-600', label: 'KO', icon: '✕' };
    if (outcome.startsWith('arancione')) return { color: 'bg-orange-500', textColor: 'text-orange-600', label: 'Forzante', icon: '⚠' };
    if (outcome === 'verde-medio') return { color: 'bg-green-500', textColor: 'text-green-600', label: 'Rischio Medio', icon: '✓' };
    return { color: 'bg-green-500', textColor: 'text-green-600', label: 'Rischio Basso', icon: '✓' };
};

const getDbConfig = (outcome) => {
    if (!outcome) return { color: 'bg-muted', textColor: 'text-muted-foreground', label: 'Non valutato', icon: '?' };
    if (outcome === 'rosso') return { color: 'bg-red-500', textColor: 'text-red-600', label: 'KO', icon: '✕' };
    if (outcome === 'arancione') return { color: 'bg-orange-500', textColor: 'text-orange-600', label: 'Da verificare', icon: '⚠' };
    return { color: 'bg-green-500', textColor: 'text-green-600', label: 'Positivo', icon: '✓' };
};

// --- Inline Note Section ---
function NoteSection({ title, notes, onAddNote }) {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (!text.trim()) return;
        onAddNote(text);
        setText('');
    };

    return (
        <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
                </div>
                <Badge variant="outline" className="text-xs">{notes.length} note</Badge>
            </div>
            <div className="flex gap-2">
                <Textarea
                    placeholder="Scrivi una nota per il team..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1"
                    rows={2}
                />
                <Button onClick={handleAdd} disabled={!text.trim()} className="self-end">
                    Aggiungi
                </Button>
            </div>
            <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {notes.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">Nessuna nota presente</p>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="rounded-lg border p-3 space-y-1">
                            <p className="text-sm">{note.text}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <User size={10} />
                                <span>{note.author}</span>
                                <span>·</span>
                                <span>{note.date}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// --- Main Component ---
export default function AmlView() {
    const [amlOutcome, setAmlOutcome] = useState('');
    const [dbOutcome, setDbOutcome] = useState('');

    // Separate notes state for each process
    const [amlNotes, setAmlNotes] = useState([
        { id: 1, text: 'Richiesta adeguata verifica rafforzata inviata via mail.', author: 'Marco Bianchi', date: '08/02/2026 14:30' },
    ]);
    const [dbNotes, setDbNotes] = useState([
        { id: 2, text: 'Controllo CRIF effettuato con successo. Nessuna segnalazione rilevante.', author: 'Laura Rossi', date: '07/02/2026 10:15' },
    ]);

    const addAmlNote = (text) => {
        setAmlNotes((prev) => [
            { id: Date.now(), text, author: 'Stefano Perelli', date: new Date().toLocaleString('it-IT') },
            ...prev,
        ]);
    };

    const addDbNote = (text) => {
        setDbNotes((prev) => [
            { id: Date.now(), text, author: 'Stefano Perelli', date: new Date().toLocaleString('it-IT') },
            ...prev,
        ]);
    };

    const riskConfig = getRiskConfig(amlOutcome);
    const dbConfig = getDbConfig(dbOutcome);
    const isForzante = amlOutcome === 'arancione';

    return (
        <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ========== AML Verification (Left) ========== */}
                <SectionPanel title="Verifica AML (HAWK)" icon={ShieldAlert}>
                    <div className="space-y-4">
                        {/* Risk Indicator */}
                        <div className="flex items-center justify-center py-4 border-y border-dashed">
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

                        {/* Outcome selector */}
                        <div className="space-y-2">
                            <Label>Esito AML</Label>
                            <Select value={amlOutcome} onValueChange={setAmlOutcome}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona esito..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {AML_OUTCOMES.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Forzante warning + extra upload */}
                        {isForzante && (
                            <div className="space-y-3 animate-in slide-in-from-top-2">
                                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                                    <div className="flex items-center gap-2 font-semibold mb-1">
                                        <AlertTriangle size={16} />
                                        Verifica Rafforzata Richiesta
                                    </div>
                                    <p>
                                        In caso di esito "Arancione — Forzante" è necessaria una verifica rafforzata
                                        con documentazione aggiuntiva obbligatoria.
                                    </p>
                                </div>
                                <FileUpload label="Carica documentazione rafforzata" accept=".pdf,.doc,.docx" />
                                <Textarea placeholder="Motivazione della forzatura..." rows={3} />
                            </div>
                        )}

                        {/* HAWK file upload */}
                        <FileUpload label="Carica esito HAWK" accept=".pdf,.doc,.docx" />

                        <Button disabled={!amlOutcome} className="w-full">Conferma Esito AML</Button>

                        {/* AML Notes */}
                        <NoteSection title="Note Verifica AML" notes={amlNotes} onAddNote={addAmlNote} />
                    </div>
                </SectionPanel>

                {/* ========== Database Checks (Right) ========== */}
                <SectionPanel title="Controllo Banche Dati" icon={Database}>
                    <div className="space-y-4">
                        {/* DB Risk Indicator */}
                        <div className="flex items-center justify-center py-4 border-y border-dashed">
                            <div className="flex flex-col items-center gap-2">
                                <div className={cn(
                                    'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg transition-all',
                                    dbConfig.color
                                )}>
                                    {dbConfig.icon}
                                </div>
                                <span className={cn('text-xs font-bold tracking-wider', dbConfig.textColor)}>
                                    {dbConfig.label}
                                </span>
                            </div>
                        </div>

                        {/* Outcome selector */}
                        <div className="space-y-2">
                            <Label>Esito Banche Dati</Label>
                            <Select value={dbOutcome} onValueChange={setDbOutcome}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona esito..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {DB_OUTCOMES.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* BD file upload */}
                        <FileUpload label="Carica esito Banche Dati" accept=".pdf,.doc,.docx" />

                        <Button disabled={!dbOutcome} className="w-full">Conferma Esito BD</Button>

                        {/* BD Notes */}
                        <NoteSection title="Note Banche Dati" notes={dbNotes} onAddNote={addDbNote} />
                    </div>
                </SectionPanel>
            </div>
        </div>
    );
}
