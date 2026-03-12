import { Injectable, Logger } from '@nestjs/common';

import { Role } from '@auth/modules/roles/domain/Role';
import { Pagination } from '@common/pagination';

import { RoleRepository } from '../../repositories/role.repository';
import { PostgresConnector } from './connector';

@Injectable()
export class PostgresRoleRepository implements RoleRepository {
  private readonly logger = new Logger(PostgresRoleRepository.name);

  constructor(private readonly connector: PostgresConnector) {}

  getRoleById(roleId: string): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }

  getRoleByName(roleName: string): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }

  getManyRoles(pagination?: Pagination): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }

  getAllRolesCount(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
