import { AggregateRoot } from '@nestjs/cqrs';
import { User as UserDto } from '@nx-workspace/conduit.domain';
import { UserCreatedEvent } from './events/user-created.event';
import cuid from 'cuid';

export class User extends AggregateRoot {
  userId: string;
  email: string;
  name: string;
  password: string;
  bio?: string;
  image?: string;

  constructor(data: UserDto) {
    super();
    this.userId = data.userId;
    this.email = data.email;
    this.name = data.name;
    this.bio = data.bio;
    this.image = data.image;
    this.password = data.password;
  }

  static create(data: Omit<UserDto, 'userId'>) {
    // Logic
    const user = new this({ ...data, userId: cuid() });
    const event = new UserCreatedEvent({
      userId: user.userId,
      email: user.email,
      name: user.name,
      bio: user.bio,
      image: user.image,
      password: user.password,
    });
    user.apply(event);

    return user;
  }
}
