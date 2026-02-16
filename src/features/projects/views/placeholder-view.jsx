import React from 'react';
import { EmptyState } from '@/components/composed/empty-state';
import { Construction } from 'lucide-react';

/**
 * PlaceholderView — Used for tabs not yet implemented.
 * Displays a clean empty state with the tab name.
 */
export default function PlaceholderView({ tabKey }) {
    return (
        <div className="pt-4">
            <EmptyState
                icon={Construction}
                title={`Sezione "${tabKey}" in sviluppo`}
                description="Questa sezione sarà disponibile a breve."
            />
        </div>
    );
}
