import { AutoMap } from '@automapper/classes';
import { ICommand } from '@nestjs/cqrs';

export class UserCreateCommand implements ICommand {
  @AutoMap()
  readonly email!: string;

  @AutoMap()
  readonly name!: string;

  @AutoMap()
  readonly password!: string;
}
