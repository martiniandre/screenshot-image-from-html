import { Test, TestingModule } from '@nestjs/testing';
import { PupService } from './pup.service';

describe('PupService', () => {
  let service: PupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PupService],
    }).compile();

    service = module.get<PupService>(PupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
