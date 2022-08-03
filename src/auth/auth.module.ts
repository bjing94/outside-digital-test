import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { JwtProperties } from 'src/configuration/configuration';
import Blacklist from 'src/entities/blacklist.entity';
import Users from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let options: JwtProperties = configService.get('jwt');
        console.log('jwt options', options);
        return {
          secret: options.secret,
          signOptions: { expiresIn: options.expire },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
    BlacklistModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
