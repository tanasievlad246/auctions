"use client"
import { useState } from "react"
import { getAccessToken } from "@auth0/nextjs-auth0"

export const ApiAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const _getAccessToken = async () => {
        const token = await getAccessToken();
        setToken(token);
    }

    return <>
        <h1>Token {token}</h1>
        <button onClick={_getAccessToken}>Fetch Token</button>
    </>
}