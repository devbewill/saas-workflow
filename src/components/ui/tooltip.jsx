import * as React from "react";
import { cn } from "@/lib/utils";

const Tooltip = ({ children, content, className }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={cn(
                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] z-50",
                    "bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md animate-in fade-in zoom-in duration-200",
                    className
                )}>
                    {content}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                </div>
            )}
        </div>
    );
};

export { Tooltip };
