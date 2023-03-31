import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtectedGuard } from '../guards/role-protected/role-protected.guard';
import { ValidRoles } from '../interfaces/valid-roles';
import { MetaDatos, META_ROLES } from './meta-datos.decorator';

/* export function Auth(...roles: Role[]) {
  return applyDecorators(
    MetaDatos(ValidRoles.admin),
    UseGuards(AuthGuard('jwt'), RoleProtectedGuard),
  );
} */

export let Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    MetaDatos(...roles),
    UseGuards(AuthGuard('jwt'), RoleProtectedGuard),
  );
};
