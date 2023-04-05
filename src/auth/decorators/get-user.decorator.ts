import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    /* si el decorador no tiene @User('nombre') entonces devuelvo user, delo contrario por ejemplo user['nombre'] */
    if (!user) throw new BadRequestException('Usuario no encontrado');

    return !data ? user : user[data];
  },
);
