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
    @Column({
        nullable: true,
    })
    startingTransportDate: Date;
    @Column({
        nullable: true,
    })
    endingTransportDate: Date;
    @Column()
    startingPrice: number;
    @Column({
        type: 'enum',
        enum: AuctionStatus,
        default: AuctionStatus.CLOSED
    })
    status: AuctionStatus;
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.loadingAuction)
    @JoinColumn({ name: 'loadingId' })
    loadings: FreightHandling[];
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.unloadingAuction)
    @JoinColumn({ name: 'unloadingId' })
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
    @Column({
        nullable: true,
    })
    winningBidder: string;
    @Column({
        nullable: false
    })
    createdBy: string;
    @CreateDateColumn()
    createdAt: Date;
}