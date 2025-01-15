import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from '@hermestms/logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    log('getHello called');
    return this.appService.getHello();
  }
}
