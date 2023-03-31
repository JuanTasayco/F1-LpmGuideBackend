import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/meta-datos.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Injectable()
export class RoleProtectedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    if (!roles || roles.length === 0) return true;
    if (roles.includes(ValidRoles.admin)) return true;
  }
}
