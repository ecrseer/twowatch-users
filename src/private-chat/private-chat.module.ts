import { Module } from '@nestjs/common';
import { PrivateChatService } from './private-chat.service';
import { PrivateChatGateway } from './private-chat.gateway';
import { PrivateChat, PrivateChatSchema } from './entities/private-chat.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrivateChat.name, schema: PrivateChatSchema },
    ]),
    UserModule,
  ],
  providers: [PrivateChatGateway, PrivateChatService],
})
export class PrivateChatModule {}
