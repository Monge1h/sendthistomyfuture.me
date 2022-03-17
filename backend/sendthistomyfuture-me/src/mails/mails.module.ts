import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import config from '../config';
import { Mail, MailSchema } from './entities/mail.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mail.name,
        schema: MailSchema,
      },
    ]),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          defaults: { from: configService.email_user },
          transport: {
            host: configService.email_service,
            port: 587,
            auth: {
              user: configService.email_user,
              pass: configService.email_password,
            },
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}
