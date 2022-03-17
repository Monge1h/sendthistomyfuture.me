import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { MailsService } from './mails.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailsService.create(createMailDto);
  }

  @Put(':verificationCode')
  verifyEmail(@Param('verificationCode') verificationCode: string) {
    return this.mailsService.verificateEmail(verificationCode);
  }
}
