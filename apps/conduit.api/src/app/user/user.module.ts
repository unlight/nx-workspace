import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserProfile } from './user.profile';
import { CommandHandlers } from './commands';
import { EventBus } from '@nestjs/cqrs';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStore } from '../app.providers';
import { UserSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    EventStore,
    UserService,
    UserProfile,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    ...CommandHandlers,
    ...UserSagas,
  ],
})
export class UserModule {
  constructor(private readonly eventBus: EventBus) {}

  onModuleInit() {
    // this.eventBus.subject$.subscribe(s => {
    //   console.log('s', s);
    // });
  }
}
