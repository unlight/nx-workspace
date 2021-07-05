import { ICommand } from '@nestjs/cqrs';

export class UserCreateCommand implements ICommand {
  readonly email: string;
  readonly name: string;
  readonly password: string;

  constructor({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
