import { writable } from "svelte/store";

export const isAuthenticated = writable<boolean>(false);
export const user = writable<{
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    nickname: string;
    sub: string;
    updated_at: string;
}>({
    email: "",
    email_verified: false,
    name: "",
    picture: "",
    nickname: "",
    sub: "",
    updated_at: "",
});
export const loading = writable(true);
export const popupOpen = writable(false);
export const error = writable();
export const auth0Client = writable<any>(null);
