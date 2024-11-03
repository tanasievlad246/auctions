import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MessageType } from "src/common/enums/message-type.enum";

@Processor('auctions')
export class AuctionsTimerProcessor extends WorkerHost {
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

    async processAuctionStart(job: Job) {
        console.log(job.data);
        console.log('Processing auction start...');
    }

    async processAuctionClose(job: Job) {
        console.log(job.data);
        console.log('Processing auction close...');
    }
}