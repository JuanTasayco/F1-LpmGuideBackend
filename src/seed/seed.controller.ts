import { Controller, Get, Post, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth-validate.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executedData() {
    return this.seedService.executeInfo();
  }
}
