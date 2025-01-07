import { SignInDTO, SignUpDTO } from './dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpDTO): Promise<{
        access_token: string;
    }>;
    signin(dto: SignInDTO): Promise<{
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
}
