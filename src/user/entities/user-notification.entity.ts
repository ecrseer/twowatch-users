import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Notification {
  //   @Prop()
  //   _id: string;
  @Prop()
  type:
    | 'PRIVATE_MESSAGE'
    | 'FRIEND_REQUEST'
    | 'FRIEND_REQUEST_ACCEPTED'
    | 'FRIEND_REQUEST_REJECTED';

  @Prop()
  message: string;

  @Prop()
  read_at: Date;
}

@Schema({ timestamps: true })
export class UserNotifications {
  //   @Prop()
  //   _id: string;
  @Prop()
  user_id: string;
  @Prop()
  private_message: Notification[];
}
