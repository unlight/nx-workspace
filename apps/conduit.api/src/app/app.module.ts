import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventstorePublisherModule } from '@nx-workspace/eventstore-publisher';
import { EventBus } from '@nestjs/cqrs';

@Module({
  imports: [
    UserModule,
    EventstorePublisherModule.register({
      connectionSettings: { endpoint: 'localhost:2113' },
      channelCredentials: { insecure: true },
    }),
    AutomapperModule.forRoot({
      options: [
        {
          name: 'root',
          pluginInitializer: classes,
          errorHandler: {
            handle: (message: string) => {
              throw message;
            },
          },
        },
      ],
      singular: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly eventBus: EventBus) {}
  // onModuleInit() {
  //   this.eventBus.subject$.subscribe(s => {
  //     console.log('s', s);
  //   });
  //   // console.log('eventBus', this.eventBus.subject$);
  //   // this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
  //   // this.event$.publisher = this.eventStore;
  // }
}
