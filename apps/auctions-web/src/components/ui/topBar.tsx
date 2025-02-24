import { auth0 } from "@/lib/auth0"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react";
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

export const TopMenu = async () => {
    const session = await auth0.getSession()
    console.log(session);
    const LOGIN_URL = `/auth/login?audience=${process.env.AUTH0_API_AUDIENCE}`;
    return (
        <TopBar>
            {/* Logo */}
            <a href="/" className="font-bold text-lg">Transport Auctions</a>

            {/* Not logged in */}
            {!session && <nav className="flex items-center gap-4">
                <a href="/auth/login?screen_hint=signup">Sign up</a>
                <a href={LOGIN_URL}>Log in</a>
            </nav>}

            {/* Logged in */}
            {session && <nav className="flex items-center gap-4">
                <a href="/auth/logout">Logout</a>
                <Bell fill="black" />
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={session.user.picture} />
                        <AvatarFallback>{session.user.name![0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{session.user.name}</span>
                </div>
            </nav>}
        </TopBar>
    );
}
