import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
import { PrivateChat } from '../../private-chat/entities/private-chat.entity';

@Schema({ timestamps: true })
export class User {
  @Prop()
  email?: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  moviesList: string[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: PrivateChat.name }],
  })
  privateChatsFixed: PrivateChat[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
