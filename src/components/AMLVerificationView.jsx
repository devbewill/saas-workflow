/**
 * AMLVerificationView - View for AML check states
 * Two-column side-by-side layout for Verifica AML and Controllo Banche Dati
 */
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Upload, Eye, Trash2, FileText, Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function NoteManager({ notes = [], onAddNote, title = "NOTE DI PROCESSO" }) {
    const [newNote, setNewNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        onAddNote(newNote);
        setNewNote('');
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-accent" />
                    <h4 className="text-[10px] font-bold tracking-widest text-primary">{title}</h4>
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[9px] px-2 py-0 border-none">
                    {notes.length} messaggi
                </Badge>
            </div>

            {/* Input Area - Refined */}
            <form onSubmit={handleSubmit} className="relative group">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Scrivi una nota per il team..."
                    rows={3}
                    className="w-full px-4 py-3 pr-14 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium transition-all placeholder:text-muted-foreground/50 focus:bg-white focus:ring-2 focus:ring-accent/10 focus:border-accent outline-none resize-none"
                />
                <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className={cn(
                        "absolute right-3 bottom-3 p-2.5 rounded-xl transition-all shadow-sm active:scale-95",
                        newNote.trim()
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                >
                    <Send size={16} />
                </button>
            </form>

            {/* Notes List - Elegant Timeline Style */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {notes.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                        <MessageSquare className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Nessuna nota presente</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="flex gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <Avatar className="h-9 w-9 flex-shrink-0 border-2 border-white shadow-sm">
                                <AvatarImage src={note.user.avatar} />
                                <AvatarFallback className="bg-primary text-white text-[10px] font-bold">
                                    {note.user.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-primary tracking-tight">{note.user.name}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                                        {note.date} • {note.time}
                                    </span>
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-border/50 shadow-sm shadow-black/[0.02]">
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap tracking-tight">
                                        {note.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function AMLVerificationView({ project }) {
    const [amlOutcome, setAmlOutcome] = useState('Rosso - Alto');
    const [dbOutcome, setDbOutcome] = useState('Verde - Positivo');
    const [hawkDocument, setHawkDocument] = useState(null);
    const [dbDocument, setDbDocument] = useState({
        name: 'Esito_banche_dati.pdf',
        date: '03/02/2026'
    });

    // Notes State
    const [amlNotes, setAmlNotes] = useState([
        {
            id: '1',
            content: "Richiesta adeguata verifica rafforzata inviata via mail.",
            date: "08/02/2026",
            time: "14:30",
            user: { name: "Marco Bianchi", initials: "MB", avatar: null }
        }
    ]);

    const [dbNotes, setDbNotes] = useState([
        {
            id: '1',
            content: "Controllo CRIF effettuato con successo. Nessuna segnalazione rilevante.",
            date: "07/02/2026",
            time: "10:15",
            user: { name: "Laura Rossi", initials: "LR", avatar: null }
        }
    ]);

    const handleAddAmlNote = (content) => {
        const newNote = {
            id: Date.now().toString(),
            content,
            date: new Date().toLocaleDateString('it-IT'),
            time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            user: { name: "Stefano Perelli", initials: "SP", avatar: null }
        };
        setAmlNotes([newNote, ...amlNotes]);
    };

    const handleAddDbNote = (content) => {
        const newNote = {
            id: Date.now().toString(),
            content,
            date: new Date().toLocaleDateString('it-IT'),
            time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            user: { name: "Stefano Perelli", initials: "SP", avatar: null }
        };
        setDbNotes([newNote, ...dbNotes]);
    };

    // Dynamic risk configuration based on selection
    const getRiskConfig = (outcome) => {
        if (outcome.includes('Rosso')) {
            return {
                color: 'bg-red-500',
                textColor: 'text-red-500',
                label: 'KO',
                icon: '✕'
            };
        } else if (outcome.includes('Arancione')) {
            return {
                color: 'bg-orange-500',
                textColor: 'text-orange-500',
                label: 'Forzante',
                icon: '⚠'
            };
        } else {
            // Verde - Medio or Verde - Basso
            const isMedio = outcome.includes('Medio');
            return {
                color: 'bg-green-500',
                textColor: 'text-green-500',
                label: isMedio ? 'Rischio Medio' : 'Rischio Basso',
                icon: '✓'
            };
        }
    };

    const riskConfig = getRiskConfig(amlOutcome);
    const showWarning = amlOutcome === 'Arancione - Forzante';

    // Dynamic database check configuration
    const getDbConfig = (outcome) => {
        if (outcome.includes('Rosso')) {
            return {
                color: 'bg-red-500',
                textColor: 'text-red-500',
                label: 'KO',
                icon: '✕'
            };
        } else if (outcome.includes('Arancione')) {
            return {
                color: 'bg-orange-500',
                textColor: 'text-orange-500',
                label: 'Da verificare',
                icon: '⚠'
            };
        } else {
            return {
                color: 'bg-green-500',
                textColor: 'text-green-500',
                label: 'Positivo',
                icon: '✓'
            };
        }
    };

    const dbConfig = getDbConfig(dbOutcome);

    // File upload handlers
    const handleHawkUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setHawkDocument({
                name: file.name,
                date: new Date().toLocaleDateString('it-IT')
            });
        }
    };

    const handleDbUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setDbDocument({
                name: file.name,
                date: new Date().toLocaleDateString('it-IT')
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: Verifica AML */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Verifica AML - Profilo di rischio</h3>
                    <AlertTriangle size={20} className="text-amber-500" />
                </div>

                {/* Risk Status Indicator - Dynamic */}
                <div className="flex items-center justify-center py-4 border-y border-dashed border-slate-100">
                    <div className="flex flex-col items-center gap-3">
                        <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-white font-semibold text-2xl animate-in zoom-in-50 duration-500",
                            riskConfig.color
                        )}>
                            {riskConfig.icon}
                        </div>
                        <span className={cn("text-xs font-bold tracking-wider", riskConfig.textColor)}>
                            {riskConfig.label}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Outcome Selector */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">Esito controllo</label>
                        <select
                            value={amlOutcome}
                            onChange={(e) => setAmlOutcome(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                        >
                            <option>Rosso - KO</option>
                            <option>Arancione - Forzante</option>
                            <option>Verde - Medio</option>
                            <option>Verde - Basso</option>
                        </select>
                    </div>

                    {/* Warning Alert - Conditional */}
                    <div className="flex items-end">
                        {showWarning ? (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 w-full animate-in slide-in-from-right-2">
                                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-[11px]">
                                    <p className="font-bold text-amber-900 leading-tight">Verifica rafforzata</p>
                                    <p className="text-amber-700 mt-0.5">Necessarie ulteriori info</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-center w-full">
                                <p className="text-[11px] text-slate-400 font-medium">Nessuna forzatura richiesta</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Document Upload/Display */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Documento Hawk</label>

                    {!hawkDocument ? (
                        <label className="block cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleHawkUpload}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-red-200 bg-red-50/30 rounded-xl p-6 text-center hover:border-red-300 hover:bg-red-50 transition-all group">
                                <Upload size={24} className="mx-auto text-red-300 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-xs text-slate-600 font-semibold italic">Report HAWK mancante</p>
                                <p className="text-[10px] text-slate-400 mt-1">Clicca per caricare l'esito (PDF)</p>
                            </div>
                        </label>
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between group hover:border-primary-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{hawkDocument.name}</p>
                                    <p className="text-[10px] text-slate-500">{hawkDocument.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 hover:bg-white hover:text-primary-600 rounded-lg text-slate-400 transition-all">
                                    <Eye size={14} />
                                </button>
                                <button
                                    onClick={() => setHawkDocument(null)}
                                    className="p-1.5 hover:bg-white hover:text-red-600 rounded-lg text-slate-400 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notes Section - New Component */}
                <div className="flex-1 pt-4 border-t border-slate-100">
                    <NoteManager
                        title="Note Verifica AML"
                        notes={amlNotes}
                        onAddNote={handleAddAmlNote}
                    />
                </div>
            </div>

            {/* Right Panel: Controllo Banche Dati */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Controllo Banche dati</h3>
                    <CheckCircle size={20} className="text-green-500" />
                </div>

                {/* Database Status Indicator - Dynamic */}
                <div className="flex items-center justify-center py-4 border-y border-dashed border-slate-100">
                    <div className="flex flex-col items-center gap-3">
                        <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-white font-semibold text-2xl animate-in zoom-in-50 duration-500",
                            dbConfig.color
                        )}>
                            {dbConfig.icon}
                        </div>
                        <span className={cn("text-xs font-bold tracking-wider", dbConfig.textColor)}>
                            {dbConfig.label}
                        </span>
                    </div>
                </div>

                {/* Outcome Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Esito controllo</label>
                    <select
                        value={dbOutcome}
                        onChange={(e) => setDbOutcome(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                    >
                        <option>Verde - Positivo</option>
                        <option>Arancione - Da verificare</option>
                        <option>Rosso - KO</option>
                    </select>
                </div>

                {/* Document Upload/Display */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Documento esito banche dati</label>

                    {!dbDocument ? (
                        <label className="block cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleDbUpload}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-slate-200 bg-slate-50/30 rounded-xl p-6 text-center hover:border-slate-300 hover:bg-slate-50 transition-all group">
                                <Upload size={24} className="mx-auto text-slate-300 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-xs text-slate-600 font-semibold italic">Nessun file caricato</p>
                                <p className="text-[10px] text-slate-400 mt-1">Carica il report banche dati (PDF)</p>
                            </div>
                        </label>
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between group hover:border-primary-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{dbDocument.name}</p>
                                    <p className="text-[10px] text-slate-500">{dbDocument.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 hover:bg-white hover:text-primary-600 rounded-lg text-slate-400 transition-all">
                                    <Eye size={14} />
                                </button>
                                <button
                                    onClick={() => setDbDocument(null)}
                                    className="p-1.5 hover:bg-white hover:text-red-600 rounded-lg text-slate-400 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notes Section - New Component */}
                <div className="flex-1 pt-4 border-t border-slate-100">
                    <NoteManager
                        title="Note Banche Dati"
                        notes={dbNotes}
                        onAddNote={handleAddDbNote}
                    />
                </div>
            </div>
        </div>
    );
}
