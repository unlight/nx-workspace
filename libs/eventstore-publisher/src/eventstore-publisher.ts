import { Inject, Injectable } from '@nestjs/common';
import { IEventPublisher } from '@nestjs/cqrs';
import { EVENTSTORE_CLIENT_VALUE } from './eventstore-publisher.constants';
import { EventData, EventStoreDBClient } from './eventstore-publisher.interfaces';

@Injectable()
export class EventStorePublisher implements IEventPublisher<EventData> {
  constructor(
    @Inject(EVENTSTORE_CLIENT_VALUE)
    private readonly eventStoreClient: EventStoreDBClient,
  ) {}

  publish<T extends EventData>(event: T) {
    // TODO: How to get stream name?
    this.eventStoreClient.appendToStream('user-123', event);
  }

  // TODO: appendToStream accept event or array
  // publishAll<T extends IEvent = IEvent>(events: T[]) {
  //   this.eventStoreClient.appendToStream();
  // }
}
