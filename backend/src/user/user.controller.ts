import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
  constructor() {}

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }
}
