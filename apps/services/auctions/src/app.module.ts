import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreightHandling } from './auctions/entities/freight-handling.entity';
import { Bid } from './auctions/entities/bid.entity';
import { Auction } from './auctions/entities/auction.entity';
import { BullModule } from '@nestjs/bullmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from 'path';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { AuctionsService } from './auctions/auctions.service';
import { AuctionDto, AuctionItemDto } from './auctions/dto/auction.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'transport_auctions',
      schema: process.env.DB_SCHEMA || 'transport_auctions',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([Auction, Bid, FreightHandling]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: 6379,
      }
    }),
    BullModule.registerQueue({
      name: 'auctions',
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schemas/auctions.schema.graphql'),
        federation: 2, // Enable Federation 2.0
      },
      sortSchema: true,
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([Auction, Bid, FreightHandling]),
        BullModule.registerQueue({ name: 'auctions' }),
      ],
      services: [AuctionsService],
      resolvers: [
        {
          DTOClass: AuctionItemDto,
          EntityClass: Auction,
          CreateDTOClass: AuctionDto,
          UpdateDTOClass: AuctionDto,
          ServiceClass: AuctionsService,
          enableTotalCount: true,
          enableAggregate: true,
          read: {
            one: { name: 'auction' },
            many: { name: 'auctions' }
          },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          referenceBy: { key: 'id' },
        }
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
