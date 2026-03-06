import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponse {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
