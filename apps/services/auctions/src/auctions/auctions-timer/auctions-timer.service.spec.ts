import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsTimerService } from './auctions-timer.service';

describe('AuctionsTimerService', () => {
  let service: AuctionsTimerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionsTimerService],
    }).compile();

    service = module.get<AuctionsTimerService>(AuctionsTimerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
