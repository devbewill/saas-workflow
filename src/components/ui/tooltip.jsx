import * as React from "react";
import { cn } from "@/lib/utils";

// Context to share tooltip state
const TooltipContext = React.createContext({});

// TooltipProvider: wrapper (no-op, for API compatibility)
const TooltipProvider = ({ children }) => <>{children}</>;
TooltipProvider.displayName = "TooltipProvider";

// Tooltip: manages open state
const Tooltip = ({ children, defaultOpen = false }) => {
    const [isVisible, setIsVisible] = React.useState(defaultOpen);
    return (
        <TooltipContext.Provider value={{ isVisible, setIsVisible }}>
            <div className="relative inline-block">
                {children}
            </div>
        </TooltipContext.Provider>
    );
};
Tooltip.displayName = "Tooltip";

// TooltipTrigger: the element that triggers the tooltip
const TooltipTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
    const { setIsVisible } = React.useContext(TooltipContext);
    const child = asChild ? React.Children.only(children) : null;

    const triggerProps = {
        ref,
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
        onFocus: () => setIsVisible(true),
        onBlur: () => setIsVisible(false),
        ...props,
    };

    if (asChild && child) {
        return React.cloneElement(child, triggerProps);
    }

    return (
        <span {...triggerProps}>
            {children}
        </span>
    );
});
TooltipTrigger.displayName = "TooltipTrigger";

// TooltipContent: the tooltip bubble
const TooltipContent = React.forwardRef(({ children, className, side = "top", ...props }, ref) => {
    const { isVisible } = React.useContext(TooltipContext);

    if (!isVisible) return null;

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-slate-900",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900",
        left: "left-full top-1/2 -translate-y-1/2 border-l-slate-900",
        right: "right-full top-1/2 -translate-y-1/2 border-r-slate-900",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 w-max max-w-[300px]",
                "bg-slate-900 text-white text-xs px-3 py-2 rounded-md shadow-md",
                "animate-in fade-in zoom-in duration-200",
                positionClasses[side] || positionClasses.top,
                className
            )}
            {...props}
        >
            {children}
            <div className={cn(
                "absolute border-4 border-transparent",
                arrowClasses[side] || arrowClasses.top
            )} />
        </div>
    );
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
