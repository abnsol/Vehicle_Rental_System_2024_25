import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RentHistoryService } from './rent-history.service';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { JWTGuard } from '../auth/guard';
// import { Booking } from '@prisma/client';
import { GetUser } from '../auth/decorator';

@UseGuards(JWTGuard)
@Controller('rent-history')
export class RentHistoryController {
  constructor(private rentHistoryService: RentHistoryService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  getAllRentHistories() {
    return this.rentHistoryService.getAllRentHistories();
  }

  @Get('user')
  getUserRentHistories(@GetUser('id') userId: number) {
    return this.rentHistoryService.getUserRentHistories(userId);
  }

  @Get(':id')
  getRentHistoryById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) rentHistoryId: number,
  ) {
    return this.rentHistoryService.getRentHistoryById(userId, rentHistoryId);
  }
}
