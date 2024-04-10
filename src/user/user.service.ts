import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  // public async create_private_chat_notification(user_id: string) {}

  public async find_one_user(user_id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id: user_id }).exec();
  }

  public async update_user_movies(user: UpdateUserDto) {
    const found = this.find_one_user(user._id);
    if (!found) {
      throw new NotFoundError('Usuario não encontrado');
    }
    return await this.update_user({
      _id: user._id,
      moviesList: user.moviesList,
    });
  }

  public async update_user(user: Partial<User & { _id: string }>) {
    const updated = await this.userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(user._id) },
      { ...user },
      { new: true },
    );
    return updated;
  }

  async login_user(user: Partial<User>) {
    const found = await this.userModel.findOne({
      email: user.email,
      password: user.password,
    });
    if (!found) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return found;
  }
}
