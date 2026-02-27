import React from 'react';
import { getStatusColors } from '@/config/status-colors';
import { cn } from '@/lib/utils';

/**
 * StatusBadge — Badge semantico per stati del workflow e dei documenti.
 * Per gli stati workflow usa la mappa status-colors.js (colori per state base).
 * Per stati documenti (Validato, Da validare, Da caricare) usa classi dedicate.
 */

const DOC_STATUS_STYLES = {
    'Validato': { bg: 'bg-green-50', text: 'text-green-700' },
    'Da validare': { bg: 'bg-amber-50', text: 'text-amber-700' },
    'Da caricare': { bg: 'bg-slate-100', text: 'text-slate-500' },
    // Wallet
    'attivo': { bg: 'bg-green-50', text: 'text-green-700' },
    'in_attesa': { bg: 'bg-amber-50', text: 'text-amber-700' },
    'da_attivare': { bg: 'bg-slate-100', text: 'text-slate-500' },
    // Payment
    'paid': { bg: 'bg-green-50', text: 'text-green-700' },
    'pending': { bg: 'bg-amber-50', text: 'text-amber-700' },
};

export function StatusBadge({ status, children }) {
    const docStyle = DOC_STATUS_STYLES[status];
    const colors = docStyle || getStatusColors(status);

    return (
        <span className={cn(
            'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold',
            colors.bg,
            colors.text
        )}>
            {children || status}
        </span>
    );
}
