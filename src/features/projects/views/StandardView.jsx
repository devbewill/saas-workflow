/**
 * StandardView - Default view for project details
 * Used for states that don't require specialized UI
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectInfoGrid } from '../components/ProjectInfoGrid';

export default function StandardView({ project }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Informazioni Progetto</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProjectInfoGrid project={project} />
                </CardContent>
            </Card>
        </div>
    );
}
