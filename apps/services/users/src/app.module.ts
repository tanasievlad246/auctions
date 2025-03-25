import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bullmq';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { Auth0ManagementApiService } from './auth0/auth0-management-api.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'transport_auctions',
      schema: process.env.DB_SCHEMA || 'transport_auctions_users',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      }
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schemas/users.schema.graphql'),
        federation: 2,
      },
      sortSchema: true,
    }),
    CacheModule.register(),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        TypeOrmModule.forFeature([User]),
        BullModule.registerQueue({ name: 'auctions' }),
        CacheModule.register(),
      ],
      services: [UserService, Auth0ManagementApiService],
      resolvers: [{
        DTOClass: UserDto,
        EntityClass: User,
        CreateDTOClass: CreateUserDto,
        UpdateDTOClass: CreateUserDto,
        ServiceClass: UserService,
        enableAggregate: true,
        enableTotalCount: true,
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
      }]
    })
  ],
  controllers: [AppController],
  providers: [AppService, Auth0ManagementApiService, UserService],
})
export class AppModule { }
