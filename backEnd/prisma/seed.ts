import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
// import { PrismaService } from '../src/prisma/prisma.service';
// import { ConfigService } from '@nestjs/config';
// import { Role } from 'src/auth/roles/roles.enum';

// const prisma = new PrismaClient();
// const config = new ConfigService();
// const prismaService = new PrismaService(config);

export async function seed(prisma: PrismaClient) {
  // Clear existing data
  // prismaService.clearDb();
  // await prisma.$transaction([
  //   prisma.booking.deleteMany(),
  //   prisma.rentHistory.deleteMany(),
  //   prisma.vehicle.deleteMany(),
  //   prisma.user.deleteMany(),
  // ]);
  // console.log('Database cleaned!');

  // Create Admin
  const email = 'admin@admin.com';
  const adminPassword = await argon.hash('admin123');
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    // Create the first admin user
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        email,
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  // Create 5 Users
  for (let i = 0; i < 5; i++) {
    const password = await argon.hash('user123');
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: password,
        role: 'USER',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    });
  }

  console.log('5 Users created!');
}

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
