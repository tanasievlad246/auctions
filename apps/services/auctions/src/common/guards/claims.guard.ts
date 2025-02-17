import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { CLAIMS_KEY } from "@repo/services-authorization";

@Injectable()
export class ClaimsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const requiredClaims = this.reflector.getAllAndOverride<string[]>(CLAIMS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredClaims) {
            return true;
        }

        // user.claims contains all users claims, it is a list of strings
        return requiredClaims.every((claim) => req.user.permissions.includes(claim));
    }
}
