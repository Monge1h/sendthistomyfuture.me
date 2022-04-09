import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { Cron } from '@nestjs/schedule';

import { CreateMailDto } from './dto/create-mail.dto';
import { Mail } from './entities/mail.entity';
import { decrypt, encrypt, hashUrl } from '../helper/crypto';

@Injectable()
export class MailsService {
  constructor(
    @InjectModel(Mail.name) private mailModel: Model<Mail>,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  create({ body, mail, send_date, random_date }: CreateMailDto) {
    const verification_code = hashUrl();

    if (random_date === true) {
      const date_now = DateTime.now();
      const date_treshold = DateTime.now().plus({ month: 6 });
      // generate random date between now and six month towards
      send_date = new Date(
        date_now.toMillis() +
          Math.random() * (date_treshold.toMillis() - date_now.toMillis()),
      )
        .toISOString()
        .split('T')[0];
    }

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

  verificateEmail(verificationCode: string) {
    const verified_email = this.mailModel
      .findOneAndUpdate(
        { verification_code: verificationCode },
        { verified: true },
        { new: true },
      )
      .exec();
    if (!verified_email) {
      throw new NotFoundException(`Email not found`);
    }
    return verified_email;
  }

  private async sendTodayEmails() {
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    // 📬 Get all mails from today
    const mails = await this.mailModel.find({
      send_date: today,
      verified: true,
    });
    Promise.all(
      mails.map((mail) => {
        const body = decrypt(mail.body);
        const email = decrypt(mail.mail);
        this.mailerService.sendMail({
          to: email,
          subject: 'From you to you. || sendthistomyfuture.me',
          text: body,
        });
      }),
    );
    // 🔥 delete all mails from today
    this.mailModel.deleteMany({ send_date: today }).exec();
    return mails;
  }

  @Cron('0 12 * * *')
  handleCron() {
    this.sendTodayEmails();
  }
}
