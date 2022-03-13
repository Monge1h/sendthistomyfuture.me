import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Injectable()
export class MailsService {
  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }
}
