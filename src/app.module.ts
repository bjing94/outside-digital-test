import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration, {
  ConfigurationInterface,
  DatabaseProperties,
} from './configuration/configuration';
import { UserModule } from './user/user.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { TagModule } from './tag/tag.module';
import { UserTagModule } from './user-tag/user-tag.module';
import Tag from './entities/tag.entity';
import UserTag from './entities/user-tag.entity';
import Users from './entities/user.entity';
import Blacklist from './entities/blacklist.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const db: DatabaseProperties = configService.get('database');
        return {
          type: db.type as 'postgres',
          host: db.host,
          port: db.port,
          database: db.name,
          username: db.user,
          password: db.password,
          entities: ['dist/**/*.entity{ .ts,.js}'],
          migrations: ['migration/*.js'],
          migrationsRun: true,
          migrationsTableName: 'migrations_typeorm',
          synchronize: false,
          cli: {
            migrationsDir: 'migration',
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    BlacklistModule,
    TagModule,
    UserTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
