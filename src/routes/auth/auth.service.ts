import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { WhiteListEntryEntity } from './entities/whitelist.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { UserEntity } from './entities/user.entity';
import { ErrorResponse } from 'src/interface/error.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {}

  async create(createDto: RegisterUserDto): Promise<UserEntity | ErrorResponse> {
    try{
      const whitelist = await WhiteListEntryEntity.findOne({ where: { email: createDto.email } })

      if(!whitelist) throw new BadRequestException({
        message: 'Email not in whitelist',
        statusCode: 403,
      })

      const user = await UserEntity.findOne({ where: { email: createDto.email } })

      if(user) throw new BadRequestException({
        message: 'User already exists',
        statusCode: 403,
      })
  
      const newUser = await UserEntity.create({
        ...createDto,
        name: whitelist.name
      }).save()
  
      return newUser
    } catch (error) {
      console.error({error})
      return error.response as ErrorResponse
    }
  }

  async register(registerUser: RegisterUserDto) {
    try {
      const user = await this.create(registerUser)

      if((user as ErrorResponse).message) throw new BadRequestException({
        message: (user as ErrorResponse).message || 'Error creating user',
        statusCode: (user as ErrorResponse).statusCode,
      })

      const {password, ...newUser} = user as UserEntity

      return {
        newUser,
        token: this.getJwtToken({ id: newUser.uuid }),
      }
      
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const user = await UserEntity.findOne({ where: { email: loginUser.email } })

      if(!user) throw new BadRequestException({
        message: 'User not found',
        statusCode: 403,
      })

      const isValidPassword = user.comparePassword(loginUser.password)

      if(!isValidPassword) throw new BadRequestException({
        message: 'Invalid password',
        statusCode: 403,
      })

      const {password, ...restUser} = user

      return {
        user: restUser,
        token: this.getJwtToken({ id: restUser.uuid }),
      }
      
    } catch (error) {
      console.error(error)
      return error.response
    }

  }

  async findUserByUUID(uuid: string): Promise<UserEntity | ErrorResponse> {
    try {

      const user = await UserEntity.findOne({ where: { uuid } })

      if(!user) throw new BadRequestException({
        message: 'User not found',
        statusCode: 403,
      })

      return user
    } catch (error) {
      console.error(error)
      return error.response as ErrorResponse
    }
  }

  checkToken(req: Request ): LoginResponse {
    const user = req['user'];

    return{
      user,
      token: this.getJwtToken({ id: user.id }),
    }
  }

  getJwtToken(payload: JwtPayload) {

    return this.jwtService.sign( payload );
    
  }


}
