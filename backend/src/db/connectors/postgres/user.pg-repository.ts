import { Injectable } from '@nestjs/common';

import { UserDto } from '@auth/modules/users/dto/in/user.dto';
import { Pagination } from '@common/pagination/pagination';

import { DbSearchDto } from '../../dto/search.dto';
import { UserRepository } from '../../repositories/user.repository';
import { PostgresConnector } from './PostgresConnector';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  private SELECT_USERS_WHERE_PARTIAL_SQL = (args?: DbSearchDto): string => {
    return `(
     SELECT 
        id,
        username,
        password,
        email
     FROM users 
     ${this.connector.searchSQL(args)}
    ) u`;
  };

  private SELECT_USERS_SQL = (args?: DbSearchDto): string => `
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
            'protectedRole', r.protected,
            'permissions', role_permissions_helper.permissions
         )
      ) AS roles
   FROM ${this.SELECT_USERS_WHERE_PARTIAL_SQL(args)}
   JOIN users_roles ur 
      ON u.id = ur.user_id
   JOIN roles r 
      ON ur.role_id = r.id
   JOIN (
      SELECT 
         rp.role_id,
         json_agg(
            json_build_object(
               'description', p.description,
               'permissionType', p.type,
               'permissionLevel', rp.permission_level
            )
         ) AS permissions
      FROM roles_permissions rp
      JOIN permissions p 
         ON rp.permission_type = p.type
      GROUP BY rp.role_id
   ) role_permissions_helper 
      ON role_permissions_helper.role_id = r.id
   GROUP BY u.id, u.username, u.password, u.email;
  `;

  private SELECT_USERS_COUNT_SQL: string = `SELECT COUNT(*) AS total FROM users;`;

  constructor(private readonly connector: PostgresConnector) {}

  public async getUserById(userId: string): Promise<UserDto | null> {
    return this.connector.getOne<UserDto>(
      this.SELECT_USERS_SQL({ where: `id = '${userId}'` }),
    );
  }

  public async getUserByUsername(username: string): Promise<UserDto | null> {
    return this.connector.getOne<UserDto>(
      this.SELECT_USERS_SQL({
        where: `username = '${username}'`,
      }),
    );
  }

  public async getManyUsers(pagination?: Pagination): Promise<UserDto[]> {
    return this.connector.getMany<UserDto>(
      this.SELECT_USERS_SQL({
        orderBy: 'username ASC',
        pagination,
      }),
    );
  }

  public async getAllUsersCount(): Promise<number> {
    return this.connector.getCount(this.SELECT_USERS_COUNT_SQL);
  }
}
