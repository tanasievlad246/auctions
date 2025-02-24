import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import React from "react"

export const topBarVariants = cva(
    "flex items-center justify-between gap-4 h-16 px-4 bg-background shadow-sm",
    {
        variants: {
            size: {
                default: "h-14",
                lg: "h-16",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface TopBarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topBarVariants> {
    asChild?: boolean
}

export const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
    ({ className, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(topBarVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
