import { UserDto } from '@auth/dto/in/user.dto';
import {
  PermissionLevel,
  PermissionPrecedence,
} from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { Entity } from '@common/Entity';
import { EntityProps } from '@common/EntityProps';
import { Role } from './Role';
import { PermissionDefinition } from '@auth/decorators/permissions.decorator';

export interface UserProps extends EntityProps {
  username: string;
  password?: string;
  email: string;
  roles: Role[];
}

export class User extends Entity<UserProps> {
  static fromDto(dto: UserDto) {
    return new User({
      id: dto.id,
      email: dto.email,
      username: dto.username,
      password: dto.password,
      roles: dto.roles.map((role) => Role.fromDto(role)),
    });
  }

  public toString(): string {
    return `User "${this.props.username}"`;
  }

  public sanitize(): void {
    const { password, ...sanitizedProps } = this.props;
    this.props = sanitizedProps;
  }

  public getPermissions(): PermissionDefinition[] {
    const result = new Map<PermissionType, PermissionLevel>();
    this.props.roles.forEach((role) => {
      const { permissions } = role.getProps();
      permissions.forEach((permission) => {
        const { permissionType, permissionLevel } = permission.getProps();
        const currentLevel = PermissionPrecedence.indexOf(
          result.get(permissionType),
        );
        const newLevel = PermissionPrecedence.indexOf(permissionLevel);
        if (newLevel > currentLevel) {
          result.set(permissionType, permissionLevel);
        }
      });
    });
    return [...result.entries()];
  }
}
