import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction.entity";

@Entity({
    name: 'freight_handlings'
})
export class FreightHandling {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Auction)
    auction: Auction;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    price: number;
    @Column()
    country: string;
    @Column()
    city: string;
    @Column()
    zipCode: string;
    @Column()
    address: string;
    @Column()
    contactPerson: string;
    @Column()
    contactPhone: string;
    @Column()
    contactEmail: string;
    @CreateDateColumn()
    createdAt: Date;
}