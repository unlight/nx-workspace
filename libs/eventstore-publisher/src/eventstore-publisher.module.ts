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

@Module({
  providers: [
    EventStorePublisher,
    {
      provide: EVENTSTORE_CLIENT_VALUE,
      inject: [EVENTSTORE_CLIENT_OPTIONS],
      useFactory: (options: EventstoreDbClientOptions) => {
        return new EventStoreDBClient(<any>{
          connectionSettings: { ...options.connectionSettings },
          channelCredentials: { ...options.channelCredentials },
          defaultUserCredentials: { ...options.defaultUserCredentials },
        });
      },
    },
  ],
  exports: [EventStorePublisher],
})
export class EventstorePublisherModule {
  static register(options: EventstoreDbClientOptions): DynamicModule {
    return {
      module: EventstorePublisherModule,
      providers: [
        {
          provide: EVENTSTORE_CLIENT_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static createAsyncOptionsProvider(
    options: EventStorePublisherModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EVENTSTORE_CLIENT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<EventStorePublisherFactory>,
    ];

    return {
      provide: EVENTSTORE_CLIENT_OPTIONS,
      useFactory: (factory: EventStorePublisherFactory) =>
        factory.createEventStorePublisherOptions(),
      inject,
    };
  }

  static registerAsync(options: EventStorePublisherModuleAsyncOptions): DynamicModule {
    return {
      module: EventstorePublisherModule,
      providers: [...this.createAsyncProviders(options)],
      imports: options.imports || [],
    };
  }

  static createAsyncProviders(
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
}