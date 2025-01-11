import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';
import { Auth0Config } from "./interfaces";

@Injectable()
export class Auth0Service {
  private jwksClient: jwksRsa.JwksClient;

  constructor(
    @Inject('AUTH0_CONFIG') private config: Auth0Config,
  ) {
    this.jwksClient = new jwksRsa.JwksClient({
      jwksUri: `https://${config.domain}/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
    });
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decodedToken: any = jwt.decode(token, { complete: true });
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid token');
      }

      const signingKey = await this.jwksClient.getSigningKey(decodedToken.header.kid);
      const publicKey = signingKey.getPublicKey();

      const verified = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        audience: this.config.audience,
        issuer: `https://${this.config.domain}/`,
      });

      return verified;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  extractRoles(payload: any): string[] {
    // Assuming roles are in payload['https://your-namespace/roles']
    // Adjust the namespace according to your Auth0 configuration
    return payload['https://your-namespace/roles'] || [];
  }

  extractPermissions(payload: any): string[] {
    // Assuming permissions are in payload['https://your-namespace/permissions']
    return payload['https://your-namespace/permissions'] || [];
  }
}