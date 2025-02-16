"use client";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useCallback } from 'react';

interface TokenState {
    token: string | null;
    loading: boolean;
    error: Error | null;
}

interface UseAuth0TokenOptions {
    audience?: string;
    scope?: string;
    refreshBuffer?: number;
}

export const useAuth0Token = (options: UseAuth0TokenOptions = {}) => {
    const {
        audience = process.env.AUTH0_AUDIENCE,
        scope = '',
        refreshBuffer = 300 // 5 minutes default
    } = options;

    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [tokenState, setTokenState] = useState<TokenState>({
        token: null,
        loading: true,
        error: null,
    });

    // Function to fetch new token
    const fetchToken = useCallback(async () => {
        console.log('here');
        console.log(isAuthenticated);
        console.log(isLoading);

        if (!isAuthenticated && !isLoading) {
            setTokenState({
                token: null,
                loading: false,
                error: new Error('User not authenticated'),
            });
            return;
        }

        try {
            setTokenState(prev => ({ ...prev, loading: true, error: null }));

            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience,
                    scope,
                },
            });

            setTokenState({
                token,
                loading: false,
                error: null,
            });

            // Parse token to get expiration
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expiresIn = tokenData.exp * 1000 - Date.now() - (refreshBuffer * 1000);

            // Set up refresh timer
            if (expiresIn > 0) {
                setTimeout(() => {
                    fetchToken();
                }, expiresIn);
            }
        } catch (error) {
            setTokenState({
                token: null,
                loading: false,
                error: error instanceof Error ? error : new Error('Failed to get token'),
            });
        }
    }, [getAccessTokenSilently, audience, scope, isAuthenticated, refreshBuffer, isLoading]);

    // Initial token fetch
    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    // Function to manually refresh token
    const refreshToken = useCallback(() => {
        fetchToken();
    }, [fetchToken]);

    return {
        ...tokenState,
        refreshToken,
        fetchToken
    };
};
