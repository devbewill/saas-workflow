/**
 * CreditCheckView - View for credit evaluation states
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CreditCheckView({ project }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Valutazione Crediti</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Interfaccia per la valutazione del merito creditizio.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
