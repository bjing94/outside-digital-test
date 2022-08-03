import { IsOptional, IsString, Length, Matches } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  @Length(8)
  @Matches('(?=.*d)(?=.*[a-z])(?=.*[A-Z])', '', {
    message:
      'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.',
  })
  password?: string;
}
