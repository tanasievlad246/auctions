import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('auctions')
export class AuctionsTimerProcessor extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case 'test':
                return this.processAuctionStart(job);
            default:
                return {};
        }
    }

    async processAuctionStart(job: Job) {
        console.log(job.data);
        console.log('Processing auction start...');
    }
}