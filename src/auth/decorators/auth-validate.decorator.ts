import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtectedGuard } from '../guards/role-protected/role-protected.guard';
import { ValidRoles } from '../interfaces/valid-roles';
import { MetaDatos } from './meta-datos.decorator';

export let Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    MetaDatos(...roles),
    UseGuards(AuthGuard('jwt'), RoleProtectedGuard),
  );
};
