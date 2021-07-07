import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { User } from '../../user.model';
import cuid from 'cuid';
import { EventStorePublisher } from '@nx-workspace/eventstore-publisher';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(private readonly publisher: EventStorePublisher) {}

  async execute(command: UserCreateCommand): Promise<any> {
    const user = new User();
    user.create({ ...command });
    // this.publisher.publish()
    user.commit();
  }
}
