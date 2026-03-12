import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { PermissionDto } from '@auth/modules/permissions/dto/in/permission.dto';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  permissions: PermissionDto[];
}
