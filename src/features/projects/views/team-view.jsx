import React, { useState } from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { UserAvatar } from '@/components/composed/user-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, UserPlus, Mail } from 'lucide-react';

const REQUIRED_ROLES = [
    { role: 'Amministratore', required: true },
    { role: 'Direttore Lavori', required: true },
    { role: 'Impresa Esecutrice', required: true },
    { role: 'Broker', required: false },
];

const ASSIGNED_MEMBERS = [
    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@studio.it', role: 'Amministratore' },
    { id: 2, name: 'Luca Bianchi', email: 'luca.b@impresa.it', role: 'Impresa Esecutrice' },
];

export default function TeamView() {
    return (
        <div className="space-y-6 pt-4">
            {/* Required roles */}
            <SectionPanel title="Ruoli Richiesti" icon={Users}>
                <div className="space-y-3">
                    {REQUIRED_ROLES.map((r, i) => {
                        const assigned = ASSIGNED_MEMBERS.find((m) => m.role === r.role);
                        return (
                            <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <Badge variant={assigned ? 'default' : 'outline'}>{r.role}</Badge>
                                    {r.required && <span className="text-xs text-destructive">Obbligatorio</span>}
                                </div>
                                {assigned ? (
                                    <UserAvatar name={assigned.name} email={assigned.email} />
                                ) : (
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <UserPlus size={12} />
                                        Assegna
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </SectionPanel>

            {/* Team members */}
            <SectionPanel
                title="Membri Assegnati"
                icon={Users}
                actions={
                    <Button variant="outline" size="sm" className="gap-2">
                        <Plus size={12} />
                        Invita
                    </Button>
                }
            >
                <div className="space-y-4">
                    {ASSIGNED_MEMBERS.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                            <UserAvatar name={member.name} email={member.email} />
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{member.role}</Badge>
                                <Button variant="ghost" size="icon">
                                    <Mail size={14} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionPanel>
        </div>
    );
}
