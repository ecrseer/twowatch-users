import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PrivateChatService } from './private-chat.service';
import { CreatePrivateChatDto } from './dto/create-private-chat.dto';
import { UpdatePrivateChatDto } from './dto/update-private-chat.dto';

@WebSocketGateway({ cors: true })
export class PrivateChatGateway {
  constructor(private readonly privateChatService: PrivateChatService) {}

  @SubscribeMessage('start_private_chat')
  start_private_chat(
    @MessageBody() createPrivateChatDto: CreatePrivateChatDto,
  ) {
    console.log(
      '~☠️ ~ PrivateChatGateway ~ createPrivateChatDto:',
      createPrivateChatDto,
    );
    return this.privateChatService.create(createPrivateChatDto);
  }
}
