import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  public async create(createUserDto: CreateUserDto) {
    console.log('~☠️ ~ UserService ~ create ~ createUserDto:', createUserDto);
    return await this.userModel.create(createUserDto);
  }

  public async create_private_chat_notification(user_id: string) {}
}
