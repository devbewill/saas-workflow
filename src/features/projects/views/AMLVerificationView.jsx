/**
 * AMLVerificationView - View for AML check states
 * Dedicated interface for anti-money laundering verification
 */
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle,
    XCircle,
    FileText,
    Upload,
    Database,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AML_OUTCOMES = [
    { id: 'green', label: 'Verde - Nessun rischio', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    { id: 'yellow', label: 'Giallo - Rischio basso', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertTriangle },
    { id: 'orange', label: 'Arancione - Forzante', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: AlertTriangle },
    { id: 'red', label: 'Rosso - KO', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
];

const DATABASE_CHECKS = [
    { id: 'crif', name: 'CRIF', status: 'completed', result: 'Negativo' },
    { id: 'cerved', name: 'CERVED', status: 'completed', result: 'Negativo' },
    { id: 'protesti', name: 'Protesti', status: 'pending', result: null },
    { id: 'pregiudizievoli', name: 'Pregiudizievoli', status: 'pending', result: null },
];

export default function AMLVerificationView({ project }) {
    const [selectedOutcome, setSelectedOutcome] = useState(null);
    const [hawkUploaded, setHawkUploaded] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main AML Panel */}
            <div className="lg:col-span-2 space-y-6">
                {/* HAWK Document Upload */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <CardTitle>Documento HAWK</CardTitle>
                        </div>
                        <CardDescription>Carica il report di verifica HAWK</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {hawkUploaded ? (
                            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-green-800">Report HAWK caricato</p>
                                    <p className="text-sm text-green-600">hawk_report_2024.pdf</p>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setHawkUploaded(true)}
                                className="w-full p-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col items-center gap-2 text-slate-500">
                                    <Upload className="h-8 w-8" />
                                    <span className="font-medium">Clicca per caricare il report HAWK</span>
                                    <span className="text-sm">PDF, max 10MB</span>
                                </div>
                            </button>
                        )}
                    </CardContent>
                </Card>

                {/* Database Checks */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-violet-600" />
                            <CardTitle>Verifiche Banche Dati</CardTitle>
                        </div>
                        <CardDescription>Stato delle interrogazioni alle banche dati esterne</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {DATABASE_CHECKS.map((check) => (
                                <div
                                    key={check.id}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-lg border",
                                        check.status === 'completed' ? 'bg-slate-50' : 'bg-amber-50 border-amber-200'
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {check.status === 'completed' ? (
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <Search className="h-5 w-5 text-amber-600 animate-pulse" />
                                        )}
                                        <span className="font-medium">{check.name}</span>
                                    </div>
                                    <div>
                                        {check.status === 'completed' ? (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                {check.result}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                                In corso...
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column - AML Outcome Selection */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Esito AML</CardTitle>
                        </div>
                        <CardDescription>Seleziona l'esito della verifica antiriciclaggio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {AML_OUTCOMES.map((outcome) => {
                                const Icon = outcome.icon;
                                return (
                                    <button
                                        key={outcome.id}
                                        onClick={() => setSelectedOutcome(outcome.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left",
                                            selectedOutcome === outcome.id
                                                ? `${outcome.color} border-current`
                                                : "border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-medium">{outcome.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <Button
                            className="w-full mt-6"
                            disabled={!selectedOutcome || !hawkUploaded}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Conferma Esito AML
                        </Button>
                    </CardContent>
                </Card>

                {/* Warning for Orange outcome */}
                {selectedOutcome === 'orange' && (
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="pt-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                                <div>
                                    <p className="font-semibold text-orange-800">Verifica Rafforzata Richiesta</p>
                                    <p className="text-sm text-orange-700 mt-1">
                                        L'esito "Forzante" richiede documentazione aggiuntiva e approvazione del responsabile AML.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
