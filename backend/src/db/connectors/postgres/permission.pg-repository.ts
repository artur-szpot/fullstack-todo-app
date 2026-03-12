import { Injectable, Logger } from '@nestjs/common';

import { Permission } from '@auth/modules/permissions/domain/Permission';
import { PermissionType } from '@auth/modules/permissions/enums/permission-type.enum';
import { Pagination } from '@common/pagination';

import { PermissionRepository } from '../../repositories/permission.repository';
import { PostgresConnector } from './connector';

@Injectable()
export class PostgresPermissionRepository implements PermissionRepository {
  private readonly logger = new Logger(PostgresPermissionRepository.name);

  constructor(private readonly connector: PostgresConnector) {}

  getPermissionByType(permissionType: PermissionType): Promise<Permission> {
    throw new Error('Method not implemented.');
  }

  getManyPermissions(pagination?: Pagination): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }

  getAllPermissionsCount(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
