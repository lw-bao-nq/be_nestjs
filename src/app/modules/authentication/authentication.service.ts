import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import {
  JwtPayload,
  LoginResponse,
} from 'src/app/defined/types/authentication.type';
import { UserRepository } from 'src/app/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { JWT_LOGIN_EXPIRES_TIME } from 'src/app/defined/constant/authentication.constant';
import { BaseService } from '../common/base.service';

@Injectable()
export class AuthenticationService extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  /**
   * handle login
   * @param input LoginDto
   * @returns LoginResponse
   */
  handleLogin = async (input: LoginDto): Promise<LoginResponse> => {
    try {
      const user = await this.userRepository.findOne({
        where: { userName: input.userName },
      });

      // check password is correct
      await this.checkPasswordIsCorrect(user, input.password);

      const userInfo: JwtPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      };

      return {
        ...userInfo,
        accessToken: this.generateAccessToken(userInfo),
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * refresh access token
   */
  refreshToken = () => {};

  /**
   * generate access token
   */
  generateAccessToken = (jwtPayload: JwtPayload) => {
    return this.jwtService.sign(jwtPayload, {
      expiresIn: JWT_LOGIN_EXPIRES_TIME,
    });
  };
}
