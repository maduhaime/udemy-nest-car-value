import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { Serialize } from '../decorators/serialize.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

import { User } from 'src/users/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
