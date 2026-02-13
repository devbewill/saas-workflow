/**
 * StandardView - Default view for project details
 * Used for states that don't require specialized UI
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectInfoGrid } from '../components/ProjectInfoGrid';

export default function StandardView({ project }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-none shadow-xl shadow-black/[0.02] overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-border/40 p-6">
                    <CardTitle className="text-sm font-bold tracking-widest text-primary uppercase">Informazioni di dettaglio</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <ProjectInfoGrid project={project} />
                </CardContent>
            </Card>
        </div>
    );
}
