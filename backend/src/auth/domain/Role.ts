import { RoleDto } from '@auth/dto/in/role.dto';
import { Entity } from '@common/Entity';
import { EntityProps } from '@common/EntityProps';

import { Permission } from './Permission';

export interface RoleProps extends EntityProps {
  name: string;
  description: string;
  permissions: Permission[];
}

export class Role extends Entity<RoleProps> {
  static fromDto(dto: RoleDto) {
    return new Role({
      id: dto.id,
      name: dto.name,
      description: dto.description,
      permissions: dto.permissions.map((permission) =>
        Permission.fromDto(permission),
      ),
    });
  }

  public toString(): string {
    return `Role "${this.props.name}"`;
  }
}
