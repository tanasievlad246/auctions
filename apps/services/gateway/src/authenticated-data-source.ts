import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.req?.headers) {
      request.http.headers.set('Authorization', `Bearer ${context.req.headers.authorization}`);
    }
  }
}

