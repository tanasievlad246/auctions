import { FreightHandlingDto } from './freight-handling.dto';

export class AuctionDto {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    startingPrice: number;
    loadings: FreightHandlingDto[];
    unloadings: FreightHandlingDto[];
    winningBidder: string;
}