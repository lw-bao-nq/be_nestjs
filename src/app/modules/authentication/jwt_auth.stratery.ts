import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/app/defined/types/authentication.type';
import { message } from 'src/app/defined/errors/index.error';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt_auth') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload.id && !payload.firstName && !payload.email) {
      throw new UnauthorizedException(message.TOKEN_INVALID);
    }
    return payload;
  }
}
