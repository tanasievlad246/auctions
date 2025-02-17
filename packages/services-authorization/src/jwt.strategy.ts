import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { AUTH0_CONFIG } from './constants';
import { type Auth0Config } from './interfaces/auth0-config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH0_CONFIG) config: Auth0Config,
  ) {
    const jwtStrategyConfig = {
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.domain}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.audience,
      issuer: `https://${config.domain}/`,
      algorithms: ['RS256'],
    } as any;

    super(jwtStrategyConfig);
  }

  async validate(payload: any) {
    return payload;
  }
}
