import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('heartbeat')
  public async heartbeat(): Promise<{ message: string }> {
    return {
      message: 'Users service is up and running!',
    };
  }
}
