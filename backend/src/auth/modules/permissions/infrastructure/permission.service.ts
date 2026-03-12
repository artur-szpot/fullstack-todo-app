import { Inject, Injectable } from '@nestjs/common';

import { Pagination } from '@common/pagination';
import { PermissionRepository } from '@db/repositories/permission.repository';
import { PERMISSIONS_CONNECTOR } from '@db/symbols';

import { Permission } from '../domain/Permission';
import { PermissionType } from '../enums/permission-type.enum';
import { PermissionGateway } from './permission.gateway';

@Injectable()
export class PermissionService implements PermissionGateway {
  constructor(
    @Inject(PERMISSIONS_CONNECTOR)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async getByType(permissionType: PermissionType): Promise<Permission> {
    return this.permissionRepository.getPermissionByType(permissionType);
  }

  public async getMany(pagination?: Pagination): Promise<Permission[]> {
    return this.permissionRepository.getManyPermissions(pagination);
  }
}
