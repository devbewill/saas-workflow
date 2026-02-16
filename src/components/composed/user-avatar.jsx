import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/formatters';

/**
 * UserAvatar — Avatar with name and optional role/email.
 * Used in tables, headers, and team views.
 */
export function UserAvatar({ name, email, avatarUrl, size = 'default' }) {
    const sizeClass = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
    const textSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-sm' : 'text-xs';

    return (
        <div className="flex items-center gap-2">
            <Avatar className={sizeClass}>
                {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                <AvatarFallback className={`${textSize} bg-muted font-medium`}>
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{name}</span>
                {email && <span className="text-xs text-muted-foreground">{email}</span>}
            </div>
        </div>
    );
}
