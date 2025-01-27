import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: process.env.NODE_ENV !== 'production',
        debug: process.env.NODE_ENV !== 'production',
      },
      gateway: {
        supergraphSdl: {
          subgraphs: [
            { name: 'auctions', url: 'http://auctions-service:3001/graphql' },
            // { name: 'users', url: 'http://users-service:3002/graphql' },
          ],
          pollIntervalInMs: 1000,
          subgraphHealthCheck: true,
          logger: console,
        },
        debug: process.env.NODE_ENV !== 'production',
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
