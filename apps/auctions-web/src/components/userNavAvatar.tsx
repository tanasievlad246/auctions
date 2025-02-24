"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SessionData } from "@auth0/nextjs-auth0/types";
import { redirect } from "next/navigation";

interface UserNavAvatarButtonProps {
    session: SessionData
}

export function UserNavAvatarButton({ session }: UserNavAvatarButtonProps) {
    if (!session) {
        // redirect user to "/"
        redirect("/");
    }

    function log() {
        console.log('some event');
    }

    return (<div className="flex items-center gap-4">
        <Avatar>
            <AvatarImage sizes="sm" src={session.user.picture} />
            <AvatarFallback>{session.user.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
            <DropdownMenuTrigger>{session.user.name}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={log}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                    <a href="/auth/logout">
                        Logout
                    </a>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>)
}