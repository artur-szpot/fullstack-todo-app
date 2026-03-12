import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PermissionType } from '../../enums/permission-type.enum';

export class PermissionResponse {
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
}
