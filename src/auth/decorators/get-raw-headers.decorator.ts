import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";


export const GetRawHeaders = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const raw = req.rawHeaders;
    return raw
})