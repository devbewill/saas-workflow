import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

/**
 * SectionPanel — A titled card section for grouping related content.
 * Used throughout the app wherever a labeled content block is needed.
 */
export function SectionPanel({ title, description, icon: Icon, actions, children, className }) {
    return (
        <Card className={className}>
            {(title || actions) && (
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-base font-semibold">
                            {Icon && <Icon size={16} />}
                            {title}
                        </CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </CardHeader>
            )}
            <CardContent className={title ? '' : 'pt-6'}>
                {children}
            </CardContent>
        </Card>
    );
}
