import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction.entity";
import { BidDto } from "../dto/bid.dto";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({
    name: 'bids'
})
export class Bid {
    constructor(data: Partial<BidDto>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;
    @ManyToOne(() => Auction, auction => auction.bids)
    @Field(type => Auction)
    auction: Auction;
    @Column()
    @Field()
    bidder: string;
    @Column()
    @Field()
    amount: number;
    @Column()
    @Field()
    startDate: Date;
    @Column()
    @Field()
    endDate: Date;
    @CreateDateColumn()
    @Field()
    createdAt: Date;
}