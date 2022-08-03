import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import UserTag from 'src/entities/user-tag.entity';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';
import { UserTagController } from './user-tag.controller';
import { UserTagService } from './user-tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTag]),
    BlacklistModule,
    TagModule,
    UserModule,
  ],
  controllers: [UserTagController],
  providers: [UserTagService],
  exports: [UserTagService],
})
export class UserTagModule {}
