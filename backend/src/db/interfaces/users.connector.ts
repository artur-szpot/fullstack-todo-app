import { User } from '../../auth/domain/User';

export interface UsersConnector {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
}

const toColumns = (columns: string[]) =>
  columns.map((column) => `'${column}`).join(', ');

export const USERS_COLUMNS = toColumns(['id', 'username', 'password', 'email']);
export const ROLES_COLUMNS = toColumns(['id', 'name', 'description']);
export const PERMISSIONS_COLUMNS = toColumns([
  'id',
  'username',
  'password',
  'email',
]);
