import {AuctionStatus} from "src/common/enums/auction-status.enum";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {FreightHandling} from "./freight-handling.entity";
import {Bid} from "./bid.entity";
import {Directive, Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity({
    name: 'auctions'
})
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;
    @Column()
    @Field()
    title: string;
    @Column()
    @Field()
    description: string;
    @Column()
    @Field()
    startDate: Date;
    @Column()
    @Field()
    endDate: Date;
    @Column({
        nullable: true,
    })
    @Field()
    startingTransportDate: Date;
    @Column({
        nullable: true,
    })
    @Field()
    endingTransportDate: Date;
    @Column()
    @Field()
    startingPrice: number;
    @Column({
        type: 'enum',
        enum: AuctionStatus,
        default: AuctionStatus.CLOSED
    })
    @Field(type => AuctionStatus)
    status: AuctionStatus;
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.auction)
    @Field(type => [FreightHandling])
    loadings: FreightHandling[];
    @OneToMany(() => FreightHandling, freightHandling => freightHandling.auction)
    @Field(type => [FreightHandling])
    unloadings: FreightHandling[];
    @OneToMany(() => Bid, bid => bid.auction)
    @Field(() => [Bid])
    bids: Bid[];
    @OneToOne(() => Bid)
    @JoinColumn({name: 'highestBidId'})
    @Field(() => Bid, {
        nullable: true
    })
    highestBid: Bid;
    @OneToOne(() => Bid)
    @JoinColumn({name: 'winningBidId'})
    @Field(() => Bid, {
        nullable: true
    })
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
    @Field()
    createdAt: Date;
}