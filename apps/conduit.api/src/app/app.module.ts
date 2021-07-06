import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AutomapperModule.forRoot({
      options: [
        {
          name: 'root',
          pluginInitializer: classes,
          // errorHandler: {
          //   handle: message => {
          //     console.log('message', message);
          //   },
          // },
        },
      ],
      singular: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
