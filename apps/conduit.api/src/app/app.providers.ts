import { Provider } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';

export const EventStore: Provider = {
  provide: 'EventStore',
  useFactory: () => {
    return new EventStoreDBClient(
      {
        endpoint: 'localhost:2113',
      },
      { insecure: true },
    );
  },
};
