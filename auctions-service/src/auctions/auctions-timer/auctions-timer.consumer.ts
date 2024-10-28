export class AuctionTimerConsumer {
    constructor() {}

    public async consumeAuctionStartJob(): Promise<void> {
        console.log('Starting auctions timer...');
    }

    public async consumeAuctionStopJob(): Promise<void> {
        console.log('Stopping auctions timer...');
    }
}