import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PrivateChatModule } from './private-chat/private-chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOURI),
    UserModule,
    PrivateChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
