import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { EditBookingDto } from './dto/editBooking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(userId: number, dto: CreateBookingDto) {
    const { vehicleId, startDate, endDate } = dto;
    //check if vehicle is available
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
    if (!vehicle) {
      return 'vehicle not found';
    }
    if (!vehicle.available) {
      return 'Vehicle not available';
    }

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const duration = Math.ceil(
      (eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24),
    ); //in days
    console.log(duration);

    if (duration <= 0) {
      throw new Error('Invalid booking duration');
    }

    const totalPrice = duration * vehicle.price;
    console.log(totalPrice);
    console.log(vehicle);

    //create booking
    const booking = await this.prisma.booking.create({
      data: {
        vehicleId,
        startDate: sDate,
        endDate: eDate,
        userId,
        totalPrice,
      },
    });

    // make car unavailable
    await this.prisma.vehicle.update({
      where: { id: vehicleId },
      data: { available: false },
    });

    return booking;
  }

  async getAllBookings() {
    return await this.prisma.booking.findMany();
  }

  async getUserBookings(userId: number) {
    return await this.prisma.booking.findMany({ where: { userId } });
  }

  async getBookingById(userId: number, bookingId: number) {
    //get user and check if user is admin or not
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    //get booking
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (userId !== booking.userId && user.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    return booking;
  }

  async updateBooking(userId: number, bookingId: number, dto: EditBookingDto) {
    const { startDate, endDate } = dto;
    //get user
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    //get booking
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (userId !== booking.userId && user.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }
    //update booking
    const updateBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    return updateBooking;
  }

  async changeBookingStatus(userId: number, bookingId: number, status: string) {
    //get booking
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }

    //change status
    const updateBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    if (status === 'CONFIRMED') {
      //make car unavailable
      await this.prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { available: false },
      });
    }

    if (status === 'COMPLETED') {
      //make car available
      await this.prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { available: true },
      });

      //create rent history
      await this.prisma.rentHistory.create({
        data: {
          vehicleId: updateBooking.vehicleId,
          userId: updateBooking.userId,
          startDate: updateBooking.startDate,
          endDate: updateBooking.endDate,
          //   status: 'COMPLETED',
        },
      });

      //delete booking
      await this.deleteBooking(userId, bookingId);
    }

    return updateBooking;
  }

  async deleteBooking(userId: number, bookingId: number) {
    //get user
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return 'User not found';
    }
    //get booking
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      return 'Booking not found';
    }
    if (userId !== booking.userId && user.role !== 'ADMIN') {
      return 'Unauthorized';
    }

    //delete booking
    await this.prisma.booking.delete({ where: { id: bookingId } });

    //make car available
    await this.prisma.vehicle.update({
      where: { id: booking.vehicleId },
      data: { available: true },
    });

    return { message: 'Booking deleted' };
  }
}
