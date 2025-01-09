import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; // needs an api to request too
import { SignInDTO, SignUpDTO } from '../src/auth/dto';
import { PrismaClient } from '@prisma/client';
import { seed } from '../prisma/seed';
import { EditUserDto } from '../src/user/dto';
import { CreateVehicleDTO, EditVehicleDTO } from '../src/vehicle/dto';
// import { CreateBookingDto } from '../src/booking/dto/createBooking.dto';
import { EditBookingDto } from '../src/booking/dto/editBooking.dto';

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

    const prismaClient = new PrismaClient();
    await seed(prismaClient); // seeds the database
  });

  afterAll(async () => {
    await app.close();
  });

  //AUTH TESTS
  describe('Auth', () => {
    const signUpDto: SignUpDTO = {
      firstName: 'Vlad',
      email: 'vlad4@gmail.com',
      password: '123456',
    };

    const signInDto: SignInDTO = {
      email: 'vlad4@gmail.com',
      password: '123456',
    };

    describe('SignUp', () => {
      // sign up no email and expect the 400 status
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: signUpDto.password,
          })
          .expectStatus(400);
      });

      //sign up no password and expect the 400 status
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: signUpDto.password,
          })
          .expectStatus(400);
      });

      //sign up no dto and expect the 400 status
      it('should throw error if no dto', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      // sign up with no error
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signUpDto)
          .expectStatus(200)
          .inspect();
      });
    });

    describe('SignIn', () => {
      // sign in no email and expect the 400 status
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: signInDto.password,
          })
          .expectStatus(400);
      });

      //signin no password and expect the 400 status
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: signInDto.password,
          })
          .expectStatus(400);
      });

      //signin no dto and expect the 400 status
      it('should throw error if no dto', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });

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
          .expectStatus(403);
      });
    });

    describe('Get User by ID', () => {
      it('should get user by id', () => {
        return pactum
          .spec()
          .get('/user/100')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(403);
      });
    });

    describe('Edit Profile', () => {
      const editUserDto: EditUserDto = {
        firstName: 'Vlad',
        lastName: 'Vlad',
        email: 'vladmirputin@gmail.com',
      };
      it('User Edits Profile', () => {
        return pactum
          .spec()
          .patch('/user/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(editUserDto)
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Promote User to Admin', () => {
      it('should not promote user to admin', () => {
        return pactum
          .spec()
          .post('/user/promote')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: 100 })
          .expectStatus(403);
      });
    });

    describe('Demote User to Admin', () => {
      it('should not Demote user to admin', () => {
        return pactum
          .spec()
          .post('/user/demote')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: 100 })
          .expectStatus(403);
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
          .expectStatus(403);
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
          .expectStatus(403);
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
          .expectStatus(200)
          .stores('vehicleId', '[2].id');
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
        manufactured: new Date('2001-12-20').toISOString(),
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
          .expectStatus(403);
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
          .expectStatus(403);
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
          .expectStatus(403);
      });
    });

    // move this to the end of booking tests

    // describe('Delete Vehicle', () => {
    //   it('should delete vehicle', () => {
    //     return pactum
    //       .spec()
    //       .delete('/vehicle/{id}')
    //       .withPathParams('id', '$S{vehicleId}')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .expectStatus(403);
    //   });
    // });
  });

  //BOOKING TESTS
  describe('Booking Management', () => {
    describe('Create Booking', () => {
      // const createBookingDto: CreateBookingDto = {
      //   vehicleId: '$S{vehicleId}',
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
          .expectStatus(403);
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
      it('should change status to confirmed', () => {
        return pactum
          .spec()
          .post('/booking/status')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{bookingId}', status: 'CONFIRMED' })
          .inspect()
          .expectStatus(403);
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
          .withBody({ id: '$S{bookingId}', status: 'COMPLETED' })
          .inspect()
          .expectStatus(403);
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

    describe('Delete Vehicle', () => {
      it('should delete vehicle', () => {
        return pactum
          .spec()
          .delete('/vehicle/{id}')
          .withPathParams('id', '$S{vehicleId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(403);
      });
    });
  });

  //RENT HISTORY TESTS - Not Applicable

  // describe('Rent History Management', () => {
  //   describe('Get Rent History', () => {
  //     it('should get rent history', () => {
  //       return pactum
  //         .spec()
  //         .get('/rent-history/')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .inspect()
  //         .expectStatus(403);
  //     });
  //   });

  //   describe('Get User Rent History', () => {
  //     it('should get user rent history', () => {
  //       return pactum
  //         .spec()
  //         .get('/rent-history/user')
  //         .withHeaders({ Authorization: '$S{userAt}' })
  //         .expectStatus(200)
  //         .inspect()
  //         .stores('rentHistoryId', '[0].id');
  //     });
  //   });

  //   describe('Get Rent History by ID', () => {
  //     it('should get rent history by id', () => {
  //       return pactum
  //         .spec()
  //         .get('/rent-history/{id}')
  //         .withPathParams('id', '$S{rentHistoryId}')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .inspect()
  //         .expectStatus(400);
  //     });
  //   });
});
