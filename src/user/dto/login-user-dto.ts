import { User } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class LoginUserDto extends PartialType(User) {
  email: string;
  password: string;
}
