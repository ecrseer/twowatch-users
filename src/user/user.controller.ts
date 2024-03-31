import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create(@Body() createUserDto: CreateUserDto) {
  @Get()
  create() {
    return this.userService.create({
      name: 'test',
      email: 'test@mail',
      password: '123test',
    });
  }
}
