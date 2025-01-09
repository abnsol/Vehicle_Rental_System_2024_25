import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDTO, EditVehicleDTO } from './dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  // Create a new vehicle
  async createVehicle(dto: CreateVehicleDTO) {
    return this.prisma.vehicle.create({
      data: dto,
    });
  }

  // Get all vehicles
  async getAllVehicles() {
    return this.prisma.vehicle.findMany();
  }

  // Get all available vehicles
  async getAvailableVehicle() {
    return this.prisma.vehicle.findMany({
      where: {
        available: true,
      },
    });
  }

  // Get a vehicle by ID
  async getVehicleById(id: number) {
    return this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
  }

  // Edit a vehicle's details
  async editVehicle(id: number, dto: EditVehicleDTO) {
    return this.prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  // Set a vehicle as available
  async setAvailable(id: number) {
    return this.prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        available: true,
      },
    });
  }

  // Set a vehicle as unavailable
  async setUnavailable(id: number) {
    return this.prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        available: false,
      },
    });
  }

  // Delete a vehicle
  async deleteVehicle(id: number) {
    return this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
  }

  // Search vehicles with filters
  async searchVehicles(filters: {
    brand?: string;
    model?: string;
    group?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    madeIn?: string;
    seatingCapacity?: number;
  }) {
    const {
      brand,
      model,
      group,
      minPrice,
      maxPrice,
      color,
      madeIn,
      seatingCapacity,
    } = filters;

    return this.prisma.vehicle.findMany({
      where: {
        brand: brand ? { contains: brand, mode: 'insensitive' } : undefined,
        model: model ? { contains: model, mode: 'insensitive' } : undefined,
        group: group ? { equals: group, mode: 'insensitive' } : undefined,
        price: {
          gte: minPrice || undefined,
          lte: maxPrice || undefined,
        },
        color: color ? { contains: color, mode: 'insensitive' } : undefined,
        madeIn: madeIn ? { contains: madeIn, mode: 'insensitive' } : undefined,
        seatingCapacity: seatingCapacity
          ? { equals: seatingCapacity }
          : undefined,
      },
    });
  }
}
