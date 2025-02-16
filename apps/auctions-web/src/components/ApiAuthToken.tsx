"use client"
import { useEffect, useState } from "react"
import { useAuth0Token } from "@/hooks/useApi.hook"
import { getAccessToken } from "@auth0/nextjs-auth0"

export const ApiAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const _getAccessToken = async () => {
        const token = await getAccessToken();
        console.log(token);
        setToken(token);
    }

    return <>
        <h1>Token {token}</h1>
        <button onClick={_getAccessToken}>Fetch Token</button>
    </>
}