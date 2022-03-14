import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';

import { Mail, MailSchema } from './entities/mail.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mail.name,
        schema: MailSchema,
      },
    ]),
  ],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}
