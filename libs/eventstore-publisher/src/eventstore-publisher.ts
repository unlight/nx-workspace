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

  async publish<T extends EventData>(event: T) {
    const result = await this.eventStoreClient.readAll({ maxCount: 1 });
    console.log('resultxxx', result);

    // TODO: How to get stream name?
    // TODO: How to get aggregate id?
    // await this.eventStoreClient.appendToStream('user-123', event).catch(err => {
    //   console.log('err', err);
    // });
  }

  // TODO: appendToStream accept event or array
  // publishAll<T extends IEvent = IEvent>(events: T[]) {
  //   this.eventStoreClient.appendToStream();
  // }
}
