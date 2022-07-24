import { BadRequestException } from '@nestjs/common';
import { message } from 'src/app/defined/errors/index.error';
import { UserRepository } from 'src/app/repositories/user.repository';
import { AuthenticationService } from '../authentication.service';
import { LoginDto } from '../dto/login.dto';

describe('AuthenticationService', () => {
  const request = {
    user: {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
    },
  };

  const accessToken = 'accessToken';

  const loginInput: LoginDto = {
    userName: 'userName',
    password: 'password',
  };

  describe('handleLogin', () => {
    it('success', async () => {
      // create mock service
      const jwtService: any = jest.fn().mockImplementation();
      jwtService.sign = jest.fn().mockResolvedValue(accessToken);

      const userRepository: UserRepository = new UserRepository();
      userRepository.findOne = jest.fn().mockReturnValue(request.user);

      // Execute
      const authenticationService: AuthenticationService =
        new AuthenticationService(jwtService, userRepository);
      authenticationService.checkPasswordIsCorrect = jest
        .fn()
        .mockReturnValue(null);
      authenticationService.generateAccessToken = jest
        .fn()
        .mockReturnValue(accessToken);
      const actual = await authenticationService.handleLogin(loginInput);

      expect(actual).toEqual({
        ...request.user,
        accessToken,
      });
    });

    it('error_LOGIN_FAILED', async () => {
      // create mock service
      const userRepository: UserRepository = new UserRepository();
      userRepository.findOne = jest.fn().mockReturnValue(null);

      // Execute
      const userService: AuthenticationService = new AuthenticationService(
        null,
        userRepository,
      );
      try {
        await userService.handleLogin(loginInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toBe(message.LOGIN_FAILED);
      }
    });
  });
});
