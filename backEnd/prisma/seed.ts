import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
// import { PrismaService } from '../src/prisma/prisma.service';
// import { ConfigService } from '@nestjs/config';
// import { Role } from 'src/auth/roles/roles.enum';

const prisma = new PrismaClient();
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

  const vehicles = [
    {
      model: '911',
      brand: 'Porsche',
      group: 'Coupe',
      price: 150000,
      color: 'Red',
      madeIn: 'Germany',
      manufactured: new Date('2001-12-20').toISOString(),
      seatingCapacity: 2,
      images: 'assets/images/vehicles/911-1.jpg',
    },
    {
      model: 'Civic',
      brand: 'Honda',
      group: 'Sedan',
      price: 20000,
      color: 'Blue',
      madeIn: 'Japan',
      manufactured: new Date('2018-05-15').toISOString(),
      seatingCapacity: 5,
      images: 'assets/images/vehicles/civic-1.jpg',
    },
    {
      model: 'Model S',
      brand: 'Tesla',
      group: 'Sedan',
      price: 90000,
      color: 'White',
      madeIn: 'USA',
      manufactured: new Date('2020-09-25').toISOString(),
      seatingCapacity: 5,
      images: 'assets/images/vehicles/model-s-1.jpg',
    },
    {
      model: 'Mustang',
      brand: 'Ford',
      group: 'Coupe',
      price: 55000,
      color: 'Black',
      madeIn: 'USA',
      manufactured: new Date('2015-03-10').toISOString(),
      seatingCapacity: 4,
      images: 'assets/images/vehicles/mustang-1.jpg',
      available: false,
    },
    {
      model: 'Corolla',
      brand: 'Toyota',
      group: 'Hatchback',
      price: 18000,
      color: 'Gray',
      madeIn: 'Japan',
      manufactured: new Date('2019-07-30').toISOString(),
      seatingCapacity: 5,
      images: 'assets/images/vehicles/corolla-1.jpg',
      available: false,
    },
  ];

  vehicles.forEach(async (vehicle) => {
    await prisma.vehicle.create({
      data: vehicle,
    });
  });

  console.log('5 Vehicles created!');
}

seed(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
