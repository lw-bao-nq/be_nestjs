import { BadRequestException } from '@nestjs/common';
import { message } from 'src/app/defined/errors/index.error';
import { UserRepository } from 'src/app/repositories/user.repository';
import { InsertResult } from 'typeorm';
import { ChangePasswordDto } from '../dto/change_password.dto';
import { UpdateUSerDto } from '../dto/update_user.dto';
import { UserRegisterDto } from '../dto/user_register.dto';
import { UserService } from '../user.service';

describe('UserService', () => {
  const expectedSuccess = {
    isSuccess: true,
  };
  const request = {
    user: {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
    },
  };

  const registerInput: UserRegisterDto = {
    firstName: 'firstName',
    lastName: 'lastName',
    userName: 'userName',
    email: 'email',
    password: 'password',
  };

  const changePasswordInput: ChangePasswordDto = {
    password: 'password',
    newPassword: 'newPassword',
  };

  const updateUSerDto: UpdateUSerDto = {
    ...registerInput,
  };

  describe('handleRegister', () => {
    it('success', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.checkDuplication = jest
        .fn()
        .mockReturnValue(Promise.resolve(0));
      userRepository.register = jest.fn().mockReturnValue(new InsertResult());

      // Execute
      const userService: UserService = new UserService(userRepository);
      const actual = await userService.handleRegister(registerInput);

      expect(actual).toEqual(expectedSuccess);
    });

    it('error_DUPLICATION_USER_NAME', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.checkDuplication = jest
        .fn()
        .mockReturnValue(Promise.resolve(1));

      // Execute
      const userService: UserService = new UserService(userRepository);
      try {
        await userService.handleRegister(registerInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toBe(message.DUPLICATION_USER_NAME);
      }
    });
  });

  describe('handleChangePassword', () => {
    it('success', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.findOne = jest
        .fn()
        .mockReturnValue({ ...request.user, save: () => null });

      // Execute
      const userService: UserService = new UserService(userRepository);
      userService.checkPasswordIsCorrect = jest.fn().mockReturnValue(null);
      const actual = await userService.handleChangePassword(
        changePasswordInput,
        request.user,
      );

      expect(actual).toEqual(expectedSuccess);
    });

    it('error', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.findOne = jest.fn().mockReturnValue(null);

      // Execute
      const userService: UserService = new UserService(userRepository);
      try {
        await userService.handleChangePassword(
          changePasswordInput,
          request.user,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toBe(message.LOGIN_FAILED);
      }
    });
  });

  describe('handleUpdateUser', () => {
    it('success', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.update = jest.fn().mockReturnValue(null);

      // Execute
      const userService: UserService = new UserService(userRepository);
      const actual = await userService.handleUpdateUser(
        updateUSerDto,
        request.user,
      );

      expect(actual).toEqual(expectedSuccess);
    });
  });
});
