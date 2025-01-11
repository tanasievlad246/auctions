import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CLAIMS_KEY } from '../decorators/claims.decorator';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClaims = this.reflector.getAllAndOverride<string[]>(CLAIMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredClaims) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const user = req.user;

    return requiredClaims.every((claim) => user.permissions?.includes(claim));
  }
}