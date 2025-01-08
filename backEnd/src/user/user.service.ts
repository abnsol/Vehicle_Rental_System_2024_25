import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    delete user.password;
    return user;
  }

  async editProfile(userId: number, dto: EditUserDto) {
    // edit profile logic
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;
    return user;
  }
  async promoteUserToAdmin(userId: number) {
    // find the user by id and change its role to admin
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    const promotedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: 'ADMIN',
      },
    });

    delete promotedUser.password;
    return promotedUser;
  }

  async demoteAdminToUser(userId: number) {
    // find the user by id and change its role to user
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    const demotedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: 'USER',
      },
    });

    delete demotedUser.password;
    return demotedUser;
  }
}
