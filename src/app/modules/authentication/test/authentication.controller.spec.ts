import { AuthenticationController } from '../authentication.controller';
import { AuthenticationService } from '../authentication.service';

describe('AuthenticationController', () => {
  const expectedSuccess = {
    statusCode: 200,
    data: {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
      accessToken: 'accessToken',
    },
    error: null,
  };

  describe('login', () => {
    it('success', async () => {
      // create mock service
      const authenticationService: AuthenticationService =
        new AuthenticationService(null, null);
      authenticationService.handleLogin = jest
        .fn()
        .mockReturnValue(expectedSuccess.data);

      // Args
      const input = {
        userName: 'userName',
        password: 'password',
      };

      // Execute
      const authenticationController: AuthenticationController =
        new AuthenticationController(authenticationService);
      const actual = await authenticationController.login(input);

      expect(actual).toEqual(expectedSuccess.data);
    });
  });
});
