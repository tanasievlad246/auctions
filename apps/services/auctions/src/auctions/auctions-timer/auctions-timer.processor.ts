import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MessageType } from "src/common/enums/message-type.enum";
import {AuctionsService} from "../auctions.service";

@Processor('auctions')
export class AuctionsTimerProcessor extends WorkerHost {
    constructor(private readonly auctionService: AuctionsService) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case MessageType.StartAuction:
                return this.processAuctionStart(job);
            case MessageType.CloseAuction:
                return this.processAuctionClose(job);
            default:
                return {};
        }
    }

    async processAuctionStart(job: Job<{ auctionId: string }>) {
        await this.auctionService.startAuction(job.data.auctionId);
    }

    async processAuctionClose(job: Job<{ auctionId: string }>) {
        await this.auctionService.closeAuction(job.data.auctionId);
    }
}