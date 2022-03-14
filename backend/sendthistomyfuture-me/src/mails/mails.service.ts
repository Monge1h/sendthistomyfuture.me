import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailDto } from './dto/create-mail.dto';
import { Mail } from './entities/mail.entity';

@Injectable()
export class MailsService {
  constructor(@InjectModel(Mail.name) private mailModel: Model<Mail>) {}

  create({ body, mail, send_date, random_date }: CreateMailDto) {
    const newMail = new this.mailModel({
      mail,
      body,
      send_date,
      verification_code: '23',
    });
    return newMail.save();
  }
}
