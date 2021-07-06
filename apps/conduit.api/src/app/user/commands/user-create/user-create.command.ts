import { ICommand } from '@nestjs/cqrs';

export class UserCreateCommand implements ICommand {
  readonly email!: string;
  readonly name!: string;
  readonly password!: string;
}
