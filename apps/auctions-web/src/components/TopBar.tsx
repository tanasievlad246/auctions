import { auth0 } from "@/lib/auth0";
import { TopBar } from "./ui/topBar";
import { Bell } from "lucide-react";
import { UserNavAvatarButton } from "./userNavAvatar";
import Link from "next/link";

export async function TopMenu() {
    const session = await auth0.getSession()
    const LOGIN_URL = `/auth/login?audience=${process.env.AUTH0_API_AUDIENCE}`;
    return (
        <TopBar>
            {/* Logo */}
            <a href="/" className="font-bold text-lg">Transport Auctions</a>

            {!session ? (<nav className="flex items-center gap-4">
                <Link href="/signup">Sign up</Link>
                <a href={LOGIN_URL}>Log in</a>
            </nav>) : (<nav className="flex items-center gap-4">
                <Bell />
                <UserNavAvatarButton session={session} />
            </nav>)}
        </TopBar>
    );
}
