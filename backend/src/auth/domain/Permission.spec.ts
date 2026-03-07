import { PermissionLevel } from '../enums/permission-level.enum';
import { PermissionType } from '../enums/permission-type.enum';
import { Permission, PermissionProps } from './Permission';

describe('Permission', () => {
  it('should create an Entity based on correct props', async () => {
    const props: PermissionProps = {
      id: '1',
      description: 'text',
      permissionType: PermissionType.TODOS,
      permissionLevel: PermissionLevel.FULL,
    };
    const entity = new Permission(props);
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Permission);
    expect(entity.toString()).toEqual(
      `Permission type: ${props.permissionType}, level: ${props.permissionLevel}"`,
    );
  });
});
