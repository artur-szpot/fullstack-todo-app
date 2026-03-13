import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  USER_REPOSITORY,
  UserRepository,
} from '@db/repositories/user.repository';

import { userMapper } from '@auth/modules/users/mappers/user.mapper';
import { JwtDto } from '../dto/in/jwt.dto';
import { LoginDto } from '../dto/in/login.dto';
import { LoginResponse } from '../dto/out/login.response';
import { User } from '../modules/users/domain/User';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService implements AuthGateway {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const userDto = await (async (_username) => {
      try {
        return await this.usersRepository.getUserByUsername(_username);
      } catch (error) {
        this.logger.error(`Failed to validate user: ${error}`);
        throw new InternalServerErrorException('Failed to validate user');
      }
    })(username);
    if (userDto) {
      const user = userMapper.fromDto.toDomain(userDto);
      const correctPassword = await bcrypt.compare(
        password,
        user.getProps().password,
      );
      if (correctPassword) {
        user.sanitize();
        return user;
      }
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
