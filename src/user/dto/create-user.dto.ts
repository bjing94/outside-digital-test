import { IsString, Length, Matches } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  @Length(8)
  @Matches('(?=.*d)(?=.*[a-z])(?=.*[A-Z])', '', {
    message:
      'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.',
  })
  password: string;
}
