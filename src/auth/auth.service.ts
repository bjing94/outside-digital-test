import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtProperties } from 'src/configuration/configuration';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async register(dto: RegisterDto) {
    const { nickname, password, email } = dto;

    await this.userService.checkUnique(dto);

    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userService.create({
      email: email,
      nickname: nickname,
      password: hashedPassword,
    });
  }

  async validate(dto: LoginDto) {
    let user = await this.userService.getByEmail(dto.email);
    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      return null;
    }
    return user;
  }

  async login(userId: string, nickname: string) {
    const payload = {
      sub: userId,
    };
    const expire = (this.configService.get('jwt') as JwtProperties).expire;
    let convertedExpire = '';
    for (let character of expire) {
      if (!Number.isNaN(+character)) {
        convertedExpire += character;
      }
    }
    return {
      token: this.jwtService.sign(payload),
      expire: +convertedExpire * 60,
    };
  }
}
