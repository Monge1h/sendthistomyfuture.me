import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { URI } = configService.database;
        return {
          uri: `${URI}`,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
