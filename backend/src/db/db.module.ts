import { Module } from '@nestjs/common';
import { PostgresPermissionRepository } from './connectors/postgres/permission.pg-repository';
import { PostgresRoleRepository } from './connectors/postgres/role.pg-repository';
import { PostgresUserRepository } from './connectors/postgres/user.pg-repository';
import {
  PERMISSIONS_CONNECTOR,
  ROLES_CONNECTOR,
  USERS_CONNECTOR,
} from './symbols';

const userProvider = {
  provide: USERS_CONNECTOR,
  useClass: PostgresUserRepository,
};
const roleProvider = {
  provide: ROLES_CONNECTOR,
  useClass: PostgresRoleRepository,
};
const permissionProvider = {
  provide: PERMISSIONS_CONNECTOR,
  useClass: PostgresPermissionRepository,
};

@Module({
  providers: [userProvider, roleProvider, permissionProvider],
  exports: [userProvider, roleProvider, permissionProvider],
})
export class DbModule {}
