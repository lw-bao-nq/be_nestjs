import { BadRequestException, Injectable } from '@nestjs/common';
import { message } from 'src/app/defined/errors/index.error';
import { BooleanResponse } from 'src/app/defined/types/index.type';
import { UserRepository } from 'src/app/repositories/user.repository';
import { UserRegisterDto } from './dto/user_register.dto';
import { ChangePasswordDto } from './dto/change_password.dto';
import { BaseService } from '../common/base.service';
import { UpdateUSerDto } from './dto/update_user.dto';
import { JwtPayload } from 'src/app/defined/types/authentication.type';

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }
  /**
   * handle user register
   * @param userRegister UserRegisterDto
   * @returns Boolean
   */
  handleRegister = async (
    userRegister: UserRegisterDto,
  ): Promise<BooleanResponse> => {
    let isSuccess = false;
    try {
      // check duplicate userName
      if (
        await this.userRepository.checkDuplication(
          'USER_NAME',
          userRegister.userName,
        )
      ) {
        throw new BadRequestException(message.DUPLICATION_USER_NAME);
      }

      // insert user
      await this.userRepository.register({
        ...userRegister,
        password: await this.generatePassword(userRegister.password),
      });

      isSuccess = true;
    } catch (error) {
      throw error;
    }

    return { isSuccess };
  };

  /**
   * handle change user password
   * @param input ChangePasswordDto
   */
  handleChangePassword = async (
    input: ChangePasswordDto,
    userLogin: JwtPayload,
  ): Promise<BooleanResponse> => {
    let isSuccess = false;
    try {
      // check existing user
      const user = await this.userRepository.findOne(userLogin.id);

      // check password is correct
      await this.checkPasswordIsCorrect(user, input.password);

      // update password
      user.password = await this.generatePassword(input.newPassword);
      await user.save();

      isSuccess = true;
    } catch (error) {
      throw error;
    }
    return { isSuccess };
  };

  /**
   * handle update user profile
   * @param input UpdateUSerDto
   * @param user JwtPayload
   * @returns
   */
  handleUpdateUser = async (input: UpdateUSerDto, user: JwtPayload) => {
    let isSuccess = false;

    try {
      // update user
      await this.userRepository.update(user.id, {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone ?? (() => 'phone'),
      });

      isSuccess = true;
    } catch (error) {
      throw error;
    }
    return { isSuccess };
  };
}
