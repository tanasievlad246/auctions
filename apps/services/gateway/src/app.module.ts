import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { AuthenticatedDataSource } from './authenticated-data-source';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: process.env.NODE_ENV !== 'production',
        debug: process.env.NODE_ENV !== 'production',
        context: ({ req }) => ({ req })
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auctions', url: 'http://auctions:3001/graphql' },
            { name: 'users', url: 'http://users:3002/graphql' },
          ],
          pollIntervalInMs: 1000,
          subgraphHealthCheck: true,
          logger: console,
        }),
        buildService: ({ url }) => {
          return new AuthenticatedDataSource({ url });
        },
        debug: process.env.NODE_ENV !== 'production',
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

