import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersConnector } from '@db/interfaces/users.connector';
import { USERS_CONNECTOR } from '@db/symbols';

import { User } from './domain/User';
import { JwtDto } from './dto/in/jwt.dto';
import { LoginResponse } from './dto/out/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USERS_CONNECTOR)
    private readonly usersConnector: UsersConnector,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersConnector.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.getProps().password))) {
      user.sanitize();
      return user;
    }
    throw new UnauthorizedException('Invalid login credentials.');
  }

  async login(user: User): Promise<LoginResponse> {
    const { id, username } = user.getProps();
    const payload: JwtDto = {
      id,
      username,
      permissions: user.getPermissions(),
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.AUTH_SECRET,
      }),
    };
  }
}
