import { Body, Controller, Post } from '@nestjs/common';
import { BooleanResponse } from 'src/app/defined/types/index.type';
import BaseController from '../common/base.controller';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthenticationController extends BaseController {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  @Post('login')
  async login(@Body() input: LoginDto) {
    return this.authenticationService.handleLogin(input);
  }
}
