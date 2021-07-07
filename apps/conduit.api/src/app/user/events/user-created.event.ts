import { User as UserDto } from '@nx-workspace/conduit.domain';

export class UserCreatedEvent {
  userId: string;
  email: string;
  name: string;

  constructor(object: UserDto) {
    this.userId = object.userId;
    this.email = object.email;
    this.name = object.name;
  }
}
