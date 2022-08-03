import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Tag from 'src/entities/tag.entity';
import UserTag from 'src/entities/user-tag.entity';
import Users from 'src/entities/user.entity';
import { TagService } from 'src/tag/tag.service';
import { Repository } from 'typeorm';
import CreateUserTagDto from './dto/create-user-tag.dto';

@Injectable()
export class UserTagService {
  constructor(
    @InjectRepository(UserTag)
    private readonly userTagRepo: Repository<UserTag>,
    private readonly tagService: TagService,
  ) {}

  async create(dto: CreateUserTagDto) {
    return this.userTagRepo.save(dto);
  }

  async deleteTagFromUser(userId: string, tagId: number) {
    return this.userTagRepo.delete({
      user: { uid: userId },
      tag: { id: tagId },
    });
  }

  async findBy(user: Users, tag: Tag) {
    return this.userTagRepo.findOneBy({ user: user, tag: tag });
  }
}
