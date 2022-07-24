import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from 'src/app/defined/types/authentication.type';
import BaseController from '../common/base.controller';
import { ChangePasswordDto } from './dto/change_password.dto';
import { UpdateUSerDto } from './dto/update_user.dto';
import { UserRegisterDto } from './dto/user_register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * user register
   * @param input UserRegisterDto
   * @returns
   */
  @Post('register')
  async register(@Body() input: UserRegisterDto) {
    const isSuccess = await this.userService.handleRegister(input);

    return this.response(isSuccess);
  }

  /**
   * change user password
   * @param input ChangePasswordDto
   * @returns
   */
  @UseGuards(AuthGuard('jwt_auth'))
  @Post('change_password')
  async changePassword(
    @Request() req: RequestUser,
    @Body() input: ChangePasswordDto,
  ) {
    const isSuccess = await this.userService.handleChangePassword(
      input,
      req.user,
    );

    return this.response(isSuccess);
  }

  /**
   * update user profile
   * @param req RequestUser
   * @param input UpdateUSerDto
   * @returns
   */
  @UseGuards(AuthGuard('jwt_auth'))
  @Put()
  async updateUserProfile(
    @Request() req: RequestUser,
    @Body() input: UpdateUSerDto,
  ) {
    const isSuccess = await this.userService.handleUpdateUser(input, req.user);

    return this.response(isSuccess);
  }
}
