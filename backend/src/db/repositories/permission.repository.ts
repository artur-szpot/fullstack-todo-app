import { Permission } from '@auth/modules/permissions/domain/Permission';
import { PermissionType } from '@auth/modules/permissions/enums/permission-type.enum';
import { Pagination } from '@common/pagination';

export interface PermissionRepository {
  getPermissionByType(
    permissionType: PermissionType,
  ): Promise<Permission | null>;
  getManyPermissions(pagination?: Pagination): Promise<Permission[]>;
  getAllPermissionsCount(): Promise<number>;
}

export const PERMISSION_REPOSITORY = Symbol('PERMISSION_REPOSITORY');
