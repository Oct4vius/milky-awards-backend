import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { WhiteListEntry } from './entities/whitelist.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from './entities/user.entity';
import { ErrorResponse } from 'src/interface/error.interface';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {}

  async create(createDto: RegisterUserDto): Promise<User | ErrorResponse> {
    try{
      const whitelist = await WhiteListEntry.findOne({ where: { email: createDto.email } })

      if(!whitelist) throw new BadRequestException({
        message: 'Email not in whitelist',
        statusCode: 403,
      })

      const user = await User.findOne({ where: { email: createDto.email } })

      if(user) throw new BadRequestException({
        message: 'User already exists',
        statusCode: 403,
      })
  
      const newUser = User.create({
        ...createDto,
        name: whitelist.name
      })
  
      return newUser.save()
    } catch (error) {
      console.log({error})
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

      const {password, ...newUser} = user as User

      return {
        newUser,
        token: this.getJwtToken({ id: newUser.uuid }),
      }
      
    } catch (error) {
      console.log(error)
      return error.response
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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
