import { Pagination } from '@common/pagination';

import { Permission } from '../domain/Permission';
import { PermissionType } from '../enums/permission-type.enum';

export interface PermissionGateway {
  getByType(permissionType: PermissionType): Promise<Permission>;
  getMany(pagination?: Pagination): Promise<Permission[]>;
}
