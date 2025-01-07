import { popupOpen, user } from "@/store";
import { Auth0Client, createAuth0Client, type GetTokenSilentlyOptions, type RedirectLoginOptions } from "@auth0/auth0-spa-js";
import { auth0Client } from "@/store";

export const createClient = async () => {
    const _auth0Client = await createAuth0Client({
        domain: 'dev-lhrslvzots2ak1lu.us.auth0.com',
        clientId: 'lZVJ7EemCVt8WYkpJHzRwS9ekcUnNfx7',
        authorizationParams: {
            redirect_uri: `${window.location.origin}/callback`
        }
    });
    auth0Client.set(_auth0Client);
    return _auth0Client;
}

export const getUser = async (client: Auth0Client, options?: GetTokenSilentlyOptions): Promise<void> => {
    try {
      await client.getTokenSilently();
      const userDetails = await client.getUser();
      user.set(userDetails as any);
    } catch (e) {
      console.warn(e);
    }
  }

export const loginWithRedirect = async (client: Auth0Client, options: RedirectLoginOptions) => {
    try {
        console.log(client);
        await client.loginWithRedirect();
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}


export const logout = async (client: Auth0Client) => {
    return client.logout();
}

const auth = {
    createClient,
    logout,
    getUser
};

export default auth;
