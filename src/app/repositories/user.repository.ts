import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserDuplication } from '../defined/types/user.type';
import { UserRegisterDto } from '../modules/user/dto/user_register.dto';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  checkDuplication = async (type: UserDuplication, value: string) => {
    const query = this.createQueryBuilder('user');
    switch (type) {
      case 'USER_NAME':
        query.where({ userName: value });
        break;
    }

    return await query.getCount();
  };

  /**
   * user register
   * @param data UserRegisterDto
   */
  register = async (data: UserRegisterDto) => {
    return await this.createQueryBuilder('user')
      .insert()
      .values([data])
      .execute();
  };
}
