import { User as UserDto } from '@nx-workspace/conduit.domain';

export class UserCreatedEvent {
  constructor(readonly user: UserDto) {}
}
