import { Controller, Get } from '@nestjs/common';
import { AuctionsService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
    ) {}

    @Get('test-queue')
    public async testAuctionQueue() {
        await this.auctionsService.testAuctionQueue();
        return {
            message: 'Test message sent to the queue',
        }
    }
}
