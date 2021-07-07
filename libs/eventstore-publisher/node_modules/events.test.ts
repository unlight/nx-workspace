import {
    EventStoreDBClient,
    jsonEvent,
    FORWARDS,
    START,
    JSONEventType,
} from '@eventstore/db-client';

import should from 'should';
require('should');

const client = new EventStoreDBClient(
    {
        endpoint: 'localhost:2113',
    },
    { insecure: true },
);

type SeatReservedEvent = JSONEventType<
    'seat-reserved',
    {
        reservationId: string;
        movieId: string;
        userId: string;
        seatId: string;
    }
>;

type SeatChangedEvent = JSONEventType<
    'seat-changed',
    {
        reservationId: string;
        newSeatId: string;
    }
>;

type ReservationEvents = SeatReservedEvent | SeatChangedEvent;

describe('eventstore', (): void => {
    it('should store events', async () => {
        type Reservation = {
            reservationId: string;
            movieId: string;
            userId: string;
            seatId: string;
        };

        const streamName = 'booking-abc123';

        const event = jsonEvent<SeatReservedEvent>({
            type: 'seat-reserved',
            data: {
                reservationId: 'abc123',
                movieId: 'tt0368226',
                userId: 'nm0802995',
                seatId: '4b',
            },
        });

        const appendResult = await client.appendToStream(streamName, event);

        const events = await client.readStream<ReservationEvents>(streamName, {
            fromRevision: START,
            direction: FORWARDS,
            maxCount: 10,
        });

        events.length.should.equal(1);

        const reservation = events.reduce<Partial<Reservation>>((acc, { event }) => {
            switch (event?.type) {
                case 'seat-reserved':
                    return {
                        ...acc,
                        reservationId: event.data.reservationId,
                        movieId: event.data.movieId,
                        seatId: event.data.seatId,
                        userId: event.data.userId,
                    };
                case 'seat-changed': {
                    return {
                        ...acc,
                        seatId: event.data.newSeatId,
                    };
                }
                default:
                    return acc;
            }
        }, {});

        reservation.seatId?.should.equal(event.data.seatId);
    });
});
