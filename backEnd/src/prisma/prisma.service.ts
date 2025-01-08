import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  //logic to run before our e2e test
  clearDb() {
    return this.$transaction([
      this.booking.deleteMany(),
      this.rentHistory.deleteMany(),
      this.user.deleteMany(),
      this.vehicle.deleteMany(),
    ]);
  }
}
