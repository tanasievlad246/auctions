import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }
}