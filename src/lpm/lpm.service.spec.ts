import { Test, TestingModule } from '@nestjs/testing';
import { LpmService } from './lpm.service';

describe('LpmService', () => {
  let service: LpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LpmService],
    }).compile();

    service = module.get<LpmService>(LpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
