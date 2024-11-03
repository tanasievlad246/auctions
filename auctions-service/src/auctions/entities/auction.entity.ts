import { AuctionStatus } from "src/common/enums/auction-status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FreightHandling } from "./freight-handling.entity";
import { Bid } from "./bid.entity";

@Entity({
    name: 'auctions'
})
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    startingTransportDate: Date;
    @Column()
    endingTransportDate: Date;
    @Column()
    startingPrice: number;
    @Column({
        type: 'enum',
        enum: AuctionStatus,
        default: AuctionStatus.CLOSED
    })
    status: AuctionStatus;
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.auction)
    loadings: FreightHandling[];
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.auction)
    unloadings: FreightHandling[];
    @OneToMany(() => Bid, bid => bid.auction)
    bids: Bid[];
    @OneToOne(() => Bid)
    @JoinColumn({ name: 'highestBidId' })
    highestBid: Bid;
    @OneToOne(() => Bid)
    @JoinColumn({ name: 'winningBidId' })
    winningBid: Bid;
    /**
     * user id reference
     */
    @Column()
    winningBidder: string;
    @CreateDateColumn()
    createdAt: Date;
}