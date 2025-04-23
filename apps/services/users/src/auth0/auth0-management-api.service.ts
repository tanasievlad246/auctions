import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/dtos/create-user.dto";

@Injectable()
export class Auth0ManagementApiService {
    private readonly logger: Logger = new Logger(Auth0ManagementApiService.name, { timestamp: true });
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {

    }

    async createUser(user: CreateUserDto, isOwnerUser: boolean = false) {
        try {
            const token = await this.getToken();
            this.logger.debug('Creating user', { user });

            const userData = {
                email: user.email,
                email_verified: false,
                password: user.password,
                connection: 'Username-Password-Authentication',
                app_metadata: {},
                user_metadata: {
                    isOwner: isOwnerUser,
                    tenantId: user.companyName,
                    role: user.role,
                },
                given_name: user.firstName,
                family_name: user.lastName,
                verify_email: true,
                blocked: false,
            };

            const fetchOptions = {
                method: 'POST',
                url: `https://${this.configService.get('AUTH0_DOMAIN')}/api/v2/users`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(userData),
            };

            this.logger.debug('Creating user', fetchOptions);
            const response = await fetch(fetchOptions.url, {
                body: fetchOptions.data,
                headers: fetchOptions.headers,
                method: fetchOptions.method,
            });
            const data = await response.json();
            this.logger.debug('User created', data);
            if (response.status !== 201) {
                this.logger.error('Error creating user', data);
                throw new InternalServerErrorException('Something happened on the server, please try again later');
            }
            this.logger.debug('User created', data);
            return data;
        } catch (error) {
            this.logger.error('Error creating user', error);
            throw new InternalServerErrorException('Something happened on the server, please try again later');
        }
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
        this.logger.debug('Getting Auth0 Management API Token');
        try {
            const token = await this.cacheManager.get('auth0-management-api-token');

            if (token) {
                return token;
            }

            const fetchOptions = {
                method: 'POST',
                url: `https://${this.configService.get('AUTH0_DOMAIN')}/oauth/token`,
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify({
                    client_id: this.configService.get('AUTH0_CLIENT_ID'),
                    client_secret: this.configService.get('AUTH0_CLIENT_SECRET'),
                    audience: `https://${this.configService.get('AUTH0_DOMAIN')}/api/v2/`,
                    grant_type: 'client_credentials',
                }),
            }
            this.logger.debug('Fetching Auth0 Management API Token', fetchOptions);
            const response = await fetch(fetchOptions.url, {
                body: fetchOptions.data,
                headers: fetchOptions.headers,
                method: fetchOptions.method,
            });
            const data = await response.json();
            await this.cacheManager.set('auth0-management-api-token', data.access_token, data.expires_in);
            return data.access_token;
        } catch (error) {
            throw new InternalServerErrorException('Something happened on the server, please try again later');
        }
    }
}