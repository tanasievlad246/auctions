import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { NestjsQueryGraphQLModule, PagingStrategies } from '@ptc-org/nestjs-query-graphql';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { UserService } from 'users/users.service';
import { UsersController } from 'users/users.controller';
import { User } from 'users/entities/user.entity';
import { UserDto } from 'users/dto/user.dto';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'transport_auctions',
      schema: process.env.DB_SCHEMA || 'transport_auctions_users',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schemas/auctions.schema.graphql'),
        federation: 2,
      },
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      }
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([User]),
        BullModule.registerQueue({ name: 'auctions' })
      ],
      services: [UserService],
      resolvers: [{
        DTOClass: UserDto,
        EntityClass: User,
        CreateDTOClass: CreateUserDto,
        UpdateDTOClass: CreateUserDto,
        ServiceClass: UserService,
        enableTotalCount: true,
        enableAggregate: true,
        read: {
          one: { name: 'user' },
          many: { name: 'users' }
        },
        create: {
          one: {
            name: 'createUser',
          },
          many: {
            disabled: true,
          }
        },
        update: { disabled: true },
        delete: { disabled: true },
        referenceBy: { key: 'id' },
      }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
