import { Module } from '@nestjs/common';
import { AuctionsResolver } from './auctions/auctions.resolver';
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
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { AuctionDto, AuctionItemDto } from './auctions/dto/auction.dto';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: process.env.NODE_ENV !== 'production',
            autoSchemaFile: join(process.cwd(), 'src/schemas/auctions.schema.graphql'),
            sortSchema: true,
        }),
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Auction, Bid, FreightHandling, DataSource])],
            services: [AuctionsService],
            dtos: [{ DTOClass: AuctionDto }, { DTOClass: AuctionItemDto }],
        }),
    ],
    controllers: [AppController],
    providers: [AuctionsService, AuctionsTimerService, AuctionsTimerProcessor, AuctionsResolver],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
