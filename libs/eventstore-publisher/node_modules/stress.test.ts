import {
    EventStoreDBClient,
    jsonEvent,
    FORWARDS,
    START,
    JSONEventType,
} from '@eventstore/db-client';

import cuid from 'cuid';

const client = new EventStoreDBClient(
    {
        endpoint: 'localhost:2113',
    },
    { insecure: true },
);

describe('stress eventstore', (): void => {
    const testNames = ['article', 'user', 'comment'];
    it('create many streams', async () => {
        const end = Date.now() + 60 * 1e3;
        while (Date.now() < end) {
            const testIndex = ~~(Math.random() * testNames.length);
            const resource = testNames[testIndex];
            const id = cuid();
            const streamName = `${resource}-${id}`;

            const event = jsonEvent({
                // id: cuid(),
                type: `${resource}-created`,
                data: {
                    [`${resource}Id`]: id,
                    timestamp: Date.now(),
                    x: end - Date.now(),
                },
            });

            const result = await client.appendToStream(streamName, event);
        }
    });
});

describe('read from eventstore', () => {});
