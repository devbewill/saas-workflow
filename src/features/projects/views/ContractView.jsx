/**
 * ContractView - View for contract management states
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ContractView({ project }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Gestione Contratto</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Interfaccia per la stampa, firma e gestione del contratto.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
