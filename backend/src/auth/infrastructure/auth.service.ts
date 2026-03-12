import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '@db/repositories/user.repository';
import { USERS_CONNECTOR } from '@db/symbols';

import { User } from '../modules/users/domain/User';
import { JwtDto } from '../dto/in/jwt.dto';
import { LoginDto } from '../dto/in/login.dto';
import { LoginResponse } from '../dto/out/login.response';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService implements AuthGateway {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @Inject(USERS_CONNECTOR)
    private readonly usersRepository: UserRepository,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await (async (_username) => {
      try {
        return await this.usersRepository.getUserByUsername(_username);
      } catch (error) {
        this.logger.error(`Failed to validate user: ${error}`);
        throw new InternalServerErrorException('Failed to validate user');
      }
    })(username);
    if (user && (await bcrypt.compare(password, user.getProps().password))) {
      user.sanitize();
      return user;
    }
    throw new UnauthorizedException('Invalid login credentials.');
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const { username, password } = dto;
    const user = await this.validateUser(username, password);
    const { id } = user.getProps();
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
