import { Module } from '@nestjs/common';
import { PostgresConnector } from './connectors/postgres/connector';
import { USERS_CONNECTOR } from './symbols';

const userProvider = {
  provide: USERS_CONNECTOR,
  useClass: PostgresConnector,
};

@Module({
  providers: [userProvider],
  exports: [userProvider],
})
export class DbModule {}
