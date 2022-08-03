import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import Tag from 'src/entities/tag.entity';
import { UserModule } from 'src/user/user.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Tag]), BlacklistModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
