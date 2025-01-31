import { registerEnumType } from "@nestjs/graphql";

export enum AuctionStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    CANCELED = 'CANCELED',
    ADMIN_CANCELED = 'ADMIN_CANCELED',
}

registerEnumType(AuctionStatus, { name: 'AuctionStatus' });
