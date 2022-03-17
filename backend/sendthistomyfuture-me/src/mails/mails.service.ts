import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { CreateMailDto } from './dto/create-mail.dto';
import { Mail } from './entities/mail.entity';
import { encrypt, hashUrl } from '../helper/crypto';

@Injectable()
export class MailsService {
  constructor(
    @InjectModel(Mail.name) private mailModel: Model<Mail>,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  create({ body, mail, send_date, random_date }: CreateMailDto) {
    let verification_code = hashUrl();

    this.mailerService.sendMail({
      to: mail,
      subject: 'Email verification || sendthistomyfuture.me',
      text: `${this.configService.get<string>(
        'CLIENT_URL',
      )}/verification/${verification_code}`,
    });
    mail = encrypt(mail).content;
    body = encrypt(body).content;
    const newMail = new this.mailModel({
      mail,
      body,
      send_date,
      verification_code,
    });
    return newMail.save();
  }
}
