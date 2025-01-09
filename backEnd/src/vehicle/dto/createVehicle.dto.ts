import { IsNumber, IsString, IsEnum, Min, IsDateString, IsOptional } from 'class-validator';

export class CreateVehicleDTO {
  @IsString()
  model: string;

  @IsString()
  brand: string;

  @IsEnum(['SUV', 'Sedan', 'Truck', 'Hatchback', 'Coupe'], {
    message: 'Group must be one of SUV, Sedan, Truck, Hatchback, Coupe',
  })
  group: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  madeIn?: string;

  @IsDateString({}, { message: 'Manufactured must be a valid ISO date string' })
  @IsOptional()
  manufactured?: string;

  @IsNumber()
  @IsOptional()
  seatingCapacity?: number;

  @IsString()
  @IsOptional()
  images?: string;
}
