import { Permission } from '@auth/domain/Permission';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { Pagination } from '@common/pagination';

export interface PermissionRepository {
  getPermissionByType(permissionType: PermissionType): Promise<Permission>;
  getAllPermissions(pagination?: Pagination): Promise<Permission[]>;
  getAllPermissionsCount(): Promise<number>;
}
