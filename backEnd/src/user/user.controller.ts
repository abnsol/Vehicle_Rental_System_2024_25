import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
// import { Role } from '../auth/roles/roles.enum';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
  constructor() {}

  @Get('profile')
  @Roles('USER')
  @UseGuards(RoleGuard)
  getProfile(@GetUser() user: User) {
    return user;
  }
}
