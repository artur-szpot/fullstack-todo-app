import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '@db/repositories/user.repository';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './domain/User';
import { LoginDto } from './dto/in/login.dto';

describe('AuthService', () => {
  const mockJwtService: JwtService = jest.requireMock('@nestjs/jwt');
  const mockUsersRepository: UsersRepository = jest.requireMock(
    '@db/repositories/users.repository',
  );
  const service = new AuthService(mockJwtService, mockUsersRepository);

  const loginDto: LoginDto = {
    username: 'test',
    password: 'secret',
  };
  const wrongLoginDto: LoginDto = {
    username: 'test',
    password: 'wrong',
  };
  const getUser = () =>
    User.fromDto({
      id: '1',
      email: 'test@test.com',
      username: 'Test User',
      password: bcrypt.hashSync('secret', 10),
      roles: [
        {
          id: '1',
          description: 'text',
          name: 'test role',
          permissions: [],
        },
      ],
    });

  beforeEach(() => {
    mockJwtService.sign = jest.fn().mockReturnValueOnce('token');
  });

  it('should log in an existing user', async () => {
    mockUsersRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValueOnce(getUser());

    const result = await service.login(loginDto);

    expect(mockUsersRepository.getUserByUsername).toHaveBeenCalledWith(
      loginDto.username,
    );
    expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({ access_token: 'token' });
  });

  it('should return generic error if wrong password given', async () => {
    mockUsersRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValueOnce(getUser());

    try {
      await service.login(wrongLoginDto);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(mockUsersRepository.getUserByUsername).toHaveBeenCalledWith(
        loginDto.username,
      );
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toEqual('Invalid login credentials.');
    }
  });

  it("should return generic error if user doesn't exist", async () => {
    mockUsersRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValueOnce(null);

    try {
      await service.login(loginDto);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(mockUsersRepository.getUserByUsername).toHaveBeenCalledWith(
        loginDto.username,
      );
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toEqual('Invalid login credentials.');
    }
  });

  it('should return generic error if dependent class fails', async () => {
    mockUsersRepository.getUserByUsername = jest
      .fn()
      .mockRejectedValueOnce(new Error("table users doesn't exist"));

    try {
      await service.login(loginDto);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(mockUsersRepository.getUserByUsername).toHaveBeenCalledWith(
        loginDto.username,
      );
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toEqual('Failed to validate user');
    }
  });
});
