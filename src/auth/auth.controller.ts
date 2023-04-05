import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth-validate.decorator';
import { User } from './decorators/get-user.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auto.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User as UserEntity } from './entities/auth.entity';
import { RoleProtectedGuard } from './guards/role-protected/role-protected.guard';
import { ValidRoles } from './interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() bodyLoginDto: LoginAuthDto) {
    return this.authService.login(bodyLoginDto);
  }

  @Get('all')
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Post('updateUser/:id')
  updateUserById(@Param('id') id: string, @Body() body: UpdateAuthDto) {
    return this.authService.updateUserByID(id, body);
  }

  @Get('private')
  @Auth(ValidRoles.admin)
  privateRoute(@User() user: UserEntity) {
    return {
      ok: true,
      user,
    };
  }
  /*  */
  @Post('verify')
  @Auth(ValidRoles.admin)
  verifyToken(@User() user: UserEntity) {
    return user;
  }
}
