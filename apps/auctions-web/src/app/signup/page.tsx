"use client"

import { useState } from "react";

export default function SignUp() {
    const [signupType, setSignupType] = useState<"TRANSPORTER" | "CLIENT">("CLIENT");

    return (
        <main className="h-screen flex flex-col gap-4 w-full overflow-hidden items-center justify-center">
            {signupType === "TRANSPORTER" ? <div className="px-5 py-2 flex-shrink-0">
                <h1>Sign Up TRANSPORTER</h1>
            </div>
                : <div className="px-5 pb-5 flex-1 overflow-hidden flex flex-col min-h-0">
                    <h1>Sign Up Client</h1>
                </div>}
        </main>
    )
}
