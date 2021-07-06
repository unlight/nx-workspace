import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '@nx-workspace/conduit.domain';
import { User } from '../../user.model';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    @Inject('UserRepository') private readonly repository: UserRepositoryInterface,
  ) {}

  async execute(command: UserCreateCommand): Promise<any> {
    const userDto = await this.repository.create(command);
    const user = this.publisher.mergeObjectContext(new User(userDto));
    user.create(user.userId);
    user.commit();

    return userDto;
  }
}
