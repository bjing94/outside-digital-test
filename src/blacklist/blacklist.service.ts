import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Blacklist from 'src/entities/blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepo: Repository<Blacklist>,
  ) {}

  async addToBlacklist(token: string) {
    return this.blacklistRepo.save({ token: token });
  }

  async checkBlackList(token: string) {
    const result = await this.blacklistRepo.findOneBy({ token: token });
    if (!result) {
      return false;
    }
    return true;
  }
}
