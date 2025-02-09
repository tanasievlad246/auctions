"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a href="/api/auth/login">LOGIN</a>
      {JSON.stringify(user, null, 2)}
    </div>
  );
}
