import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditVehicleDTO {
  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  madeIn?: string;

  @IsString()
  @IsOptional()
  manufactured?: string;

  @IsNumber()
  @IsOptional()
  seatingCapacity?: number;

  @IsString({ each: true })
  @IsOptional()
  images?: string;
}
