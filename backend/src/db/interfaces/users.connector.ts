import { User } from '../../domain/User';

export interface UsersConnector {
  getUser(userId: string): Promise<User | null>;
}
