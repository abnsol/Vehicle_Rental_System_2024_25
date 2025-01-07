import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        id: number;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
    }[]>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
    }>;
    editProfile(userId: number, dto: EditUserDto): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
    }>;
    promoteUserToAdmin(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
    }>;
    demoteAdminToUser(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
    }>;
}
