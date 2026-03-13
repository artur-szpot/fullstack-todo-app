import { Logger } from '@nestjs/common';

import { User } from '../domain/User';
import { UserDto } from '../dto/in/user.dto';
import { UserResponse } from '../dto/out/user.response';

const logger = new Logger('UserMapper');

export const userMapper = {
  fromDto: {
    toDomain: (dto: UserDto): User => {
      return new User(logger, {
        id: dto.id,
        email: dto.email,
        username: dto.username,
        password: dto.password,
        roles: dto.roles,
      });
    },
  },
  fromDomain: {
    toResponse: (user: User): UserResponse => {
      return {};
      // const { id, description, name, protectedRole, permissions } =
      //   user.getProps();
      // return {
      //   id,
      //   description,
      //   name,
      //   protectedRole,
      //   permissions: permissions.map(permissionMapper.fromDomain.toResponse),
      // };
    },
  },
};
