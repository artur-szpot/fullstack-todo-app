import { PermissionLevel } from '@auth/modules/permissions/enums/permission-level.enum';
import { PermissionType } from '@auth/modules/permissions/enums/permission-type.enum';
import { Role } from '@auth/modules/roles/domain/Role';
import { IncorrectEntityProps } from '@common/incorrect-entity-props.error';

import { UserDto } from '../dto/in/user.dto';
import { User } from './User';

describe('User', () => {
  it('should create a User based on correct props without ID', async () => {
    const props = {
      username: 'text',
      email: 'test@test.com',
      roles: [
        {
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
        },
      ],
    };
    const entity = new User(props);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(User);
    expect(entity.toString()).toEqual(`User "${props.username}"`);
    expect(entity.getProps()).toEqual({
      id: 'mocked-id',
      ...props,
      roles: props.roles.map((role) => new Role(role)),
    });
  });

  it('should create a User based on correct props with ID', async () => {
    const props = {
      id: '1',
      username: 'text',
      email: 'test@test.com',
      roles: [
        {
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
        },
      ],
    };
    const entity = new User(props);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(User);
    expect(entity.toString()).toEqual(`User "${props.username}"`);
    expect(entity.getProps()).toEqual({
      ...props,
      roles: props.roles.map((role) => new Role(role)),
    });
  });

  it('should create a User based on correct DTO', async () => {
    const dto: UserDto = {
      id: '1',
      username: 'text',
      email: 'test@test.com',
      roles: [
        {
          id: '2',
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
        },
      ],
    };
    const entity = User.fromDto(dto);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(User);
    expect(entity.toString()).toEqual(`User "${dto.username}"`);
    expect(entity.getProps()).toEqual({
      ...dto,
      roles: dto.roles.map((role) => new Role(role)),
    });
  });

  it('should fail to create a User based on incorrect props', async () => {
    const props = {
      id: 1,
      username: 'text',
      email: '',
      roles: [
        {
          id: '2',
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
        },
      ],
    };
    try {
      const result = new User(props);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(IncorrectEntityProps);
      expect(error.message).toContain('id: NonEmptyString');
      expect(error.message).toContain('email: NonEmptyString');
    }
  });

  it('should fail to create a User based on incomplete props', async () => {
    const props = {
      username: 'text',
      roles: [
        {
          id: '2',
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
        },
      ],
    };
    try {
      const result = new User(props);
      // Fail test if this doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(IncorrectEntityProps);
      expect(error.message).toContain('email: NonEmptyString');
    }
  });
});
