import { Injectable } from '@nestjs/common';
import { CreatePrivateChatDto as StartPrivateChatDto } from './dto/create-private-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PrivateChat } from './entities/private-chat.entity';
import { Model } from 'mongoose';
import { TwaMessage } from './entities/twamessage.schema';
import { UserService } from '../user/user.service';
import { UserTwaMessageDto } from './dto/user-twamessage-dto';

@Injectable()
export class PrivateChatService {
  constructor(
    @InjectModel(PrivateChat.name) private privateChatModel: Model<PrivateChat>,
    private userService: UserService,
  ) {}

  async find_private_chat_or_create_one(
    createPrivateChatDto: StartPrivateChatDto,
  ): Promise<PrivateChat> {
    const found = await this.privateChatModel
      .findOne({
        users: { $all: createPrivateChatDto.users },
      })
      .exec();

    if (found) {
      return found;
    }
    return this.privateChatModel.create(createPrivateChatDto);
  }

  public async find_one(_id: string) {
    const room = await this.privateChatModel.findOne({ _id }).exec();
    const mapped = await this.get_room_with_user_names(room);
    return mapped;
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

    const mapped = await this.get_room_with_user_names(updated);

    return mapped;
  }

  public async get_room_with_user_names(
    private_room: PrivateChat,
  ): Promise<PrivateChat> {
    const [sender, receiver] = private_room.users;
    const first_user = await this.userService.find_one_user(sender);
    const second_user = await this.userService.find_one_user(receiver);

    const mapped_messages: UserTwaMessageDto[] = private_room.messages.map(
      (msg) => {
        const names = {
          [`${first_user._id}`]: first_user.name,
          [`${second_user._id}`]: second_user.name,
        };

        const sender_user_name = names[msg.sender_user_id];
        return { ...msg, sender_user_name };
      },
    );

    private_room.messages = mapped_messages;
    return private_room;
  }

  async find_all_chats_from_user(user_id: string) {
    const found = await this.privateChatModel
      .find({
        users: { $in: [user_id] },
      })
      .exec();
    return found;
  }
}
