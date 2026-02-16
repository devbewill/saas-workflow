import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * EmptyState — Placeholder for empty lists and sections.
 */
export function EmptyState({ icon: Icon = Inbox, title = 'Nessun dato', description }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon size={40} className="text-muted-foreground/50 mb-4" />
            <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
            {description && <p className="text-xs text-muted-foreground mt-1 max-w-xs">{description}</p>}
        </div>
    );
}
