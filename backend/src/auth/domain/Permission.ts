import { PermissionDto } from '@auth/dto/in/permission.dto';
import { PermissionLevel } from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { Entity } from '@common/Entity';
import { EntityProps } from '@common/EntityProps';

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
