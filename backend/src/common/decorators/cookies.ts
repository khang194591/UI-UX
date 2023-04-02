import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.cookies?.[data] : request.cookies;
});

export default Cookies;
