import { SetMetadata } from '@nestjs/common';

import { PermissionLevel } from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';

export const PERMISSIONS_KEY = 'permissions';
export type PermissionDefinition = [PermissionType, PermissionLevel];
export const Permissions = (...permissions: PermissionDefinition[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
