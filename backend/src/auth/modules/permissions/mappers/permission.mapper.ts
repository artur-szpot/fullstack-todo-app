import { Permission } from '../domain/Permission';
import { PermissionDto } from '../dto/in/permission.dto';
import { PermissionResponse } from '../dto/out/permission.response';

export const permissionMapper = {
  fromDto: {
    toDomain: (dto: PermissionDto): Permission => {
      return new Permission({
        id: dto.id,
        description: dto.description,
        permissionType: dto.permissionType,
        permissionLevel: dto.permissionLevel,
      });
    },
  },
  fromDomain: {
    toResponse: (permission: Permission): PermissionResponse => {
      const { id, description, permissionType } = permission.getProps();
      return {
        id,
        description,
        permissionType,
      };
    },
  },
};
