import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mail extends Document {
  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  body: string;

  @Prop({required: true})
  send_date: string;

  @Prop({ required: true, default: false })
  verified: boolean;

  @Prop({ required: true })
  verification_code: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
