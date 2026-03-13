import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetRoleByIdDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  id: string;
}
