import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; // needs an api to request too
import { SignInDTO } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';
// import { CreateBookingDto } from '../src/booking/dto/createBooking.dto';
import { EditBookingDto } from '../src/booking/dto/editBooking.dto';
import { CreateVehicleDTO, EditVehicleDTO } from '../src/vehicle/dto';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    const prisma = app.get(PrismaService); // get the prisma.service and store it in the variable
    await prisma.clearDb();
    await app.close();
  });

  //AUTH TESTS
  describe('Auth', () => {
    // no need to sign up since the seed already has an admin user

    const signInDto: SignInDTO = {
      email: 'admin@admin.com',
      password: 'admin123',
    };

    describe('SignIn', () => {
      // should sign in with no error
      it('should SignIn', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signInDto)
          .expectStatus(200)
          .inspect()
          .stores('userAt', 'access_token');
      });
    });
  });

  //USER TESTS
  describe('User Management', () => {
    describe('Get profile', () => {
      it('should get profile', () => {
        return pactum
          .spec()
          .get('/user/profile')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Get All Users', () => {
      it('should get users', () => {
        return pactum
          .spec()
          .get('/user/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect()
          .stores('userId', '[4].id');
      });
    });

    describe('Get User by ID', () => {
      it('should get user by id', async () => {
        return pactum
          .spec()
          .get('/user/{id}')
          .withPathParams('id', '$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Edit Profile', () => {
      const editUserDto: EditUserDto = {
        firstName: 'Vlad',
        lastName: 'Vlad',
        email: 'vladmirputin2@gmail.com',
      };
      it('User Edits Profile', () => {
        return pactum
          .spec()
          .patch('/user/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(editUserDto)
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Promote User to Admin', () => {
      it('should promote user to admin', () => {
        return pactum
          .spec()
          .post('/user/promote')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{userId}' })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('demote Admin to User', () => {
      it('should demote user to admin', () => {
        return pactum
          .spec()
          .post('/user/demote')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{userId}' })
          .inspect()
          .expectStatus(200);
      });
    });
  });

  //VEHICLE TESTS
  describe('Vehicle Management', () => {
    describe('Create Vehicle', () => {
      const createVehicleDto: CreateVehicleDTO = {
        model: '911',
        brand: 'Porsche',
        group: 'Coupe',
        price: 150000,
        color: 'Red',
        madeIn: 'Germany',
        manufactured: new Date('2001-12-20').toISOString(),
        seatingCapacity: 2,
        images: 'assets/images/vehicles/911-1.jpg',
      };

      it('should create vehicle', () => {
        return pactum
          .spec()
          .post('/vehicle/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(createVehicleDto)
          .expectStatus(201)
          .inspect()
          .stores('CreatedVehicle', 'id');
      });
    });

    describe('Get All Vehicles', () => {
      it('should get vehicles', () => {
        return pactum
          .spec()
          .get('/vehicle/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect()
          .stores('vehicleId', '[2].id');
      });
    });

    describe('Get All Available vehicles', () => {
      it('should get only available vehicles', () => {
        return pactum
          .spec()
          .get('/vehicle/available')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Get Vehicle by ID', () => {
      it('should get vehicle by id', () => {
        return pactum
          .spec()
          .get('/vehicle/{id}')
          .withPathParams('id', '$S{vehicleId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
        // .expectBodyContains('911');
      });
    });

    describe('Edit Vehicle', () => {
      const editVehicleDto: EditVehicleDTO = {
        model: 'edited911',
        brand: 'editedPorsche',
        group: 'editedCoupe',
        price: 15.001,
        color: 'EditedRed',
        madeIn: 'EditedGermany',
        manufactured: new Date('2001-12-21').toISOString(),
        seatingCapacity: 2,
        images: 'assets/images/vehicles/911-1.jpg',
      };

      it('should edit vehicle', () => {
        return pactum
          .spec()
          .patch('/vehicle/{id}')
          .withPathParams('id', '$S{vehicleId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(editVehicleDto)
          .inspect()
          .expectStatus(200);
        // .expectBodyContains('GLA 250');
      });
    });

    describe('make Car Unavailable', () => {
      it('should make car unavailable', () => {
        return pactum
          .spec()
          .post('/vehicle/unavailable')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({ id: '$S{vehicleId}' })
          .inspect()
          .expectStatus(201);
        // .expectBodyContains('"available": false');
      });
    });

    describe('make Car Available', () => {
      it('should make car available', () => {
        return pactum
          .spec()
          .post('/vehicle/available')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({ id: '$S{vehicleId}' })
          .inspect()
          .expectStatus(201);
        // .expectBodyContains('"available": true');
      });
    });

    // made delete inside booking modlue since we need it in booking module

    // describe('Delete Vehicle', () => {
    //   it('should delete vehicle', () => {
    //     return pactum
    //       .spec()
    //       .delete('/vehicle/{id}')
    //       .withPathParams('id', '$S{vehicleId}')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .inspect()
    //       .expectStatus(200);
    //   });
    // });
  });

  //BOOKING TESTS
  describe('Booking Management', () => {
    describe('Create Booking', () => {
      // const createBookingDto: CreateBookingDto = {
      //   vehicleId: 1,
      //   startDate: '2022-10-10',
      //   endDate: '2022-10-20',
      // };

      it('should create booking', () => {
        return pactum
          .spec()
          .post('/booking/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            vehicleId: '$S{vehicleId}',
            startDate: '2022-10-10',
            endDate: '2022-10-20',
          })
          .inspect()
          .expectStatus(201)
          .stores('bookingId', 'id');
      });
    });

    describe('Get All Bookings', () => {
      it('should get bookings', () => {
        return pactum
          .spec()
          .get('/booking/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Get an individual user bookings', () => {
      it('should get user bookings', () => {
        return pactum
          .spec()
          .get('/booking/user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Get Booking by ID', () => {
      it('should get booking by id', () => {
        return pactum
          .spec()
          .get('/booking/{id}')
          .withPathParams('id', '$S{bookingId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Edit Booking', () => {
      const editBookingDto: EditBookingDto = {
        startDate: '2022-10-11',
        endDate: '2022-10-21',
      };

      it('should edit booking', () => {
        return pactum
          .spec()
          .patch('/booking/{id}')
          .withPathParams('id', '$S{bookingId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(editBookingDto)
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Change Status', () => {
      it('should change status', () => {
        return pactum
          .spec()
          .post('/booking/status')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{bookingId}', status: 'CONFIRMED' })
          .inspect()
          .expectStatus(201);
      });

      it('should change status', () => {
        return pactum
          .spec()
          .post('/booking/status')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{bookingId}', status: 'COMPLETED' })
          .inspect()
          .expectStatus(201);
      });
    });

    describe('Delete Booking', () => {
      it('should delete booking', () => {
        return pactum
          .spec()
          .delete('/booking/{id}')
          .withPathParams('id', '$S{bookingId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });
  });

  //RENT HISTORY TESTS
  describe('Rent History Management', () => {
    describe('Get Rent History', () => {
      it('should get rent history', () => {
        return pactum
          .spec()
          .get('/rent-history/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200)
          .stores('rentHistoryId', '[0].id');
      });
    });

    describe('Get User Rent History', () => {
      it('should get user rent history', () => {
        return pactum
          .spec()
          .get('/rent-history/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Get Rent History by ID', () => {
      it('should get rent history by id', () => {
        return pactum
          .spec()
          .get('/rent-history/{id}')
          .withPathParams('id', '$S{rentHistoryId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Delete Vehicle', () => {
      it('should delete vehicle', () => {
        return pactum
          .spec()
          .delete('/vehicle/{id}')
          .withPathParams('id', '$S{CreatedVehicle}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });
  });
});
