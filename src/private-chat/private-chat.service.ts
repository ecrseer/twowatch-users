import { Injectable } from '@nestjs/common';
import { CreatePrivateChatDto as StartPrivateChatDto } from './dto/create-private-chat.dto';
import { UpdatePrivateChatDto } from './dto/update-private-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PrivateChat } from './entities/private-chat.entity';
import { Model } from 'mongoose';
import { TwaMessage } from './entities/twamessage.schema';

@Injectable()
export class PrivateChatService {
  constructor(
    @InjectModel(PrivateChat.name) private privateChatModel: Model<PrivateChat>,
  ) {}

  async find_private_chat_or_create_one(
    createPrivateChatDto: StartPrivateChatDto,
  ): Promise<PrivateChat> {
    const found = await this.privateChatModel
      .findOne({
        users: { $all: createPrivateChatDto.users },
      })
      .exec();
    console.log('~☠️ ~ find_private_chat_or_create_one:', {
      createPrivateChatDto,
      found,
    });
    if (found) {
      return found;
    }
    return this.privateChatModel.create(createPrivateChatDto);
  }

  public async find_one(_id: string) {
    const room = await this.privateChatModel.findOne({ _id }).exec();
    console.log('~☠️ ~ PrivateChatService ~ find_one ~ room:', room);
    return room;
  }

  public async add_message(
    room_id: string,
    message: TwaMessage,
  ): Promise<PrivateChat> {
    const updated = await this.privateChatModel.findOneAndUpdate(
      { _id: room_id },
      { $push: { messages: message } },
      { returnOriginal: false },
    );
    return updated;
  }
}
