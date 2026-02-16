import React from 'react';

/**
 * InfoGrid — Renders a list of label:value pairs in a responsive grid.
 * Used for project info, condominium data, financial details, etc.
 */
export function InfoGrid({ items, columns = 2 }) {
    const gridClass = columns === 3
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        : columns === 4
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
            : 'grid grid-cols-1 md:grid-cols-2 gap-4';

    return (
        <div className={gridClass}>
            {items.map((item, i) => (
                <div key={i} className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                </div>
            ))}
        </div>
    );
}
