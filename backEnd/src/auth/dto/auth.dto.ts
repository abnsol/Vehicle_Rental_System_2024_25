import { IsEmail, IsString, MinLength } from 'class-validator';

// SignUpDTO: Handles user registration data
export class SignUpDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  // @IsString({ message: 'Phone number must be a string' })
  // phone: string;

  @IsString({ message: 'First name must be a string' })
  firstName: string;

  // @IsString({ message: 'Role must be a string' })
  // role?: 'user' | 'admin';
}

// SignInDTO: Handles user login data
export class SignInDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
