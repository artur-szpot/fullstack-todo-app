import { PermissionDefinition } from '@auth/decorators/permissions.decorator';

export interface JwtDto {
  id: string;
  username: string;
  permissions: PermissionDefinition[];
}
