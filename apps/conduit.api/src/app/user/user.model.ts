import { AggregateRoot } from '@nestjs/cqrs';
import { User as UserDto } from '@nx-workspace/conduit.domain';
import { UserCreatedEvent } from './events/user-created.event';

export class User extends AggregateRoot {
  userId: string;
  email: string;
  name: string;

  constructor(object: UserDto) {
    super();
    this.userId = object.userId;
    this.email = object.email;
    this.name = object.name;
  }

  create(userId: string) {
    // Logic
    this.apply(new UserCreatedEvent(userId));
  }
}
