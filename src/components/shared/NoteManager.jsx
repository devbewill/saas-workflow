import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NoteManager({ notes = [], onAddNote, title = "Note di processo" }) {
    const [newNote, setNewNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        onAddNote(newNote);
        setNewNote('');
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-slate-400" />
                <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-full font-medium">
                    {notes.length}
                </span>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="relative group">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Aggiungi una nota sull'attività offline..."
                    rows={3}
                    className="w-full px-3 py-2 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 resize-none transition-all group-hover:bg-white"
                />
                <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className={cn(
                        "absolute right-2 bottom-2 p-2 rounded-lg transition-all",
                        newNote.trim()
                            ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                >
                    <Send size={16} />
                </button>
            </form>

            {/* Notes List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {notes.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl">
                        <p className="text-xs text-slate-400 italic">Nessuna nota presente</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={note.user.avatar} />
                                <AvatarFallback className="bg-primary-50 text-primary-700 text-[10px] font-bold">
                                    {note.user.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900">{note.user.name}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {note.date} • {note.time}
                                    </span>
                                </div>
                                <div className="bg-slate-50 rounded-lg rounded-tl-none p-2.5 border border-slate-100">
                                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
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
