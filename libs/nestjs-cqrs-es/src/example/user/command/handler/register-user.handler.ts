import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../model/user';
import { RegisterUser } from '../impl/register-user.command';
import { AggregateRepository, InjectAggregateRepository } from '../../../..'; // @nordfjord/nestjs-cqrs-es

@CommandHandler(RegisterUser)
export class RegisterUserHandler implements ICommandHandler<RegisterUser> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: AggregateRepository<User>,
  ) {}

  async execute(command: RegisterUser) {
    const user = await this.userRepository.findOne(command.data.email);

    await user.register(command.data.email, command.data.password);

    await this.userRepository.save(user);

    return { success: true };
  }
}
