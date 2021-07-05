import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { Inject } from '@nestjs/common';

// import { HeroRepository } from '../../repository/hero.repository';
// import { KillDragonCommand } from '../impl/kill-dragon.command';

// @CommandHandler(KillDragonCommand)
// export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
//     constructor(
//         private readonly repository: HeroRepository,
//         private readonly publisher: EventPublisher,
//     ) {}

//     async execute(command: KillDragonCommand) {
//         console.log(clc.greenBright('KillDragonCommand...'));

//         const { heroId, dragonId } = command;
//         const hero = this.publisher.mergeObjectContext(
//             await this.repository.findOneById(+heroId),
//         );
//         hero.killEnemy(dragonId);
//         hero.commit();
//     }
// }

// import { Inject } from '@nestjs/common';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Todo, TodoId, TodoTitle } from '../../domain/models';
// import { Todos } from '../../domain/repository';
// import { NotAddedTodo } from '../exceptions';
// import { TodoViews } from '../repositories';
// import { AddTodo } from './AddTodo';

// @CommandHandler(AddTodo)
// export class AddTodoHandler implements ICommandHandler<AddTodo> {
//   constructor(
//     @Inject('Todos') private readonly todos: Todos,
//     @Inject('TodoViews') private readonly views: TodoViews,
//     private readonly publisher: EventPublisher,
//   ) {}

//   async execute({ id, title }: AddTodo): Promise<void> {
//     if (await this.views.existsWithId(id)) {
//       throw NotAddedTodo.causeAlreadyExistsWithId(id);
//     }

//     const todo = this.publisher.mergeObjectContext(
//       Todo.add(TodoId.fromUuid(id), TodoTitle.fromString(title)),
//     );

//     this.todos.save(todo);
//   }
// }

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly publisher: EventPublisher
    @Inject('UserRepository') private readonly repository: UserRepository
  ) {}

  execute(command: UserCreateCommand): Promise<void> {
    const user = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    // hero.killEnemy(dragonId);
    hero.commit();
  }
}
