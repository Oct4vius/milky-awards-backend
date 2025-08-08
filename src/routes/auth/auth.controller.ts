import { Controller, Post, Body, Get, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UuidParamValidator } from '../optional-categories/dto/increment-votes.dto';
import { CreateWhiteListUserDto } from './dto/create-whilelist-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('/check-token')
  async checkToken(@Req() req: Request) {
    return this.authService.checkToken(req);
  }

  @Get('/whitelist')
  async getWhiteList() {
    return await this.authService.getWhiteList();
  }

  @Get('/whitelist/:uuid')
  async getWhiteListByUuid(@Param() params: UuidParamValidator) {
    return await this.authService.getWhiteListByUuid(params);
  }

  @Post('/whitelist')
  async createWhiteListUser(@Body() createWhiteListUserDto: CreateWhiteListUserDto) {
    return await this.authService.createWhiteListUser(createWhiteListUserDto)
  }

  @Delete('/whitelist/:uuid')
  async deleteWhiteListUser(@Param() params: UuidParamValidator){{
    return await this.authService.deleteWhiteListUser(params)
  }}

}
