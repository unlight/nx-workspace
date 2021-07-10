import { Type, Module, Provider, DynamicModule } from '@nestjs/common';

import {
  EventstoreDbClientOptions,
  EventStorePublisherFactory,
  EventStorePublisherModuleAsyncOptions,
} from './eventstore-publisher.interfaces';
import {
  EVENTSTORE_CLIENT_OPTIONS,
  EVENTSTORE_CLIENT_VALUE,
} from './eventstore-publisher.constants';
import { EventStorePublisher } from './eventstore-publisher';
import { EventStoreDBClient } from '@eventstore/db-client';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    { provide: EventPublisher, useClass: EventStorePublisher },
    { provide: EventStorePublisher, useClass: EventStorePublisher },
    {
      provide: EVENTSTORE_CLIENT_VALUE,
      inject: [EVENTSTORE_CLIENT_OPTIONS],
      useFactory: (options: EventstoreDbClientOptions) => {
        return new EventStoreDBClient(
          options.connectionSettings as any,
          options.channelCredentials,
          options.defaultUserCredentials as any,
        );
      },
    },
  ],
  exports: [CqrsModule, EventStorePublisher],
})
export class EventstorePublisherModule {
  static forRoot(options: EventStorePublisherModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: EventstorePublisherModule,
      providers: [...this.createAsyncProviders(options)],
      imports: options.imports || [],
    };
  }

  private static createAsyncProviders(
    options: EventStorePublisherModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<EventStorePublisherFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: EventStorePublisherModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EVENTSTORE_CLIENT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: EVENTSTORE_CLIENT_OPTIONS,
      useFactory: async (factory: EventStorePublisherFactory) =>
        await factory.createEventStorePublisherOptions(),
      inject: [
        (options.useClass || options.useExisting) as Type<EventStorePublisherFactory>,
      ],
    };
  }
}
