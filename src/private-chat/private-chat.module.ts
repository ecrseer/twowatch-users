import { Module } from '@nestjs/common';
import { PrivateChatService } from './private-chat.service';
import { PrivateChatGateway } from './private-chat.gateway';

@Module({
  providers: [PrivateChatGateway, PrivateChatService],
})
export class PrivateChatModule {}
