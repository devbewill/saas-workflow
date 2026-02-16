import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * StatCard — Displays a single metric with label, value, and optional icon.
 * Used in dashboards and KPI sections.
 */
export function StatCard({ label, value, icon: Icon, children }) {
    return (
        <Card>
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                    {Icon && <Icon size={16} className="text-muted-foreground" />}
                </div>
                <p className="text-2xl font-bold">{value}</p>
                {children}
            </CardContent>
        </Card>
    );
}
