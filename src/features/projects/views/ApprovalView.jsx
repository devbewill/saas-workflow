/**
 * ApprovalView - View for deliberation states
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ApprovalView({ project }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Delibera Approvazione</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Interfaccia per la gestione della delibera dell'organo deliberante.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
