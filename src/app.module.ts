import { Module } from '@nestjs/common';
import { LpmModule } from './lpm/lpm.module';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [LpmModule, SeedModule],
})
export class AppModule { }

