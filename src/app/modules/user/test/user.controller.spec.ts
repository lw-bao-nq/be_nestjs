import { JwtPayload } from 'src/app/defined/types/authentication.type';
import { ChangePasswordDto } from '../dto/change_password.dto';
import { UpdateUSerDto } from '../dto/update_user.dto';
import { UserRegisterDto } from '../dto/user_register.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  const expectedSuccess = {
    statusCode: 200,
    data: {
      isSuccess: true,
    },
    error: null,
  };
  const request: any = {
    user: {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
    },
  };

  describe('user register', () => {
    it('register success', async () => {
      // create mock service
      const userService: UserService = new UserService(null);
      userService.handleRegister = jest
        .fn()
        .mockReturnValue(expectedSuccess.data);

      // Args
      const input: UserRegisterDto = {
        firstName: 'firstName',
        lastName: 'lastName',
        userName: 'userName',
        email: 'email',
        password: 'password',
      };

      // Execute
      const userController: UserController = new UserController(userService);
      const actual = await userController.register(input);

      expect(actual).toEqual(expectedSuccess);
    });
  });

  describe('user change_password', () => {
    it('change_password success', async () => {
      // create mock service
      const userService: UserService = new UserService(null);
      userService.handleChangePassword = jest
        .fn()
        .mockReturnValue(expectedSuccess.data);

      // Args
      const input: ChangePasswordDto = {
        password: 'password',
        newPassword: 'newPassword',
      };

      // Execute
      const userController: UserController = new UserController(userService);
      const actual = await userController.changePassword(request, input);

      expect(actual).toEqual(expectedSuccess);
    });
  });

  describe('user updateUserProfile', () => {
    it('updateUserProfile success', async () => {
      // create mock service
      const userService: UserService = new UserService(null);
      userService.handleUpdateUser = jest
        .fn()
        .mockReturnValue(expectedSuccess.data);

      // Args
      const input: UpdateUSerDto = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phone: 'phone',
      };

      // Execute
      const userController: UserController = new UserController(userService);
      const actual = await userController.updateUserProfile(request, input);

      expect(actual).toEqual(expectedSuccess);
    });
  });
});
