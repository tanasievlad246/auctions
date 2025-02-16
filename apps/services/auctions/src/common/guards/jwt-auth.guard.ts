import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        console.log('GUARD HEADERS', ctx.getContext().req.headers);
        return ctx.getContext().req;
    }

    handleRequest(err: any, user: any, info: any) {
        // You can throw an error here if needed
        console.log(user);
        console.log(err);
        if (err || !user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
