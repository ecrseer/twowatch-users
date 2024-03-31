import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { PrivateChatService } from './private-chat.service';
import { CreatePrivateChatDto } from './dto/create-private-chat.dto';
import { UpdatePrivateChatDto } from './dto/update-private-chat.dto';

@WebSocketGateway()
export class PrivateChatGateway {
  constructor(private readonly privateChatService: PrivateChatService) {}

  @SubscribeMessage('createPrivateChat')
  create(@MessageBody() createPrivateChatDto: CreatePrivateChatDto) {
    return this.privateChatService.create(createPrivateChatDto);
  }

  @SubscribeMessage('findAllPrivateChat')
  findAll() {
    return this.privateChatService.findAll();
  }

  @SubscribeMessage('findOnePrivateChat')
  findOne(@MessageBody() id: number) {
    return this.privateChatService.findOne(id);
  }

  @SubscribeMessage('updatePrivateChat')
  update(@MessageBody() updatePrivateChatDto: UpdatePrivateChatDto) {
    return this.privateChatService.update(updatePrivateChatDto.id, updatePrivateChatDto);
  }

  @SubscribeMessage('removePrivateChat')
  remove(@MessageBody() id: number) {
    return this.privateChatService.remove(id);
  }
}
