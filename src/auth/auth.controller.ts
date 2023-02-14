import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetRawHeaders } from './decorators/get-raw-headers.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() bodyLoginDto: CreateAuthDto) {
    return this.authService.login(bodyLoginDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders: string[]
  ) {
    return {
      ok: true,
      msg: "Estamos en una sala privada",
      userEmail,
      user: user,
      raw: rawHeaders
    }
  }

  @Get('private2')
  /* @SetMetadata('roles', ['admin', 'super-user']) */
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  rolesRoute(
    @GetUser() user: User
  ) {
    return {
      hola: "hola",
      user
    }
  }

}
