import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Input type for create user mutation.
 */
export class UserCreateInput {
  @IsNotEmpty()
  @IsEmail()
  // TODO: @Validate(UserExistsValidator)
  email!: string;

  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  password!: string;
}
