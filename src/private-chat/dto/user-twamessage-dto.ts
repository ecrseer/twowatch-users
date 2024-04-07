import { TwaMessage } from '../entities/twamessage.schema';

export class UserTwaMessageDto extends TwaMessage {
  sender_user_name: string;
}
