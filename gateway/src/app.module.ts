import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: process.env.NODE_ENV !== 'production',
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auctions', url: 'http://auctions-service:3001/graphql' },
            { name: 'users', url: 'http://users-service:3002/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
