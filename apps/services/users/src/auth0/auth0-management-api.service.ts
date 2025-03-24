import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Auth0ManagementApiService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {

    }

    async createUser() {
        throw new Error('Not implemented');
    }

    async updateUser() {
        throw new Error('Not implemented');
    }

    async deleteUser() {
        throw new Error('Not implemented');
    }

    async deactivateUser() {
        throw new Error('Not implemented');
    }

    async activateUser() {
        throw new Error('Not implemented');
    }

    async getUser() {
        throw new Error('Not implemented');
    }

    async getUsers() {
        throw new Error('Not implemented');
    }

    async getToken() {
        try {
            const token = await this.cacheManager.get('auth0-management-api-token');

            if (token) {
                return token;
            }
            const fetchOptions = {
                method: 'POST',
                url: `https://${this.configService.get('AUTH0_DOMAIN')}/oauth/token`,
                headers: { 'content-type': 'application/json' },
                data: {
                    client_id: this.configService.get('AUTH0_CLIENT_ID'),
                    client_secret: this.configService.get('AUTH0_CLIENT_SECRET'),
                    audience: `https://${this.configService.get('AUTH0_DOMAIN')}/api/v2/`,
                    grant_type: 'client_credentials',
                },
            }
            const response = await fetch(fetchOptions.url, fetchOptions);
            const data = await response.json();
            this.logger.log('Auth0 Management API Token', data.access_token);
            await this.cacheManager.set('auth0-management-api-token', data.access_token, data.expires_in);
            return data.access_token;
        } catch (error) {
            throw new InternalServerErrorException('Something happened on the server, please try again later');
        }
    }
}