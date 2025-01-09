import { IsInt, IsISO8601 } from 'class-validator';

export class CreateBookingDto {
  @IsInt({ message: 'Vehicle ID must be a number' })
  vehicleId: number;

  @IsISO8601({}, { message: 'Invalid date format' })
  startDate: string;

  @IsISO8601({}, { message: 'Invalid date format' })
  endDate: string;
}
