import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Input type for create user mutation.
 */
export class UserCreateInput {
  @IsNotEmpty()
  @IsEmail()
  // TODO: @Validate(UserExistsValidator)
  email!: string;

  @MinLength(3)
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
