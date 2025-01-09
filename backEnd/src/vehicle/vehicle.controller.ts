import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDTO, EditVehicleDTO } from './dto';
import { JWTGuard } from '../auth/guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@UseGuards(JWTGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  // Add a new vehicle
  @Post()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  createVehicle(@Body() dto: CreateVehicleDTO) {
    return this.vehicleService.createVehicle(dto);
  }

  // Get all vehicles
  @Get()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  // Get all available vehicles
  @Get('available')
  getAvailableVehicle() {
    return this.vehicleService.getAvailableVehicle();
  }

  // Get vehicle by ID
  @Get(':id')
  getVehicleById(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.getVehicleById(id);
  }

  // Edit vehicle by ID
  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  editVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditVehicleDTO,
  ) {
    return this.vehicleService.editVehicle(id, dto);
  }

  // Delete vehicle by ID
  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.deleteVehicle(id);
  }

  // Set vehicle availability to available
  @Post('available')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  setAvailable(@Body('id', ParseIntPipe) id: number) {
    return this.vehicleService.setAvailable(id);
  }

  // Set vehicle availability to unavailable
  @Post('unavailable')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  setUnavailable(@Body('id', ParseIntPipe) id: number) {
    return this.vehicleService.setUnavailable(id);
  }

  // Search vehicles with filters
  @Get('search')
  searchVehicles(
    @Query('brand') brand?: string,
    @Query('model') model?: string,
    @Query('group') group?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('color') color?: string,
    @Query('madeIn') madeIn?: string,
    @Query('seatingCapacity') seatingCapacity?: number,
  ) {
    return this.vehicleService.searchVehicles({
      brand,
      model,
      group,
      minPrice,
      maxPrice,
      color,
      madeIn,
      seatingCapacity,
    });
  }
}
