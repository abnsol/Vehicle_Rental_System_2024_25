import { IsNumber, IsString, IsEnum, Min, IsDateString } from 'class-validator';

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
  color: string;

  @IsString()
  madeIn: string;

  @IsDateString({}, { message: 'Manufactured must be a valid ISO date string' })
  manufactured: string;

  @IsNumber()
  @Min(1, { message: 'Seating capacity must be at least 1' })
  seatingCapacity: number;

  @IsString({ each: true })
  images: string;
}
