import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsResolver } from './auctions.resolver';

describe('AuctionsResolver', () => {
  let controller: AuctionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionsResolver],
    }).compile();

    controller = module.get<AuctionsResolver>(AuctionsResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
