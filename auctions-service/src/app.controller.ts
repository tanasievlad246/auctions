import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
    constructor() {}

    @Get('heartbeat')
    public async heartbeat(): Promise<{ message: string }> {
        return {
            message: 'Auctions service is up and running!',
        };
    }
}
