import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class CreateUserSaga {
  @Saga()
  accountCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(event => {
        // new ActivateUserCommand(event.account.userId)
      }),
    );
  };
}
