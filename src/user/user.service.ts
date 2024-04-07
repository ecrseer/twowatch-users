import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  public async create_private_chat_notification(user_id: string) {}

  public async find_one_user(user_id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id: user_id }).exec();
  }
}
