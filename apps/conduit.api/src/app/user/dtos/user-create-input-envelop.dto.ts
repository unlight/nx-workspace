import { ValidateNested } from 'class-validator';
import { UserCreateInput } from './user-create-input.dto';
import { Type } from 'class-transformer';

export class UserCreateInputEnvelope {
  @ValidateNested()
  @Type(() => UserCreateInput)
  user!: UserCreateInput;
}
