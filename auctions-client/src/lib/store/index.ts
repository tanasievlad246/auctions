import { writable } from "svelte/store";

export const isAuthenticated = writable<boolean>(false);
export const user = writable<{
    email: string;
}>({
    email: ""
});
export const loading = writable(false);
export const popupOpen = writable(false);
export const error = writable();
export const auth0Client = writable<any>(null);
