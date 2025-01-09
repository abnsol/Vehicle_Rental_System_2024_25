import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }

  @Get('users')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch()
  editProfile(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editProfile(userId, dto);
  }

  @Post('promote')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  promoteUserToAdmin(@Body('userId') id: number) {
    return this.userService.promoteUserToAdmin(id);
  }

  @Post('demote')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  demoteManagerToUser(@Body('userId') id: number) {
    return this.userService.demoteAdminToUser(id);
  }
}
