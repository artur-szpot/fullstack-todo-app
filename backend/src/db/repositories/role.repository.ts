import { Role } from '@auth/domain/Role';
import { Pagination } from '@common/pagination';

export interface RoleRepository {
  getRoleById(roleId: string): Promise<Role | null>;
  getRoleByName(roleName: string): Promise<Role | null>;
  getAllRoles(pagination?: Pagination): Promise<Role[]>;
  getAllRolesCount(): Promise<number>;
  // create role
  // update role
  // delete role
}
