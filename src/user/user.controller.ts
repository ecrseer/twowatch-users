import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(
      '~☠️ ~ UserController ~ create ~ createUserDto:',
      createUserDto,
    );
    delete createUserDto._id;
    return this.userService.create(createUserDto);
  }
}
