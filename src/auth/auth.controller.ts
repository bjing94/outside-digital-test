import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import CheckBlacklistGuard from './guard/check-blacklist.guard';
import JwtAuthGuard from './guard/jwt.guard';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistService: BlacklistService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user.uid, req.user.nickname);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('signin')
  async register(@Body() dto: RegisterDto) {
    let result = await this.authService.register(dto);
    if (!result) {
      throw new BadRequestException();
    }
    let loginResult = await this.authService.login(result.uid, result.nickname);
    return loginResult;
  }

  @UseGuards(CheckBlacklistGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const token = req.headers.authorization;
    if (!token) {
      return {
        message: 'Разлогин прошел успешно',
      };
    }
    await this.blacklistService.addToBlacklist(token);
    return {
      message: 'Разлогин прошел успешно',
    };
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Post('renew')
  async renew(@Request() req: any) {
    const user = req.user;
    const newToken = await this.authService.login(user.id, user.name);
    return newToken;
  }
}
