import { UserCreateInput } from './user-create-input.dto';
import { User } from './user.dto';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User>;
  create(userCreateInput: UserCreateInput): Promise<User>;
}
