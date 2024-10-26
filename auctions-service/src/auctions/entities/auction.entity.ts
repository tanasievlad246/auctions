import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}