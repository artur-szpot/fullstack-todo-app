import { Entity } from '@common/Entity';
import { EntityProps } from '@common/EntityProps';

import { PermissionDto } from '../dto/in/permission.dto';
import { PermissionLevel } from '../enums/permission-level.enum';
import { PermissionType } from '../enums/permission-type.enum';

export interface PermissionProps extends EntityProps {
  description: string;
  permissionType: PermissionType;
  permissionLevel: PermissionLevel;
}

export class Permission extends Entity<PermissionProps> {
  static fromDto(dto: PermissionDto) {
    return new Permission({
      id: dto.id,
      description: dto.description,
      permissionType: dto.permissionType,
      permissionLevel: dto.permissionLevel,
    });
  }

  public toString(): string {
    return `Permission type: ${this.props.permissionType}, level: ${this.props.permissionLevel}"`;
  }
}
