import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions/auctions.controller';
import { AuctionsService } from './auctions/auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Auction } from './auctions/entities/auction.entity';
import { Bid } from './auctions/entities/bid.entity';
import { FreightHandling } from './auctions/entities/freight-handling.entity';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'transport_auctions',
      schema: 'transport_auctions',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Auction, Bid, FreightHandling]),
  ],
  controllers: [AuctionsController, AppController],
  providers: [AuctionsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
