import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions/auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Auction } from './auctions/entities/auction.entity';
import { Bid } from './auctions/entities/bid.entity';
import { FreightHandling } from './auctions/entities/freight-handling.entity';
import { AppController } from './app.controller';
import { AuctionsTimerService } from './auctions/auctions-timer/auctions-timer.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AuctionsTimerProcessor } from './auctions/auctions-timer/auctions-timer.processor';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { AuctionDto, AuctionItemDto } from './auctions/dto/auction.dto';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuctionResolver } from './auctions/auctions.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'postgres',
            port: parseInt(process.env.DB_PORT) || 5432,
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
                port: parseInt(process.env.REDIS_PORT) || 6379,
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
                BullModule.registerQueue({ name: 'auctions' })
            ],
            services: [AuctionsService],
            resolvers: [{
                DTOClass: AuctionItemDto,
                EntityClass: Auction,
                CreateDTOClass: AuctionDto,
                UpdateDTOClass: AuctionDto,
                ServiceClass: AuctionsService,
                enableTotalCount: true,
                pagingStrategy: PagingStrategies.OFFSET,
                enableAggregate: true,
                read: {
                    one: { name: 'auction' },
                    many: { name: 'auctions' }
                },
                create: { disabled: true },
                update: { disabled: true },
                delete: { disabled: true },
                referenceBy: { key: 'id' },
            }],
        }),
    ],
    controllers: [AppController],
    providers: [AuctionsService, AuctionsTimerService, AuctionsTimerProcessor, AuctionResolver],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
