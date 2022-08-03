import { IsEmail, IsString } from 'class-validator';

export default class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
