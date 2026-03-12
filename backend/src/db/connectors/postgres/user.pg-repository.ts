import { Injectable, Logger } from '@nestjs/common';

import { User } from '@auth/modules/users/domain/User';
import { UserDto } from '@auth/modules/users/dto/in/user.dto';
import { Pagination } from '@common/pagination';

import { DbSearchDto } from '../../dto/search.dto';
import { UserRepository } from '../../repositories/user.repository';
import { PostgresConnector } from './connector';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  private readonly logger = new Logger(PostgresUserRepository.name);

  private static SELECT_USERS_WHERE_PARTIAL_SQL = (
    args?: DbSearchDto,
  ): string => {
    const { where, orderBy, pagination } = args ?? {};
    if (!where && !orderBy && !pagination) {
      return 'users u';
    }
    const { pageNumber, pageSize } = pagination ?? {};
    return `(
     SELECT 
        id,
        username,
        password,
        email
     FROM users 
     ${where ? `WHERE ${where}` : ''}
     ${orderBy ? `ORDER BY ${orderBy}` : ''}
     ${pagination ? `LIMIT ${pageSize} OFFSET ${pageNumber * pageSize}` : ''}
    ) u`;
  };

  private static SELECT_USERS_SQL = (args?: DbSearchDto): string => `
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
   FROM ${PostgresUserRepository.SELECT_USERS_WHERE_PARTIAL_SQL(args)}
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

  private static SELECT_USERS_COUNT_SQL = (): string =>
    `SELECT COUNT(*) AS total FROM users;`;

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
      PostgresUserRepository.SELECT_USERS_SQL({ where: `id = '${userId}'` }),
    );
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return this.getSingleUser(
      PostgresUserRepository.SELECT_USERS_SQL({
        where: `username = '${username}'`,
      }),
    );
  }

  public async getManyUsers(pagination?: Pagination): Promise<User[]> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(
      PostgresUserRepository.SELECT_USERS_SQL({
        orderBy: 'username ASC',
        pagination,
      }),
    );
    if (!resultRaw?.rows?.length) {
      return [];
    }
    const result = resultRaw.rows.map((row: UserDto) => User.fromDto(row));
    this.logger.debug(`Fetched ${result.length} results`);
    return result;
  }

  public async getAllUsersCount(): Promise<number> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(
      PostgresUserRepository.SELECT_USERS_COUNT_SQL,
    );
    if (!resultRaw?.rows?.[0]) {
      return 0;
    }
    return resultRaw.rows[0].total;
  }
}
