import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  // async beacause it calls prisma
  async signUp(dto: SignUpDTO) {
    //generate hash password
    const hash = await argon.hash(dto.password);

    try {
      // save the new user to the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          firstName: dto.firstName,
        },
      });

      // return token instead
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        // if duplicate user is inactive just make it active

        //else
        throw new ForbiddenException('credentials taken');
      }
      throw e;
    }
  }

  async signIn(dto: SignInDTO) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // no user by email throw error
    // or if user is inactive throw error
    if (!user) throw new ForbiddenException('Incorrect Credentials');

    //compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    // password mismatch throw an error
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');

    // return token instead
    const access_token = this.signToken(user.id, user.email);
    delete user.password;
    return { access_token: (await access_token).access_token, user: user };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });

    return { access_token: token };
  }
}
