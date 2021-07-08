import { User as UserDto } from '@nx-workspace/conduit.domain';

export class UserCreatedEvent {
  userId: string;
  email: string;
  name: string;
  password: string;
  bio?: string;
  image?: string;

  constructor(data: UserDto) {
    this.userId = data.userId;
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
    this.bio = data.bio;
    this.image = data.image;
  }
}
