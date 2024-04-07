import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    delete createUserDto._id;
    return this.userService.create(createUserDto);
  }

  @Get('by-id/:id')
  async get_user_by_id(@Param('id') id: string) {
    return await this.userService.find_one_user(id);
  }
}
