import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction.entity";
import { BidDto } from "../dto/bid.dto";

@Entity({
    name: 'bids'
})
export class Bid {
    constructor(data: Partial<BidDto>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Auction, auction => auction.bids)
    auction: Auction;
    @Column()
    bidder: string;
    @Column()
    amount: number;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
}