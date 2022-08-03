import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import ValidateUserDto from './dto/validate-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async create(dto: CreateUserDto) {
    return this.userRepo.save(dto);
  }

  async getBy(partialEntity: Partial<Users>) {
    return this.userRepo.findOneBy(partialEntity);
  }

  async get(uid: string) {
    return this.userRepo.findOneBy({ uid: uid });
  }

  async getUserInfo(uid: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userTags', 'userTag')
      .leftJoinAndSelect('userTag.tag', 'tag')
      .where('user.uid = :uid', { uid: uid })
      .select([
        'user.email',
        'user.nickname',
        'userTag',
        'tag.id',
        'tag.name',
        'tag.sortOrder',
      ])
      .getOne();
  }

  async getByEmail(email: string) {
    return this.userRepo.findOneBy({ email: email });
  }

  async update(uid: string, dto: UpdateUserDto) {
    await this.checkUnique(dto);
    return this.userRepo.update({ uid: uid }, dto);
  }

  async delete(uid: string) {
    return this.userRepo.delete({ uid: uid });
  }

  async validate(dto: ValidateUserDto) {
    let user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      return null;
    }
    return user;
  }

  async checkUnique({ nickname, email }: UpdateUserDto) {
    if (nickname) {
      const userByNick = await this.getBy({ nickname: nickname });
      if (userByNick) {
        throw new BadRequestException(
          'Пользователь с таким именем уже существует',
        );
      }
    }
    if (email) {
      const userByEmail = await this.getBy({ email: email });
      if (userByEmail) {
        throw new BadRequestException(
          'Пользователь с таким email уже существует',
        );
      }
    }
    return true;
  }
}
