import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import {
  ChannelCredentialOptions,
  Credentials,
  DNSClusterOptions,
  GossipClusterOptions,
  SingleNodeOptions,
  EventStoreDBClient,
  EventData,
} from '@eventstore/db-client';

export interface EventstoreDbClientOptions {
  connectionSettings: DNSClusterOptions | GossipClusterOptions | SingleNodeOptions;
  channelCredentials?: ChannelCredentialOptions;
  defaultUserCredentials?: Partial<Credentials>;
}

export interface EventStorePublisherFactory {
  createEventStorePublisherOptions(): EventstoreDbClientOptions;
}

export interface EventStorePublisherModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<EventStorePublisherFactory>;
  useExisting?: Type<EventStorePublisherFactory>;
  useFactory?: (...args: any[]) => EventstoreDbClientOptions;
  inject?: any[];
}

export { EventStoreDBClient, EventData };
