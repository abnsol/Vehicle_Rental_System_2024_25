import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; // needs an api to request too
import { SignInDTO } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
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
});
