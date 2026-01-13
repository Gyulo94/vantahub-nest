import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { Payload } from 'src/global/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@CurrentUser() user: Payload) {
    console.log(user);

    return this.userService.findById(user.id);
  }
}
