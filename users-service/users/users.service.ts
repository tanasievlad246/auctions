import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { TypeOrmQueryService } from "@ptc-org/nestjs-query-typeorm";

@Injectable()
export class UserService extends TypeOrmQueryService<User> {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }
}