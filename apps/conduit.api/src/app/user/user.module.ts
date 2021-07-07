import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserProfile } from './user.profile';
import { CommandHandlers } from './commands';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserProfile,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    ...CommandHandlers,
  ],
})
export class UserModule {}
