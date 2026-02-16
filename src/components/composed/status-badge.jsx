import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * StatusBadge — Semantic badge for displaying statuses.
 * Maps status strings to shadcn Badge variants.
 */

const STATUS_MAP = {
    // Document statuses
    'Validato': 'default',
    'Da validare': 'secondary',
    'Da caricare': 'outline',
    // Project statuses
    'Aperta': 'default',
    'Caricata': 'default',
    'Esame': 'destructive',
    'Approvata': 'outline',
    'Perfezionata': 'secondary',
    // Wallet statuses
    'attivo': 'default',
    'in_attesa': 'secondary',
    'da_attivare': 'outline',
    // Payment statuses
    'paid': 'default',
    'pending': 'secondary',
};

export function StatusBadge({ status, children }) {
    const variant = STATUS_MAP[status] || 'outline';

    return (
        <Badge variant={variant}>
            {children || status}
        </Badge>
    );
}
