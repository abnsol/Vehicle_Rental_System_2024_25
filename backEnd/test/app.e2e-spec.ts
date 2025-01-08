import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; // needs an api to request too
import { SignInDTO, SignUpDTO } from '../src/auth/dto';
import { PrismaClient } from '@prisma/client';
import { seed } from '../prisma/seed';
import { EditUserDto } from 'src/user/dto';

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
});
