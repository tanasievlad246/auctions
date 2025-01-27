import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

    @Post('auth0/webhook/create-user')
    async createUserWebhook(
        @Body() user: CreateUserDto
    ) {
        return this.usersService.createUser(user);
    }
}