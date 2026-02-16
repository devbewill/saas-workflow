import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

/**
 * SearchInput — Input field with integrated search icon.
 * Used in tables and list headers for filtering.
 */
export function SearchInput({ placeholder = 'Cerca...', value, onChange, className }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`pl-9 ${className || ''}`}
            />
        </div>
    );
}
