import { Inject, Injectable } from '@nestjs/common';
import { EventBus, EventPublisher } from '@nestjs/cqrs';
import { EVENTSTORE_CLIENT_VALUE } from './eventstore-publisher.constants';
import { EventData, EventStoreDBClient } from './eventstore-publisher.interfaces';

@Injectable()
export class EventStorePublisher extends EventPublisher<EventData> {
  constructor(
    eventBus: EventBus<EventData>,
    @Inject(EVENTSTORE_CLIENT_VALUE)
    private readonly eventStoreClient: EventStoreDBClient,
  ) {
    super(eventBus);
    eventBus.publisher = this;
  }

  publish<T extends EventData>(event: T) {
    // TODO: How to get stream name?
    this.eventStoreClient.appendToStream('user-123', event);
  }

  // TODO: appendToStream accept event or array
  // publishAll<T extends IEvent = IEvent>(events: T[]) {
  //   this.eventStoreClient.appendToStream();
  // }
}
