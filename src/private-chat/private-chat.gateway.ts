import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PrivateChatService } from './private-chat.service';
import { CreatePrivateChatDto } from './dto/create-private-chat.dto';
import { UpdatePrivateChatDto } from './dto/update-private-chat.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PrivateChatGateway {
  constructor(private readonly privateChatService: PrivateChatService) {}

  @SubscribeMessage('start_private_chat')
  start_private_chat(
    @MessageBody() createPrivateChatDto: CreatePrivateChatDto,
  ) {
    return this.privateChatService.find_private_chat_or_create_one(
      createPrivateChatDto,
    );
  }

  @SubscribeMessage('enter_private_chat')
  async find_one(
    @MessageBody() priv_chat_id: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(priv_chat_id);
    return await this.privateChatService.find_one(priv_chat_id);
  }

  @SubscribeMessage('send_message_private_chat')
  async send_message_private_chat(
    @MessageBody()
    user: { room_id: string; sender_user_id: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const updated = this.privateChatService.add_message(user.room_id, {
      content: user.content,
      sender_user_id: user.sender_user_id,
    });
    client.to(user.room_id).emit('append_message_private_chat', updated);
  }
}
