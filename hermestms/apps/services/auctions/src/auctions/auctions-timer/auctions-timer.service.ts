import { Injectable } from '@nestjs/common';
import {AuctionsService} from "../auctions.service";
import {InjectQueue} from "@nestjs/bullmq";
import {Queue} from "bullmq";
import {MessageType} from "../../common/enums/message-type.enum";

@Injectable()
export class AuctionsTimerService {
    constructor(
        private readonly auctionsService: AuctionsService,
        @InjectQueue('auctions') private readonly auctionsQueue: Queue,
    ) {}

    public async onModuleInit(): Promise<void> {
        this.syncAuctionsStartJob().then();
        this.syncAuctionsStopJob().then();
    }

    public async syncAuctionsStartJob(): Promise<void> {
        try {
            const auctionsToStart = await this.auctionsService.getAuctionsThatNeedToStart();

            for (const auction of auctionsToStart) {
                await this.auctionsQueue.add(MessageType.StartAuction, { auctionId: auction.id }, {
                    delay: new Date(auction.startDate).getTime() - new Date().getTime(),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async syncAuctionsStopJob(): Promise<void> {
        try {
            const auctionsToStop = await this.auctionsService.getAuctionsThatNeedToEnd();

            for (const auction of auctionsToStop) {
                if (auction.endDate >= new Date()) {
                    await this.auctionsQueue.add(MessageType.CloseAuction, { auctionId: auction.id });
                }
                await this.auctionsQueue.add(MessageType.CloseAuction, { auctionId: auction.id }, {
                    delay: new Date(auction.endDate).getTime() - new Date().getTime(),
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
}
