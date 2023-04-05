import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
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
    /* en roles obtengo los roles que voy a permitir */

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    /* en user.roles obtengo los roles del usuario que viene y los comparo con los roles de arriba */
    if (!user) throw new BadRequestException('Usuario no encontrado');
    if (!roles) return true;
    if (roles.includes(user.roles)) return true;
  }
}
