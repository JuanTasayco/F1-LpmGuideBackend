import { Test, TestingModule } from '@nestjs/testing';
import { LpmController } from './lpm.controller';
import { LpmService } from './lpm.service';

describe('LpmController', () => {
  let controller: LpmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LpmController],
      providers: [LpmService],
    }).compile();

    controller = module.get<LpmController>(LpmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
