import { Module } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { LpmController } from './lpm.controller';

@Module({
  controllers: [LpmController],
  providers: [LpmService]
})
export class LpmModule {}
