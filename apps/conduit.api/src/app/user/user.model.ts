import { AggregateRoot } from '@nestjs/cqrs';
import { User as UserDto } from '@nx-workspace/conduit.domain';
import { UserCreatedEvent } from './events/user-created.event';
import cuid from 'cuid';

export class User extends AggregateRoot {
  create(data: Omit<UserDto, 'userId'>) {
    const event = new UserCreatedEvent({
      ...data,
      userId: cuid(),
    });
    this.apply(event);
  }
}
