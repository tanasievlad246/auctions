import { Injectable } from '@nestjs/common';

@Injectable()
export class AuctionsTimerService {
    constructor() {}

    public async onModuleInit(): Promise<void> {
        this.syncAuctionsStartJob().then();
        this.createAuctionStartJob().then();
    }

    public async createAuctionStartJob(): Promise<void> {
        console.log('Starting auctions timer...');
    }

    public async createAuctionStopJob(): Promise<void> {
        console.log('Stopping auctions timer...');
    }

    public async syncAuctionsStartJob(): Promise<void> {
        console.log('Syncing auctions timer...');
    }

    public async syncAuctionsStopJob(): Promise<void> {
        console.log('Syncing auctions timer...');
    }
}
