import { Role } from '@auth/modules/roles/domain/Role';
import { Pagination } from '@common/pagination';

export interface RoleRepository {
  getRoleById(roleId: string): Promise<Role | null>;
  getRoleByName(roleName: string): Promise<Role | null>;
  getManyRoles(pagination?: Pagination): Promise<Role[]>;
  getAllRolesCount(): Promise<number>;
  // create role
  // update role
  // delete role
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');
