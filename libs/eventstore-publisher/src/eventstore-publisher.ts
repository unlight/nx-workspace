import { Inject, Injectable } from '@nestjs/common';
import { EventBus, EventPublisher, ICommand } from '@nestjs/cqrs';
import { EVENTSTORE_CLIENT_VALUE } from './eventstore-publisher.constants';
import { EventData, EventStoreDBClient } from './eventstore-publisher.interfaces';
import { jsonEvent } from '@eventstore/db-client';

@Injectable()
export class EventStorePublisher extends EventPublisher<EventData> {
  constructor(
    eventBus: EventBus<EventData>,
    @Inject(EVENTSTORE_CLIENT_VALUE)
    private readonly eventStoreClient: EventStoreDBClient,
  ) {
    super(eventBus);
    eventBus.publisher = this;
    eventBus.subject$.subscribe(s => {
      console.log('>>> s', s);
    });
  }

  publish<T = any>(event: any) {
    // const result = this.eventStoreClient.readAll({ maxCount: 1 });
    // console.log('resultxxx', result);
    if (!event?.constructor?.name) {
      throw new Error('InvalidEvent');
    }

    const streamEvent = jsonEvent({
      type: this.getEventName(event.constructor.name),
      data: event as any,
    });

    // TODO: How to get stream name?
    // TODO: How to get aggregate id?
    this.eventStoreClient.appendToStream('user-123', streamEvent);
  }

  // TODO: appendToStream accept event or array
  // publishAll<T extends IEvent = IEvent>(events: T[]) {
  //   this.eventStoreClient.appendToStream();
  // }

  private getEventName(name: string) {
    if (name.endsWith('Event')) {
      name = name.slice(0, -5);
    }
    return name;
  }
}
