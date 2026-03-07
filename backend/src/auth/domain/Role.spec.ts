import { RoleDto } from '@auth/dto/in/role.dto';
import { PermissionLevel } from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { IncorrectEntityProps } from '@common/incorrect-entity-props.error';

import { Permission } from './Permission';
import { Role, type RolePropsInputType } from './Role';

describe('Role', () => {
  it('should create a Role based on correct props without ID', async () => {
    const props = {
      description: 'text',
      name: 'test',
      permissions: [
        {
          id: '1',
          description: 'text',
          permissionLevel: PermissionLevel.CREATE,
          permissionType: PermissionType.TODOS,
        },
      ],
    };
    const entity = new Role(props);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Role);
    expect(entity.toString()).toEqual(`Role "${props.name}"`);
    expect(entity.getProps()).toEqual({
      id: 'mocked-id',
      ...props,
      permissions: props.permissions.map(
        (permission) => new Permission(permission),
      ),
    });
  });

  it('should create a Role based on correct props with ID', async () => {
    const props = {
      id: '1',
      description: 'text',
      name: 'test',
      permissions: [
        {
          id: '2',
          description: 'text',
          permissionLevel: PermissionLevel.CREATE,
          permissionType: PermissionType.TODOS,
        },
      ],
    };
    const entity = new Role(props);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Role);
    expect(entity.toString()).toEqual(`Role "${props.name}"`);
    expect(entity.getProps()).toEqual({
      ...props,
      permissions: props.permissions.map(
        (permission) => new Permission(permission),
      ),
    });
  });

  it('should create a Role based on correct DTO', async () => {
    const dto: RoleDto = {
      id: '1',
      description: 'text',
      name: 'test',
      permissions: [
        {
          id: '2',
          description: 'text',
          permissionLevel: PermissionLevel.CREATE,
          permissionType: PermissionType.TODOS,
        },
      ],
    };
    const entity = Role.fromDto(dto);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Role);
    expect(entity.toString()).toEqual(`Role "${dto.name}"`);
    expect(entity.getProps()).toEqual({
      ...dto,
      permissions: dto.permissions.map(
        (permission) => new Permission(permission),
      ),
    });
  });

  it('should fail to create a Role based on incorrect props', async () => {
    const props = {
      id: 1,
      description: 'text',
      name: 'test',
      permissions: [
        {
          id: '2',
          description: 'text',
          permissionLevel: PermissionLevel.CREATE,
          permissionType: PermissionType.TODOS,
        },
      ],
    };
    try {
      const result = new Role(props);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(IncorrectEntityProps);
      expect(error.message).toContain('id: NonEmptyString');
    }
  });

  it('should fail to create a Role based on incomplete props', async () => {
    const props = {
      name: 'test',
      permissions: [
        {
          id: '2',
          description: 'text',
          permissionLevel: PermissionLevel.CREATE,
          permissionType: PermissionType.TODOS,
        },
      ],
    };
    try {
      const result = new Role(props);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(IncorrectEntityProps);
      expect(error.message).toContain('description: NonEmptyString');
    }
  });
});
