import { User } from '@auth/domain/User';
import { Pagination } from '@common/pagination';

export interface UsersRepository {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getAllUsers(pagination?: Pagination): Promise<User[]>;
  getAllUsersCount(): Promise<number>;
  // create user
  // update user
  // delete user
}
