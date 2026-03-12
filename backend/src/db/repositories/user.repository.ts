import { User } from '@auth/modules/users/domain/User';
import { Pagination } from '@common/pagination';

export interface UserRepository {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getManyUsers(pagination?: Pagination): Promise<User[]>;
  getAllUsersCount(): Promise<number>;
  // create user
  // update user
  // delete user
}
