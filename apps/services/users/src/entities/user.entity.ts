import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    email: string;
    @Column()
    role: 'TRANSPORTER' | 'CLIENT';
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    phoneNumber: string;
    @Column()
    isOwner: boolean;
    @Column()
    isActive: boolean;
    @Column()
    tenantId: string;
    @Column()
    subscriptionId: string;
    @Column()
    companyName: string;
    @Column()
    companyId: string;
}
