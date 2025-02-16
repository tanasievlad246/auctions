import { Auth0Provider } from '@auth0/auth0-react';

export const Auth0ProviderWithConfig = ({ children }: any) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN || ''}
      clientId={process.env.AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://auctions-microservices.com', // This should match your backend Audience
      }}
    >
      {children}
    </Auth0Provider>
  );
};