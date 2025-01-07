import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(user: User): {
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
    promoteUserToAdmin(id: number): Promise<{
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
    demoteManagerToUser(id: number): Promise<{
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
