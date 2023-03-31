import { Module } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { LpmController } from './lpm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lpm } from './entities/lpm.entity';
import { LpmContentImages, LpmContentImagesIngreso } from './entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LpmController],
  imports: [
    TypeOrmModule.forFeature([Lpm, LpmContentImages, LpmContentImagesIngreso]),
    CloudinaryModule,
    AuthModule,
  ],
  providers: [LpmService],
  exports: [LpmService],
})
export class LpmModule {}
