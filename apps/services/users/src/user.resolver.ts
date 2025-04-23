import { ArgsType, Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { Auth0ManagementApiService } from "./auth0/auth0-management-api.service";
import { ConnectionType, QueryArgsType } from "@ptc-org/nestjs-query-graphql";
import { Logger } from "@nestjs/common";
import { Filter, InjectQueryService, QueryService } from "@ptc-org/nestjs-query-core";
import { User } from "./entities/user.entity";
import { UserDto } from "./dtos/user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";

@ArgsType()
export class UserQuery extends QueryArgsType(UserDto) { }
export const UserConnection = UserQuery.ConnectionType;

@Resolver(() => UserDto)
export class UserResolver {
    private readonly logger: Logger = new Logger(UserResolver.name, { timestamp: true });

    constructor(
        private readonly userService: UserService,
        private readonly auth0ManagementApiService: Auth0ManagementApiService,
        @InjectQueryService(User) readonly service: QueryService<User>
    ) { }

    @Query(() => UserConnection)
    getTenantedUsers(@Args() query: UserQuery): Promise<ConnectionType<UserDto>> {
        this.logger.debug('getTenantedUsers', { query });
        const filter: Filter<UserDto> = {
            ...(query.filter || {}),  // Use empty object if filter is undefined
            ...(query.filter?.tenantId ? { tenantId: query.filter.tenantId } : {})
        };
        return UserConnection.createFromPromise((q) => this.service.query(q), { ...query, ...{ filter } });
    }

    @Mutation(() => UserDto)
    async createUser(@Args('input') input: CreateUserDto): Promise<UserDto> {
        this.logger.debug('createUser', { input });

        const _user = new User();
        _user.email = input.email;
        _user.firstName = input.firstName;
        _user.lastName = input.lastName;
        _user.phoneNumber = input.phoneNumber;
        _user.role = input.role as "TRANSPORTER" | "CLIENT";
        _user.companyName = input.companyName;
        _user.companyId = input.companyName;
        _user.isActive = false;
        _user.isOwner = input.isOwner;
        _user.tenantId = input.companyName;
        _user.createdAt = new Date();
        _user.updatedAt = new Date();

        const user = await this.userService.createOne(_user);
        await this.auth0ManagementApiService.createUser(input);
        return user;
    }
}
