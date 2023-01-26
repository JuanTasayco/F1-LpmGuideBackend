import { Module } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { LpmController } from './lpm.controller';
import { SeedModule } from 'src/seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lpm } from './entities/lpm.entity';
import { LpmContentImages } from './entities/lpm.images.entity';
import { LpmContentImagesIngreso } from './entities';

@Module({
  controllers: [LpmController],
  imports: [TypeOrmModule.forFeature([Lpm, LpmContentImages, LpmContentImagesIngreso])],
  providers: [LpmService],
  exports: [LpmService]
})
export class LpmModule { }
