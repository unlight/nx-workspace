import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserHandler } from './command/handler/register-user.handler';
import { UserRegistered } from './events/user-registered.event';
import { User } from './model/user';
import { UserController } from './user.controller';
import { EventStoreModule } from '../..';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([User], {
      UserRegistered: event => new UserRegistered(event.data),
    }),
  ],
  providers: [RegisterUserHandler],
  controllers: [UserController],
})
export class UserModule {}
