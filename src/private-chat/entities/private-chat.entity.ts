import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { TwaMessage } from './twamessage.schema';

@Schema({ timestamps: true })
export class PrivateChat {
  @Prop()
  users: string[];

  @Prop()
  messages: TwaMessage[];

  @Prop()
  isDeleted?: boolean;
}

export type PrivateChatDocument = HydratedDocument<PrivateChat>;

export const PrivateChatSchema = SchemaFactory.createForClass(PrivateChat);
