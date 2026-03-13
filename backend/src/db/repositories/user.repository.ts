import { UserDto } from '@auth/modules/users/dto/in/user.dto';
import { Pagination } from '@common/pagination/pagination';

export interface UserRepository {
  getUserById(userId: string): Promise<UserDto | null>;
  getUserByUsername(username: string): Promise<UserDto | null>;
  getManyUsers(pagination?: Pagination): Promise<UserDto[]>;
  getAllUsersCount(): Promise<number>;
  // create user
  // update user
  // delete user
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
