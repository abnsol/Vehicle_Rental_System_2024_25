import { IsISO8601, IsOptional } from 'class-validator';

export class EditBookingDto {
  @IsISO8601()
  @IsOptional()
  startDate?: string;

  @IsISO8601()
  @IsOptional()
  endDate?: string;
}
