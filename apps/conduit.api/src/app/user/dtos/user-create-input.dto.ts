import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Input type for create user mutation.
 */
export class UserCreateInput {
  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  // TODO: @Validate(UserExistsValidator)
  email!: string;

  @AutoMap()
  @MinLength(3)
  @IsNotEmpty()
  username!: string;

  @AutoMap()
  @IsNotEmpty()
  password!: string;
}
