/**
 * Colori associati a ogni stato del workflow.
 * Usato dal StatusBadge e da altri componenti che mostrano lo stato pratica.
 *
 * Ogni stato ha:
 *   - bg:   classe Tailwind per lo sfondo
 *   - text: classe Tailwind per il testo
 *   - dot:  classe Tailwind per il pallino colore (opzionale, per uso futuro)
 */
export const STATUS_COLORS = {
    'Bozza': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    'Aperta': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    'Caricata': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    'Esame': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    'Approvata': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    'In attesa': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Perfezionata': { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
    // Fallback
    'default': { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
};

/**
 * Dato un fullName di uno step (es. "Aperta – Verifica preliminare"),
 * estrae lo stato base e restituisce i colori corrispondenti.
 */
export function getStatusColors(statusOrState) {
    if (!statusOrState) return STATUS_COLORS['default'];
    // Proviamo prima una corrispondenza esatta
    if (STATUS_COLORS[statusOrState]) return STATUS_COLORS[statusOrState];
    // Poi proviamo a estrarre lo stato base dal fullName (prima parola o parte prima del " –" / " -")
    const base = statusOrState.split(/\s*[–-]\s*/)[0].trim();
    return STATUS_COLORS[base] || STATUS_COLORS['default'];
}
