import { SignInDTO, SignUpDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signUp(dto: SignUpDTO): Promise<{
        access_token: string;
    }>;
    signIn(dto: SignInDTO): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            password: string;
            role: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string | null;
        };
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
