export { Auth0Module } from './auth.module';

// Export guards
export { JwtAuthGuard } from './guards/jwt-auth.guard';
export { RolesGuard } from './guards/roles.guard';
export { ClaimsGuard } from './guards/claims.guard';

// Export decorators
export { Roles, ROLES_KEY } from './decorators/roles.decorator';
export { RequireClaims, CLAIMS_KEY } from './decorators/claims.decorator';

// Export interfaces and types
export type { Auth0Config } from './interfaces/auth0-config.interface';

// Export constants
export { AUTH0_CONFIG } from './constants';

// Optionally, you might want to export the strategy if other services need to extend it
export { JwtStrategy } from './jwt.strategy';