import { BadRequestException } from '@nestjs/common';
import { UserEntity } from 'src/app/database/entities/user.entity';
import { message } from 'src/app/defined/errors/index.error';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/app/defined/constant/authentication.constant';

export class BaseService {
  /**
   * check password is correct
   * @param user UserEntity
   * @param password string
   * @returns
   */
  checkPasswordIsCorrect = async (user: UserEntity, password: string) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(message.LOGIN_FAILED);
    }
  };

  /**
   * generate hash password
   * @param password string
   */
  generatePassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  };
}
