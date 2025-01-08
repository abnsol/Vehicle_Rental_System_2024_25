import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { GetUser } from '../auth/decorator';
import { EditBookingDto } from './dto/editBooking.dto';
import { CreateBookingDto } from './dto/createBooking.dto';
import { JWTGuard } from '../auth/guard';

@UseGuards(JWTGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(@GetUser('id') userId: number, @Body() dto: CreateBookingDto) {
    console.log(dto);
    return this.bookingService.createBooking(userId, dto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get('user')
  getUserBookings(@GetUser('id') userId: number) {
    return this.bookingService.getUserBookings(userId);
  }

  @Get(':id')
  getBookingById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
  ) {
    return this.bookingService.getBookingById(userId, bookingId);
  }

  @Patch(':id')
  updateBooking(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
    @Body() dto: EditBookingDto,
  ) {
    return this.bookingService.updateBooking(userId, bookingId, dto);
  }

  @Post('status')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  changeBookingStatus(
    @GetUser('id') userId: number,
    @Body('id') bookingId: number,
    @Body('status') status: string,
  ) {
    return this.bookingService.changeBookingStatus(userId, bookingId, status);
  }

  @Delete(':id')
  deleteBooking(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
  ) {
    return this.bookingService.deleteBooking(userId, bookingId);
  }
}
