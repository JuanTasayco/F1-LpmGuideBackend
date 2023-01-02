import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LpmModule } from './lpm/lpm.module';
import { LpmService } from './lpm/lpm.service';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [LpmModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true

    }),
    SeedModule],
})
export class AppModule { }

