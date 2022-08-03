import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CheckBlacklistGuard from 'src/auth/guard/check-blacklist.guard';
import JwtAuthGuard from 'src/auth/guard/jwt.guard';
import Tag from 'src/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import AddTagsDto from './dto/add-tags.dto';
import { UserTagService } from './user-tag.service';

@Controller('user/tag')
export class UserTagController {
  constructor(
    private readonly userTagService: UserTagService,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Post()
  async addTags(@Request() req: any, @Body() dto: AddTagsDto) {
    if (Object.keys(dto).length > 0) {
      const uid = req.user.id;
      const user = await this.userService.get(uid);

      let tags: Tag[] = [];

      for (let tagId of dto.tags) {
        const tag = await this.tagService.getEntry(tagId);
        if (!tag) {
          throw new NotFoundException('Такого тэга нет');
        }
        tags.push(tag);
      }
      for (let tag of tags) {
        const userTag = await this.userTagService.findBy(user, tag);
        if (!userTag) {
          await this.userTagService.create({ tag: tag, user: user });
        }
      }
    }

    return {
      message: 'Тэги добавлены',
    };
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Delete(':id')
  async deleteTagFromUser(@Request() req: any, @Param('id') id: number) {
    const uid = req.user.id;
    const result = await this.userTagService.deleteTagFromUser(uid, id);
    return result;
  }

  @UseGuards(CheckBlacklistGuard, JwtAuthGuard)
  @Get('my')
  async getCreatedTags(@Request() req: any) {
    const uid = req.user.id;
    const result = await this.tagService.getTagsCreatedByUser(uid);

    return {
      tags: result,
    };
  }
}
