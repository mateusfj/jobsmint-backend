import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as qs from 'qs';

export const ParsedQuery = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const raw = req.url.split('?')[1] || '';
  return qs.parse(raw);
});
