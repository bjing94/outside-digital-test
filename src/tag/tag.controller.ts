import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CheckBlacklistGuard from 'src/auth/guard/check-blacklist.guard';
import JwtAuthGuard from 'src/auth/guard/jwt.guard';
import { UserTagService } from 'src/user-tag/user-tag.service';
import { UserService } from 'src/user/user.service';
import CreateTagDto from './dto/create-tag.dto';
import UpdateTagDto from './dto/update-tag.dto';
import IsTagOwnerGuard from './guard/is-tag-owner.guard';
import { TagService } from './tag.service';

@Controller()
export class TagController {
  constructor(
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Post('tag')
  async create(@Body() dto: CreateTagDto, @Request() req: any) {
    const uid = req.user.id;
    const creator = await this.userService.get(uid);
    if (!creator) {
      throw new BadRequestException();
    }
    const result = await this.tagService.create(
      {
        name: dto.name,
        sortOrder: dto.sortOrder,
      },
      creator,
    );
    return {
      id: result.id,
      name: result.name,
      sortOrder: result.sortOrder,
    };
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Get('tag/:id')
  async get(@Param('id') id: number) {
    const result = await this.tagService.get(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Get('tag')
  async getTags(
    @Query('sortByOrder') sortByOrder: boolean,
    @Query('sortByName') sortByName: boolean,
    @Query('offset') offset: number,
    @Query('length') length: number,
  ) {
    const result = await this.tagService.getTagsBy({
      sortByName: sortByName !== undefined,
      sortByOrder: sortByOrder !== undefined,
      offset: offset,
      length: length,
    });

    return result;
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard, IsTagOwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put('tag/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const tag = await this.tagService.get(id);
    if (!tag) {
      throw new NotFoundException('Тэг не найден');
    }
    if (Object.keys(dto).length > 0) {
      await this.tagService.update(id, dto);
    }
    const updatedTag = await this.tagService.get(id);
    return updatedTag;
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard, IsTagOwnerGuard)
  @Delete('tag/:id')
  async delete(@Param('id') id: number) {
    const tag = await this.tagService.get(id);
    if (!tag) {
      throw new NotFoundException('Тэг не найден');
    }

    await this.tagService.delete(id);
    return {
      message: 'Тэг удален',
    };
  }
}
