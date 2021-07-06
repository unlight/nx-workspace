import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateInput } from './user-create.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCreateCommand } from './commands/user-create/user-create.command';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Registration.
   */
  @Post()
  @UsePipes({ transform: x => x.user }, new ValidationPipe({ transform: true }))
  async createUser(@Body() userCreateInput: UserCreateInput) {
    const command = this.mapper.map(
      userCreateInput,
      UserCreateCommand,
      UserCreateInput,
    );
    const result = await this.commandBus.execute(command);
    return result;
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
