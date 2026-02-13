/**
 * TeamView - View for managing team roles and assignments
 * Based on original AtomicTeamTab.jsx
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail, Shield, ShieldCheck } from 'lucide-react';

const REQUIRED_ROLES = [
    { id: 'supervisor', label: 'Supervisore', description: 'Responsabile supervisione pratica', mandatory: true, icon: ShieldCheck },
    { id: 'admin', label: 'Amministratore', description: 'Amministratore del condominio', mandatory: true, icon: Shield },
    { id: 'frontoffice', label: 'Frontoffice', description: 'Gestione contatti e raccolta dati', mandatory: false, icon: UserPlus },
    { id: 'backoffice', label: 'Backoffice', description: 'Verifica tecnica e documentale', mandatory: false, icon: UserPlus },
    { id: 'middleoffice', label: 'Middleoffice', description: 'Coordinamento interno', mandatory: false, icon: UserPlus },
    { id: 'credit', label: 'Ufficio Crediti', description: 'Valutazione finanziaria', mandatory: false, icon: UserPlus },
    { id: 'deliberating', label: 'Organo Deliberante', description: 'Approvazione finale', mandatory: false, icon: UserPlus },
];

// Mock Users for auto-complete/select
const MOCK_USERS = [
    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@example.com', avatar: 'MR' },
    { id: 2, name: 'Luca Bianchi', email: 'luca.bianchi@example.com', avatar: 'LB' },
    { id: 3, name: 'Giulia Verdi', email: 'giulia.verdi@example.com', avatar: 'GV' },
];

export default function TeamView({ project }) {
    const [assignments, setAssignments] = useState({
        supervisor: { ...MOCK_USERS[0], assignedAt: '01/02/2026' }, // Supervisor default
        admin: { name: 'Dr. Studio Amministrativo', email: 'studio@admin.com', avatar: 'SA', assignedAt: '01/02/2026' }, // Admin assigned
        frontoffice: null,
        backoffice: null,
        middleoffice: null,
        credit: null,
        deliberating: null
    });

    const [inviteEmail, setInviteEmail] = useState('');
    const [selectedRoleForInvite, setSelectedRoleForInvite] = useState(null);

    const handleAssign = (roleId, user) => {
        setAssignments(prev => ({
            ...prev,
            [roleId]: { ...user, assignedAt: new Date().toLocaleDateString('it-IT') }
        }));
    };

    const handleInvite = (roleId) => {
        if (!inviteEmail) return;
        // Mock invite
        alert(`Invito inviato a ${inviteEmail} per il ruolo ${roleId}`);
        setAssignments(prev => ({
            ...prev,
            [roleId]: { name: inviteEmail.split('@')[0], email: inviteEmail, avatar: '??', assignedAt: 'In attesa' }
        }));
        setInviteEmail('');
        setSelectedRoleForInvite(null);
    };

    return (
        <div className="grid gap-6">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold tracking-tight text-primary">Gestione team</h3>
                <p className="text-muted-foreground">
                    Assegna i ruoli necessari per la gestione del progetto. Il supervisore è obbligatorio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REQUIRED_ROLES.map((role) => {
                    const assignedUser = assignments[role.id];
                    const isInviteOpen = selectedRoleForInvite === role.id;
                    const Icon = role.icon;

                    return (
                        <Card key={role.id} className={cn(
                            "transition-all rounded-2xl",
                            assignedUser ? "border-primary/20 bg-primary/5 shadow-sm" : "border-dashed border-muted"
                        )}>
                            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 tracking-tight text-primary">
                                        {role.label}
                                        {role.mandatory && <Badge variant="secondary" className="text-[9px] h-5 font-bold uppercase bg-slate-100 text-slate-500">Richiesto</Badge>}
                                        {assignedUser && <Badge variant="outline" className="text-[9px] h-5 bg-white text-accent border-accent/20 font-bold uppercase">Assegnato</Badge>}
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {role.description}
                                    </CardDescription>
                                </div>
                                <div className={cn("p-2 rounded-xl", assignedUser ? "bg-white text-accent shadow-sm" : "bg-muted/20 text-muted-foreground")}>
                                    <Icon size={16} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {assignedUser ? (
                                    <div className="flex items-center gap-4">
                                        <Avatar className="border-2 border-white shadow-sm">
                                            <AvatarImage src={`https://avatar.vercel.sh/${assignedUser.email}`} />
                                            <AvatarFallback>{assignedUser.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{assignedUser.name}</p>
                                            <div className="flex items-center text-xs text-muted-foreground gap-2">
                                                <Mail size={12} /> {assignedUser.email}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-primary hover:bg-white rounded-lg px-3"
                                            onClick={() => {
                                                if (window.confirm(`Vuoi sostituire l'utente assegnato al ruolo ${role.label}?`)) {
                                                    setAssignments(p => ({ ...p, [role.id]: null }));
                                                }
                                            }}
                                        >
                                            Sostituisci
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {!isInviteOpen ? (
                                            <div className="flex flex-col gap-2">
                                                <Select onValueChange={(val) => handleAssign(role.id, MOCK_USERS.find(u => u.id.toString() === val))}>
                                                    <SelectTrigger className="h-9 bg-white">
                                                        <SelectValue placeholder="Seleziona da anagrafica..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {MOCK_USERS.map(user => (
                                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                                {user.name} ({user.email})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <span className="w-full border-t" />
                                                    </div>
                                                    <div className="relative flex justify-center text-xs uppercase">
                                                        <span className="bg-background px-2 text-muted-foreground">Oppure</span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="w-full bg-white rounded-xl border-border hover:bg-slate-50 text-[10px] font-bold tracking-widest" onClick={() => setSelectedRoleForInvite(role.id)}>
                                                    <Mail className="mr-2 h-3 w-3" /> Invita tramite Email
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    placeholder="email@esempio.com"
                                                    className="h-9 text-sm bg-white"
                                                    value={inviteEmail}
                                                    onChange={(e) => setInviteEmail(e.target.value)}
                                                />
                                                <Button size="sm" className="rounded-xl bg-primary text-white" onClick={() => handleInvite(role.id)}>Invia</Button>
                                                <Button variant="ghost" size="sm" onClick={() => setSelectedRoleForInvite(null)}>X</Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
