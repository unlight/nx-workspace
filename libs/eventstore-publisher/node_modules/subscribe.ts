import {
    END,
    EventStoreDBClient,
    eventTypeFilter,
    jsonEvent,
} from '@eventstore/db-client';
import cuid from 'cuid';

describe('subscribe', () => {
    let client: EventStoreDBClient;
    before(() => {
        client = new EventStoreDBClient(
            {
                endpoint: 'localhost:2113',
            },
            { insecure: true },
        );
    });

    it('try subscribe', async () => {
        client
            .subscribeToAll({ fromPosition: END })
            .once('data', event => {
                console.log('subscribeToAll event', event);
            })
            .on('error', console.log);
        client
            .subscribeToStream('user-123', { fromRevision: END })
            .once('data', event => {
                console.log('user-123 event', event);
            })
            .on('error', console.log);
        client
            .subscribeToStream('$ce-user', { fromRevision: END })
            .once('data', event => {
                console.log('$ce-user event', event);
            })
            .on('error', console.log);
        const event = jsonEvent({
            type: 'TestEvent',
            data: 'data ' + Math.random().toString(36).slice(2),
        });
        await client.appendToStream('user-123', event);
    });
});
