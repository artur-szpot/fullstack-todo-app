import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Paginated } from '@common/Paginated';
import { Pagination } from '@common/pagination';
import {
  PERMISSION_REPOSITORY,
  PermissionRepository,
} from '@db/repositories/permission.repository';

import { PermissionResponse } from '../dto/out/permission.response';
import { PermissionType } from '../enums/permission-type.enum';
import { permissionMapper } from '../mappers/permission.mapper';
import { PermissionGateway } from './permission.gateway';

@Injectable()
export class PermissionService implements PermissionGateway {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async getByType(
    permissionType: PermissionType,
  ): Promise<PermissionResponse> {
    try {
      const permission =
        await this.permissionRepository.getPermissionByType(permissionType);
      if (!permission) {
        throw new NotFoundException(
          `Could not retrieve permission of type ${permissionType}`,
        );
      }
      return permissionMapper.fromDomain.toResponse(permission);
    } catch (error) {
      throw new InternalServerErrorException(
        `Unexpected error occurred while retrieving the permission`,
      );
    }
  }

  public async getMany(
    pagination?: Pagination,
  ): Promise<Paginated<PermissionResponse>> {
    try {
      const items =
        await this.permissionRepository.getManyPermissions(pagination);
      const total = await this.permissionRepository.getAllPermissionsCount();
      return { page: items.map(permissionMapper.fromDomain.toResponse), total };
    } catch (error) {
      throw new InternalServerErrorException(
        `Unexpected error occurred while retrieving permissions`,
      );
    }
  }
}
