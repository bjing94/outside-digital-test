import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CheckBlacklistGuard from 'src/auth/guard/check-blacklist.guard';
import JwtAuthGuard from 'src/auth/guard/jwt.guard';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import UpdateUserDto from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly blacklistService: BlacklistService,
  ) {}

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Get()
  async get(@Request() req: any) {
    const result = await this.userService.getUserInfo(req.user.id);
    if (!result) {
      throw new NotFoundException();
    }
    return {
      email: result.email,
      nickname: result.nickname,
      tags: result.userTags.map((item) => item.tag),
    };
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Put()
  async update(@Request() req: any, @Body() dto: UpdateUserDto) {
    const uid = req.user.id;
    if (Object.keys(dto).length > 0) {
      const result = await this.userService.update(uid, dto);
      if (!result) {
        throw new NotFoundException();
      }
    }
    const { email, nickname } = await this.userService.get(uid);
    return { email, nickname };
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Delete()
  async delete(@Request() req: any) {
    const uid = req.user.id;
    await this.userService.delete(uid);
    const token = req.headers.authorization;
    if (!token) {
      return { message: 'Пользователь удален' };
    }
    await this.blacklistService.addToBlacklist(token);
    return { message: 'Пользователь удален' };
  }
}
