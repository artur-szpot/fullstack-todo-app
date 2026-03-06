import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PermissionLevel } from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';

export class PermissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PermissionType)
  @IsNotEmpty()
  permissionType: PermissionType;

  @IsEnum(PermissionLevel)
  @IsNotEmpty()
  permissionLevel: PermissionLevel;
}
