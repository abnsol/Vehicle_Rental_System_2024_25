import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // sign in and get 200 status code
  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK) // sign in and get 200 status code
  @Post('signin')
  signin(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto);
  }
}
