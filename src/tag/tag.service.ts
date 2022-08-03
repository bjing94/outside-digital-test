import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Tag from 'src/entities/tag.entity';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import CreateTagDto from './dto/create-tag.dto';
import SearchTagsDto from './dto/search-tag.dto';
import UpdateTagDto from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
  ) {}

  async create(dto: CreateTagDto, creator: Users) {
    await this.checkUnique(dto);
    return this.tagRepo.save({
      ...dto,
      creator: creator,
    });
  }

  async get(id: number) {
    return this.tagRepo
      .createQueryBuilder('tag')
      .innerJoinAndSelect('tag.creator', 'users')
      .where('tag.id = :id', { id: id })
      .select(['users.nickname', 'users.uid', 'tag.name', 'tag.sortOrder'])
      .getOne();
  }

  async getEntry(id: number) {
    return this.tagRepo.findOneBy({ id: id });
  }

  async getTagsForUser(userId: string) {
    return this.tagRepo.findBy({ creator: { uid: userId } });
  }

  async update(id: number, dto: UpdateTagDto) {
    return this.tagRepo.update({ id: id }, dto);
  }

  async delete(id: number) {
    return this.tagRepo.delete({ id: id });
  }

  async checkUnique({ name }: UpdateTagDto) {
    if (name) {
      const result = await this.tagRepo.findOneBy({ name: name });
      if (result) {
        throw new BadRequestException('Тэг с таким именем уже существует');
      }
    }
    return true;
  }

  async getTagsBy(dto: SearchTagsDto) {
    const {
      sortByOrder = false,
      sortByName = false,
      offset = 0,
      length = 10,
    } = dto;
    const orderObj = {};
    if (sortByOrder) orderObj['tag.sortOrder'] = 'ASC';
    if (sortByName) orderObj['tag.name'] = 'ASC';

    const allEntities = await this.tagRepo
      .createQueryBuilder('tag')
      .innerJoinAndSelect('tag.creator', 'users')
      .select(['users.nickname', 'users.uid', 'tag.name', 'tag.sortOrder'])
      .orderBy(orderObj);
    const data = await allEntities
      .offset(+offset)
      .limit(+length)
      .getMany();
    const quantity = await allEntities.getCount();
    const meta = {
      offset: +offset,
      length: +length,
      quantity: quantity,
    };
    return { data: data, meta: meta };
  }

  async getTagsCreatedByUser(uid: string) {
    return this.tagRepo.findBy({ creator: { uid: uid } });
  }
}
