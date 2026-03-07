import { User } from '../../auth/domain/User';

export interface UsersConnector {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
}
