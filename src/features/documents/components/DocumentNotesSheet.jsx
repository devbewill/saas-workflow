import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    MessageSquare,
    User,
    Calendar,
    Clock,
    History,
    Lock,
    Globe,
    AlertCircle,
    Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DocumentNotesSheet({ document, isOpen, onOpenChange }) {
    const [noteText, setNoteText] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    // Mock notes data for demonstration
    const [notes, setNotes] = useState([
        {
            id: 1,
            text: "Documento verificato correttamente. Tutti i campi sono conformi.",
            author: "Mario Rossi",
            date: "12/02/2026",
            time: "14:30",
            version: "documento corrente",
            isPublic: false
        },
        {
            id: 2,
            text: "Richiesta integrazione per la pagina 3 (firma poco leggibile).",
            author: "Giuseppe Verdi",
            date: "10/02/2026",
            time: "10:15",
            version: "documento sostituito",
            isPublic: true
        }
    ]);

    const handleAddNote = () => {
        if (!noteText.trim()) return;

        const newNote = {
            id: Date.now(),
            text: noteText,
            author: "User Admin", // Mocked user
            date: new Date().toLocaleDateString('it-IT'),
            time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            version: "v1.3", // Mocked current version
            isPublic: isPublic
        };

        setNotes([newNote, ...notes]);
        setNoteText('');
        setIsPublic(false);
    };

    if (!document) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col h-full w-full sm:max-w-md p-0">
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="p-6 border-b">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                Note Documento
                            </SheetTitle>
                            <SheetDescription>
                                Aggiungi un nota al documento: <br /> <span className="font-semibold text-foreground">{document.name}</span>
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <ScrollArea className="flex-1 px-6 py-4">
                        <div className="space-y-6">
                            {/* Previous Notes List */}
                            <div className="space-y-4">
                                {notes.map((note) => (
                                    <div key={note.id} className="rounded-lg border bg-card p-4 shadow-sm space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{note.author}</p>
                                                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> {note.date}
                                                        <span className="mx-1">•</span>
                                                        <Clock className="h-3 w-3" /> {note.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] h-5 bg-slate-50">
                                                <History className="h-3 w-3 mr-1" /> {note.version}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                            {note.text}
                                        </p>

                                        <div className="flex items-center pt-1 border-t border-slate-50 mt-2">
                                            {note.isPublic ? (
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px] gap-1 px-1.5 border-blue-100">
                                                    <Globe className="h-3 w-3" /> Pubblica
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-slate-500 text-[10px] gap-1 px-1.5 border-slate-200">
                                                    <Lock className="h-3 w-3" /> Privata
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Fixed Footer with Input Form */}
                <div className="p-6 border-t bg-slate-50/50 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-0.5">
                            Nuova Nota
                        </label>
                        <Textarea
                            placeholder="Scrivi qui la tua nota..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="bg-background resize-none h-24 text-sm"
                        />
                    </div>

                    <div className="flex items-center justify-between bg-background p-3 rounded-lg border shadow-sm">
                        <div className="flex items-center gap-3">
                            <Switch
                                checked={isPublic}
                                onCheckedChange={setIsPublic}
                            />
                            <div className="flex flex-col">
                                <span className="text-xs font-medium">Nota pubblica</span>
                                <span className="text-[10px] text-muted-foreground">Visibile a tutte le applicazioni HD che vedono questo documento</span>
                            </div>
                        </div>

                        {isPublic && (
                            <Tooltip
                                content="Attenzione: questa nota sarà visibile da tutte le piattaforme che condividono questo documento"
                                className="bg-amber-600 border-amber-700"
                            >
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                            </Tooltip>
                        )}
                    </div>

                    <Button className="w-full" onClick={handleAddNote} disabled={!noteText.trim()}>
                        <Send className="h-4 w-4 mr-2" /> Aggiungi Nota
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
