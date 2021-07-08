import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { Inject } from '@nestjs/common';
import { User } from '../../user.model';
import cuid from 'cuid';
import { EventStorePublisher } from '@nx-workspace/eventstore-publisher';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  private readonly UserModel = this.publisher.mergeClassContext(User);

  constructor(private readonly publisher: EventPublisher) {}

  /**
   * TODO: How to get aggregate id
   * TODO: How to get stream name
   */
  async execute(command: UserCreateCommand): Promise<any> {
    const user = this.UserModel.create({ ...command });
    user.commit();
  }
}
