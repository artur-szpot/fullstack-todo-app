import { Inject, Injectable } from '@nestjs/common';

import { Paginated } from '@common/Paginated';
import { Pagination } from '@common/pagination';
import { PermissionRepository } from '@db/repositories/permission.repository';
import { PERMISSIONS_CONNECTOR } from '@db/symbols';

import { PermissionResponse } from '../dto/out/permission.response';
import { PermissionType } from '../enums/permission-type.enum';
import { permissionMapper } from '../mappers/permission.mapper';
import { PermissionGateway } from './permission.gateway';

@Injectable()
export class PermissionService implements PermissionGateway {
  constructor(
    @Inject(PERMISSIONS_CONNECTOR)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async getByType(
    permissionType: PermissionType,
  ): Promise<PermissionResponse> {
    const permission =
      await this.permissionRepository.getPermissionByType(permissionType);
    return permissionMapper.fromDomain.toResponse(permission);
  }

  public async getMany(
    pagination?: Pagination,
  ): Promise<Paginated<PermissionResponse>> {
    const items =
      await this.permissionRepository.getManyPermissions(pagination);
    const total = await this.permissionRepository.getAllPermissionsCount();
    return { page: items.map(permissionMapper.fromDomain.toResponse), total };
  }
}
