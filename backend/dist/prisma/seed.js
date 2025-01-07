"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const argon = require("argon2");
const prisma = new client_1.PrismaClient();
async function seed(prisma) {
    const email = 'admin@admin.com';
    const adminPassword = await argon.hash('admin123');
    const existingAdmin = await prisma.user.findUnique({
        where: { email },
    });
    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                firstName: 'Admin',
                email,
                password: adminPassword,
                role: 'ADMIN',
            },
        });
        console.log('Admin user created.');
    }
    else {
        console.log('Admin user already exists.');
    }
    for (let i = 0; i < 5; i++) {
        const password = await argon.hash('user123');
        await prisma.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                password: password,
                role: 'USER',
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
            },
        });
    }
    console.log('5 Users created!');
    const vehicles = [
        {
            model: '911',
            brand: 'Porsche',
            group: 'Sports Car',
            price: 150000,
            available: true,
            manufactured: new Date('2001-12-20'),
        },
        {
            model: 'Civic',
            brand: 'Honda',
            group: 'Economy',
            price: 20000,
            available: true,
            manufactured: new Date('2018-05-15'),
        },
        {
            model: 'Model S',
            brand: 'Tesla',
            group: 'Luxury Electric',
            price: 90000,
            available: true,
            manufactured: new Date('2020-09-25'),
        },
        {
            model: 'Mustang',
            brand: 'Ford',
            group: 'Muscle Car',
            price: 55000,
            available: true,
            manufactured: new Date('2015-03-10'),
        },
        {
            model: 'Corolla',
            brand: 'Toyota',
            group: 'Compact',
            price: 18000,
            available: true,
            manufactured: new Date('2019-07-30'),
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
//# sourceMappingURL=seed.js.map