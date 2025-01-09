import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RentHistoryService {
  constructor(private prisma: PrismaService) {}

  async getAllRentHistories() {
    return await this.prisma.rentHistory.findMany();
  }

  async getUserRentHistories(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return 'User not found';
    }

    return await this.prisma.rentHistory.findMany({ where: { userId } });
  }

  async getRentHistoryById(userId: number, rentHistoryId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return 'User not found';
    }

    const rentHistory = await this.prisma.rentHistory.findUnique({
      where: { id: rentHistoryId },
    });
    if (
      !rentHistory &&
      rentHistory.userId !== userId &&
      user.role !== 'ADMIN'
    ) {
      return 'Rent history not found';
    }

    return rentHistory;
  }
}
