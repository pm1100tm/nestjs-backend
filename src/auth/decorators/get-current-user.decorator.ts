import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CurrentUser } from 'auth/auth.types';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
