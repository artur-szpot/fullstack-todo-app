import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

import { User } from '@auth/domain/User';
import { UsersConnector } from '@db/interfaces/users.connector';

@Injectable()
export class PostgresConnector implements UsersConnector {
  private pool: Pool | null = null;

  private readonly logger = new Logger(PostgresConnector.name);

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
   FROM ${PostgresConnector.SELECT_USERS_WHERE_SQL(usersWhere)}
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

  constructor() {
    this.connectPool();
  }

  private connectPool() {
    this.pool = new Pool({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: Number.parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    });

    this.pool.connect((err: any, client: any, release: () => void) => {
      if (err) {
        this.logger.error('Error connecting to the database', err);
        return;
      }
      this.logger.debug('Connected to the database');
      release();
    });
  }

  private getConnection() {
    if (!this.pool) {
      this.connectPool();
    }
    return this.pool;
  }

  public async getUserById(userId: string): Promise<User | null> {
    const connection = this.getConnection();
    const result = await connection.query(
      PostgresConnector.SELECT_USER_SQL(`id = '${userId}'`),
    );
    return result?.rows?.[0] ? User.fromDto(result?.rows?.[0]) : null;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const connection = this.getConnection();
    const result = await connection.query(
      PostgresConnector.SELECT_USER_SQL(`username = '${username}'`),
    );
    return result?.rows?.[0] ? User.fromDto(result?.rows?.[0]) : null;
  }
}
