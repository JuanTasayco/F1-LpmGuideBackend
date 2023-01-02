import { Module } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { LpmController } from './lpm.controller';
import { SeedModule } from 'src/seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lpm } from './entities/lpm.entity';
import { LpmContentImages } from './entities/lpm.images.entity';

@Module({
  controllers: [LpmController],
  imports: [SeedModule,
    TypeOrmModule.forFeature([Lpm, LpmContentImages])],
  providers: [LpmService]
})
export class LpmModule { }
