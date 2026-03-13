import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';

import { Permissions } from '@auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { PermisionsGuard } from '@auth/guards/permissions.guard';
import { Paginated } from '@common/Paginated';

import { PermissionResponse } from './dto/out/permission.response';
import { PermissionLevel } from './enums/permission-level.enum';
import { PermissionType } from './enums/permission-type.enum';
import {
  PERMISSION_GATEWAY,
  PermissionGateway,
} from './infrastructure/permission.gateway';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermisionsGuard)
export class PermissionController {
  constructor(
    @Inject(PERMISSION_GATEWAY)
    private readonly gateway: PermissionGateway,
  ) {}

  @Get('/:type')
  @Permissions([PermissionType.PERMISSIONS, PermissionLevel.READ])
  async getPermissionByType(
    @Param('type') permissionType: PermissionType,
  ): Promise<PermissionResponse> {
    return this.gateway.getByType(permissionType);
  }

  @Get('/')
  @Permissions([PermissionType.PERMISSIONS, PermissionLevel.READ])
  async getPermissions(
    @Param('pageSize') pageSize?: number,
    @Param('pageNumber') pageNumber?: number,
  ): Promise<Paginated<PermissionResponse>> {
    return this.gateway.getMany({ pageNumber, pageSize });
  }
}
