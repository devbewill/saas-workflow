import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

/**
 * Checklist — A list of items with checkboxes.
 * Used in the Operator Assistant for workflow step requirements.
 *
 * items: [{ id, label, checked }]
 * onChange: (id, checked) => void
 */
export function Checklist({ items, onChange }) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                    <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={(checked) => onChange?.(item.id, checked)}
                    />
                    <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                        {item.label}
                    </Label>
                </div>
            ))}
        </div>
    );
}
