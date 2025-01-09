import { Module } from '@nestjs/common';
import { RentHistoryService } from './rent-history.service';
import { RentHistoryController } from './rent-history.controller';

@Module({
  providers: [RentHistoryService],
  controllers: [RentHistoryController],
})
export class RentHistoryModule {}
