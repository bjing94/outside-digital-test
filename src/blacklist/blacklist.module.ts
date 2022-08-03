import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Blacklist from 'src/entities/blacklist.entity';
import { BlacklistService } from './blacklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
