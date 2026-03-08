import { Injectable, Logger } from '@nestjs/common';

import { User } from '@auth/domain/User';

import { UsersRepository } from '../../repositories/users.repository';
import { PostgresConnector } from './connector';

@Injectable()
export class PostgresUsersRepository implements UsersRepository {
  private readonly logger = new Logger(PostgresUsersRepository.name);

  private static SELECT_USERS_WHERE_SQL = (usersWhere: string) =>
    usersWhere
      ? `(SELECT id, username, password, email FROM users WHERE ${usersWhere}) u`
      : 'users u';

  private static SELECT_USER_SQL = (usersWhere?: string) => `
   SELECT 
      u.id,
      u.username,
      u.password,
      u.email,
      json_agg(
         json_build_object(
            'id', r.id,
            'name', r.name,
            'description', r.description,
            'permissions', role_permissions_helper.permissions
         )
      ) AS roles
   FROM ${PostgresUsersRepository.SELECT_USERS_WHERE_SQL(usersWhere)}
   JOIN users_roles ur 
      ON u.id = ur.user_id
   JOIN roles r 
      ON ur.role_id = r.id
   JOIN (
      SELECT 
         rp.role_id,
         json_agg(
            json_build_object(
               'id', p.id,
               'description', p.description,
               'permissionType', p.type,
               'permissionLevel', rp.permission_level
            )
         ) AS permissions
      FROM roles_permissions rp
      JOIN permissions p 
         ON rp.permission_id = p.id
      GROUP BY rp.role_id
   ) role_permissions_helper 
      ON role_permissions_helper.role_id = r.id
   GROUP BY u.id, u.username, u.password, u.email;
   `;

  constructor(private readonly connector: PostgresConnector) {}

  private async getSingleUser(query: string): Promise<User | null> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(query);
    if (!resultRaw?.rows?.[0]) {
      return null;
    }
    const result = User.fromDto(resultRaw?.rows?.[0]);
    this.logger.debug(`Fetched ${result}`);
    return result;
  }

  public async getUserById(userId: string): Promise<User | null> {
    return this.getSingleUser(
      PostgresUsersRepository.SELECT_USER_SQL(`id = '${userId}'`),
    );
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return this.getSingleUser(
      PostgresUsersRepository.SELECT_USER_SQL(`username = '${username}'`),
    );
  }
}
