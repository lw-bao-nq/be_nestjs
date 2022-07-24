import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/app/repositories/user.repository';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAuthStrategy } from './jwt_auth.stratery';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthenticationController],
  providers: [JwtAuthStrategy, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
