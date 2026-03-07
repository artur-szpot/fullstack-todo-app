import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';
import { PathReporter } from 'io-ts/PathReporter';

import { PermissionDefinition } from '@auth/decorators/permissions.decorator';
import { UserDto } from '@auth/dto/in/user.dto';
import {
  PermissionLevel,
  PermissionPrecedence,
} from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { Entity, EntityProps } from '@common/Entity';
import { IncorrectEntityProps } from '@common/incorrect-entity-props.error';

import { Role, RoleProps } from './Role';

export const UserProps = t.intersection([
  EntityProps,
  t.partial(
    {
      password: NonEmptyString,
    },
    'optionalUserProps',
  ),
  t.type(
    {
      username: NonEmptyString,
      email: NonEmptyString,
      roles: t.array(RoleProps),
    },
    'requiredUserProps',
  ),
]);

export type UserPropsInputType = t.TypeOf<typeof UserProps>;

export type UserPropsType = Omit<UserPropsInputType, 'roles'> & {
  roles: Role[];
};

export class User extends Entity<UserPropsType> {
  protected validateProps(input: unknown): UserPropsType {
    const decoded = UserProps.decode(input);
    if (isLeft(decoded)) {
      throw new IncorrectEntityProps(PathReporter.report(decoded).join('\n'));
    }
    const decodedProps: UserPropsInputType = decoded.right;
    return {
      ...decodedProps,
      roles: decodedProps.roles.map((role) => new Role(role)),
    };
  }

  static fromDto(dto: UserDto) {
    return new User({
      id: dto.id,
      email: dto.email,
      username: dto.username,
      password: dto.password,
      roles: dto.roles,
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
