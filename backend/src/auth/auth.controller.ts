import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/in/login.dto';
import { LoginResponse } from './dto/out/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  // post register

  // whatever is needed for google or other oauth

  // delete unwanted user (admin + self-deletion)

  // get user

  // get all users with pagination

  // get role

  // get all roles with pagination

  // get permission

  // get all permissions with pagination

  // post new role

  // delete existing role (make admin and user protected!)

  // patch to change role permissions

  // patch to change user roles
}
