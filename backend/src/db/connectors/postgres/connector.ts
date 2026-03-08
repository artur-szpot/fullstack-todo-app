import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresConnector {
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

    this.pool.connect((err: any, client: any, release: () => void) => {
      if (err) {
        this.logger.error('Error connecting to the database', err);
        return;
      }
      this.logger.debug('Connected to the database');
      release();
    });
  }

  public getConnection() {
    if (!this.pool) {
      this.connectPool();
    }
    return this.pool;
  }
}
