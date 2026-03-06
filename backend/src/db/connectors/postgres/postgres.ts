import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { UsersConnector } from 'src/db/interfaces/users.connector';
import { User, UserProps } from 'src/domain/User';

@Injectable()
export class PostgresConnector implements UsersConnector {
  private pool: Pool | null = null;

  private readonly logger = new Logger(PostgresConnector.name);

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

    // Connect to the database
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

  public async getUser(userId: string): Promise<User | null> {
    const connection = this.getConnection();
    const result = await connection.query<UserProps>(
      `SELECT * FROM users WHERE id = '${userId}';`,
    );
    return result?.rows?.[0] ? User.fromProps(result?.rows?.[0]) : null;
  }
}
