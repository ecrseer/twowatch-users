import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('by-id/:id')
  async get_user_by_id(@Param('id') id: string) {
    return await this.userService.find_one_user(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    delete createUserDto._id;
    return this.userService.create(createUserDto);
  }

  @Patch('/save-movies')
  add_user_movies(@Body() update_user: UpdateUserDto) {
    return this.userService.update_user_movies(update_user);
  }

  @Patch()
  update(@Body() createUserDto: UpdateUserDto) {
    return this.userService.create(createUserDto);
  }
}
