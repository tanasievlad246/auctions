import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions/auctions.controller';
import { AuctionsService } from './auctions/auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      schema: 'auctions',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService],
})
export class AppModule {}
