import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { RoleDto } from '@auth/modules/roles/dto/in/role.dto';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  roles: RoleDto[];
}
