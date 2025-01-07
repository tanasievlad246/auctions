import { isAuthenticated, popupOpen, user } from "@/store";
import { Auth0Client, createAuth0Client, type GetTokenSilentlyOptions, type RedirectLoginOptions } from "@auth0/auth0-spa-js";

export const createClient = async () => {
    const auth0Client = await createAuth0Client({
        domain: 'dev-lhrslvzots2ak1lu.us.auth0.com',
        clientId: 'lZVJ7EemCVt8WYkpJHzRwS9ekcUnNfx7',
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
    return auth0Client;
}

export const getUser = async (client: Auth0Client, options?: GetTokenSilentlyOptions): Promise<void> => {
    try {
      // ensure the client has a token to cal the Auth0 Authentication server.
      await client.getTokenSilently();
      // get the client to fetch the user information.
      const userDetails = await client.getUser();
      // publish the user information
      console.log(userDetails);
      user.set(userDetails as any);
    } catch (e) {
      // if the user is not logged in the getTokenSilently call will fail.
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
