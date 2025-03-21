import { Module, DynamicModule, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { type Auth0Config } from './interfaces/auth0-config.interface';
import { AUTH0_CONFIG } from './constants';
import { RolesGuard } from './guards/roles.guard';
import { ClaimsGuard } from './guards/claims.guard';

@Global()
@Module({})
export class Auth0Module {
    static forRoot(config: Auth0Config): DynamicModule {
        return {
            module: Auth0Module,
            imports: [
                PassportModule.register({ defaultStrategy: 'jwt' }),
            ],
            providers: [
                {
                    provide: AUTH0_CONFIG,
                    useValue: config,
                },
                JwtStrategy,
                RolesGuard,
                ClaimsGuard,
            ],
            exports: [JwtStrategy, RolesGuard, ClaimsGuard],
        };
    }
}

