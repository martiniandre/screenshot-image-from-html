import { Test, TestingModule } from '@nestjs/testing';
import { PupController } from './pup.controller';

describe('PupController', () => {
  let controller: PupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PupController],
    }).compile();

    controller = module.get<PupController>(PupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
