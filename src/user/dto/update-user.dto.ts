import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
  _id: string;
}
