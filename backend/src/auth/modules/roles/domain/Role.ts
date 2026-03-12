import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';
import { PathReporter } from 'io-ts/PathReporter';

import {
  Permission,
  PermissionProps,
} from '@auth/modules/permissions/domain/Permission';
import { Entity, EntityProps } from '@common/Entity';
import { IncorrectEntityProps } from '@common/incorrect-entity-props.error';

import { RoleDto } from '../dto/in/role.dto';

export const RoleProps = t.intersection([
  EntityProps,
  t.type(
    {
      name: NonEmptyString,
      description: NonEmptyString,
      permissions: t.array(PermissionProps),
    },
    'requiredRoleProps',
  ),
]);

export type RolePropsInputType = t.TypeOf<typeof RoleProps>;

export type RolePropsType = Omit<RolePropsInputType, 'permissions'> & {
  permissions: Permission[];
};

export class Role extends Entity<RolePropsType> {
  protected validateProps(input: unknown): RolePropsType {
    const decoded = RoleProps.decode(input);
    if (isLeft(decoded)) {
      throw new IncorrectEntityProps(PathReporter.report(decoded).join('\n'));
    }
    const decodedProps: RolePropsInputType = decoded.right;
    return {
      ...decodedProps,
      permissions: decodedProps.permissions.map(
        (permission) => new Permission(permission),
      ),
    };
  }

  static fromDto(dto: RoleDto) {
    return new Role({
      id: dto.id,
      name: dto.name,
      description: dto.description,
      permissions: dto.permissions,
    });
  }

  public toString(): string {
    return `Role "${this.props.name}"`;
  }
}
