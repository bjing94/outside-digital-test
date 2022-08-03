import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), BlacklistModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
