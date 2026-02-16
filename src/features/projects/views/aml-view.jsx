import React, { useState } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { FileUpload } from '@/components/composed/file-upload';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldAlert, Database, AlertTriangle, CheckCircle, Clock, User, ChevronDown } from 'lucide-react';

const AML_OUTCOMES = [
    { value: 'green', label: 'Verde — Nessun rischio', color: 'text-green-600' },
    { value: 'yellow', label: 'Giallo — Attenzione', color: 'text-yellow-600' },
    { value: 'orange', label: 'Arancione — Forzante', color: 'text-orange-600' },
    { value: 'red', label: 'Rosso — Blocco', color: 'text-red-600' },
];

export default function AmlView() {
    const [amlOutcome, setAmlOutcome] = useState('');
    const [dbOutcome, setDbOutcome] = useState('');
    const [notes, setNotes] = useState([
        { id: 1, text: 'Verifica completata senza segnalazioni.', author: 'Stefano Perelli', date: '12/01/2026 14:30' },
    ]);
    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (!newNote.trim()) return;
        setNotes((prev) => [
            { id: Date.now(), text: newNote, author: 'Stefano Perelli', date: new Date().toLocaleString('it-IT') },
            ...prev,
        ]);
        setNewNote('');
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AML Verification */}
                <SectionPanel title="Verifica AML (HAWK)" icon={ShieldAlert}>
                    <div className="space-y-4">
                        <FileUpload label="Carica esito HAWK" accept=".pdf,.doc,.docx" />
                        <div className="space-y-2">
                            <Label>Esito AML</Label>
                            <Select value={amlOutcome} onValueChange={setAmlOutcome}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona esito..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {AML_OUTCOMES.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>
                                            <span className={o.color}>{o.label}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {amlOutcome === 'orange' && (
                            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
                                <div className="flex items-center gap-2 font-semibold mb-1">
                                    <AlertTriangle size={14} />
                                    Verifica Rafforzata Richiesta
                                </div>
                                <p>In caso di esito "Arancione - Forzante" è necessaria documentazione aggiuntiva.</p>
                            </div>
                        )}
                        <Button disabled={!amlOutcome}>Conferma Esito AML</Button>
                    </div>
                </SectionPanel>

                {/* Database Checks */}
                <SectionPanel title="Controllo Banche Dati" icon={Database}>
                    <div className="space-y-4">
                        <FileUpload label="Carica esito Banche Dati" accept=".pdf,.doc,.docx" />
                        <div className="space-y-2">
                            <Label>Esito Banche Dati</Label>
                            <Select value={dbOutcome} onValueChange={setDbOutcome}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona esito..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="clean">Nessuna segnalazione</SelectItem>
                                    <SelectItem value="info">Informazioni presenti</SelectItem>
                                    <SelectItem value="alert">Segnalazioni rilevanti</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button disabled={!dbOutcome}>Conferma Esito BD</Button>
                    </div>
                </SectionPanel>
            </div>

            {/* Notes section */}
            <SectionPanel title="Note di Processo" icon={Clock}>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Textarea
                            placeholder="Aggiungi una nota..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={addNote} disabled={!newNote.trim()} className="self-end">
                            Aggiungi
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {notes.map((note) => (
                            <div key={note.id} className="rounded-lg border p-3 space-y-1">
                                <p className="text-sm">{note.text}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User size={10} />
                                    <span>{note.author}</span>
                                    <span>·</span>
                                    <span>{note.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionPanel>
        </div>
    );
}
