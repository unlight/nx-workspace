import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { User } from '../../user.model';
import { Inject } from '@nestjs/common';
import {
  EventStoreDBClient,
  JSONEventData,
  jsonEvent,
  JSONType,
  NO_STREAM,
} from '@eventstore/db-client';
import { first, map, switchMap } from 'rxjs/operators';
import { UserCreatedEvent } from '../../events/user-created.event';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  private readonly UserModel = this.publisher.mergeClassContext(User);

  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventBus: EventBus,
    @Inject('EventStore') private readonly eventStore: EventStoreDBClient,
  ) {}

  /**
   * TODO: How to get aggregate id
   * TODO: How to get stream name
   */
  async execute(command: UserCreateCommand): Promise<any> {
    const user = this.UserModel.create({ ...command });
    this.eventBus.subject$
      .pipe(
        first(event => event instanceof UserCreatedEvent),
        map((data: JSONType) => jsonEvent({ type: 'UserCreated', data })),
        switchMap((event: JSONEventData) => {
          return this.eventStore.appendToStream(`user-${user.userId}`, event, {
            expectedRevision: NO_STREAM,
          });
        }),
      )
      .subscribe();

    user.commit();
  }
}
