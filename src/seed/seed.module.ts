import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { LpmModule } from 'src/lpm/lpm.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [LpmModule]
})
export class SeedModule { }
