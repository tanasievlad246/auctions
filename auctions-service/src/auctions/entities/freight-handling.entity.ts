import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Relation } from "@nestjs-query/query-graphql";
import { AuctionItemDto } from "../dto/auction.dto";

@ObjectType()
@Entity({
    name: 'freight_handlings'
})
export class FreightHandling {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;
    @ManyToOne(() => Auction)
    @Field(type => Auction)
    loadingAuction: Auction;
    @ManyToOne(() => Auction)
    @Field(type => Auction)
    unloadingAuction: Auction;
    @Column()
    @Field()
    startDate: Date;
    @Column()
    @Field()
    endDate: Date;
    @Column()
    @Field()
    country: string;
    @Column()
    @Field()
    city: string;
    @Column()
    @Field()
    zipCode: string;
    @Column()
    @Field()
    address: string;
    @Column()
    @Field()
    contactPerson: string;
    @Column()
    @Field()
    contactPhone: string;
    @Column()
    @Field()
    contactEmail: string;
    @CreateDateColumn()
    @Field()
    createdAt: Date;
}