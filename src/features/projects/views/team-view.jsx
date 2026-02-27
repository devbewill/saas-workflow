import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Pencil, Trash2, Phone, Mail } from 'lucide-react';

// --- Team roles config (same logic as before) ---
const TEAM_SLOTS = [
    { role: 'Rete Coach', required: false },
    { role: 'Gestore progetto', required: true },
    { role: 'Professionista', required: true },
    { role: 'Amministratore', required: false },
    { role: 'Impresa', required: false },
    { role: 'Collaboratore', required: false },
];

const ASSIGNED_MEMBERS = [
    {
        role: 'Gestore progetto',
        name: 'Gestore4 Rete Test Demo',
        phone: '+393335689759',
        email: 'quaglieri+gest4test@hdconsulting.biz',
        avatar: null,
        registered: true,
    },
    {
        role: 'Professionista',
        name: 'Marta Stanchi',
        phone: '+393335689757',
        email: 'quaglieri+hwprofl@hdconsulting.biz',
        avatar: null,
        registered: true,
    },
];

function TeamCard({ slot }) {
    const member = ASSIGNED_MEMBERS.find((m) => m.role === slot.role);

    if (member) {
        return (
            <div className="flex items-center gap-4 border border-border rounded-md p-4 bg-card">
                {/* Avatar */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={24} className="text-primary/50" />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground truncate">
                            {member.name} — {slot.role}
                        </span>
                        {member.registered && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 border text-[10px] px-1.5 py-0">
                                Registrato
                            </Badge>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5 mt-1">
                        {member.phone && (
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone size={10} /> {member.phone}
                            </span>
                        )}
                        {member.email && (
                            <span className="flex items-center gap-1.5 text-xs text-primary truncate">
                                <Mail size={10} /> {member.email}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Pencil size={13} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                        <Trash2 size={13} />
                    </Button>
                </div>
            </div>
        );
    }

    // Empty slot
    return (
        <div className="flex items-center gap-4 border border-border rounded-md p-4 bg-card">
            {/* Placeholder avatar */}
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <User size={24} className="text-muted-foreground/40" />
            </div>

            {/* Role label */}
            <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">{slot.role}</span>
                {slot.required && (
                    <p className="text-xs text-muted-foreground mt-0.5">Ruolo obbligatorio</p>
                )}
            </div>

            {/* Invite */}
            <Button variant="outline" size="sm" className="flex-shrink-0">
                Invita
            </Button>
        </div>
    );
}

export default function TeamView() {
    return (
        <div className="pt-4 space-y-4">
            <div>
                <h2 className="text-lg font-bold text-foreground">Team di lavoro</h2>
                <p className="text-sm text-muted-foreground">Qui trovi i contatti delle persone coinvolte nel progetto</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TEAM_SLOTS.map((slot) => (
                    <TeamCard key={slot.role} slot={slot} />
                ))}
            </div>
        </div>
    );
}
