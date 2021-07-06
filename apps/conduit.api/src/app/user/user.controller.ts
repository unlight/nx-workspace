import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateInput } from './user-create.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCreateCommand } from './commands/user-create/user-create.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Registration.
   */
  @Post()
  async createUser(@Body() userCreateInput: UserCreateInput) {
    // TODO: Automapper
    return this.commandBus.execute(
      new UserCreateCommand({
        name: userCreateInput.name,
        email: userCreateInput.email,
        password: userCreateInput.password,
      }),
    );
  }
  // Authentication.
  // @Post('users/login')
  // async postUsersLogin(@Req() request: Request) {
  //     return this.service.loginUser(request.body.user);
  // }
  // /**
  //  * Get current user.
  //  */
  // @Get('user')
  // async user(@AuthorizationToken() token: string) {
  //     return this.service.getCurrentUser(token);
  // }
}
