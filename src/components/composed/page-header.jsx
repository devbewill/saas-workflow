import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * PageHeader — Consistent page title with optional back button, subtitle, and actions.
 * Used at the top of every page.
 */
export function PageHeader({ title, subtitle, backLabel, actions, children }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
                {backLabel && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="gap-1 mb-2 -ml-2 text-muted-foreground"
                    >
                        <ArrowLeft size={14} />
                        {backLabel}
                    </Button>
                )}
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
                {children}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
    );
}
