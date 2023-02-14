import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";



export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest(); /* get request  */
    const user = req.user; /* get request and filter user */
    if (!user) throw new InternalServerErrorException('User not found')
    return (!data) ? user : user[data]

})