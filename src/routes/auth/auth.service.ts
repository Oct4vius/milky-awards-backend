import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { WhiteListEntryEntity } from './entities/whitelist.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { UserEntity } from './entities/user.entity';
import { ErrorResponse } from 'src/interface/error.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UuidParamValidator } from '../optional-categories/dto/increment-votes.dto';
import { CreateWhiteListUserDto } from './dto/create-whilelist-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async create(
    createDto: RegisterUserDto,
  ): Promise<UserEntity | ErrorResponse> {
    try {
      const whitelist = await WhiteListEntryEntity.findOne({
        where: { email: createDto.email },
      });

      if (!whitelist)
        throw new HttpException({
          message: 'Email not in whitelist',
        }, HttpStatus.FORBIDDEN);

      const user = await UserEntity.findOne({
        where: { email: createDto.email },
      });

      if (user)
        throw new HttpException({
          message: 'User already exists',
        }, HttpStatus.BAD_REQUEST);

      const newUser = await UserEntity.create({
        ...createDto,
        name: whitelist.name,
      }).save();

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(registerUser: RegisterUserDto) {
    try {
      const user = await this.create(registerUser);

      if ((user as ErrorResponse).message)
        throw new HttpException({
          message: (user as ErrorResponse).message || 'Error creating user',
          statusCode: (user as ErrorResponse).statusCode,
        }, HttpStatus.BAD_REQUEST);

      const { password, id, ...newUser } = user as UserEntity;

      return {
        newUser,
        token: this.getJwtToken({ id: newUser.uuid }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const user = await UserEntity.findOne({
        where: { email: loginUser.email },
      });

      if (!user)
        throw new HttpException(
          {
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );

      const isValidPassword = user.comparePassword(loginUser.password);

      if (!isValidPassword)
        throw new HttpException(
          {
            message: 'Invalid password',
          },
          HttpStatus.UNAUTHORIZED,
        );

      const { password, id, ...restUser } = user;

      return {
        user: restUser,
        token: this.getJwtToken({ id: restUser.uuid }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByUUID(uuid: string): Promise<UserEntity | ErrorResponse> {
    try {
      const user = await UserEntity.findOne({ where: { uuid } });

      if (!user)
        throw new HttpException(
          {
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  checkToken(req: Request): LoginResponse {
    const user = req['user'];

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async getWhiteList() {
    try {
      const whitelist = await WhiteListEntryEntity.find();

      if (!whitelist)
        throw new HttpException(
          {
            message: 'WhiteList Is Empty',
          },
          HttpStatus.NOT_FOUND,
        );

      return whitelist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWhiteListByUuid(params: UuidParamValidator) {
    try {
      const { uuid } = params;
      const whitelistUser = await WhiteListEntryEntity.findOne({
        where: { uuid },
      });

      if (!whitelistUser)
        throw new HttpException(
          {
            message: 'Params Error',
          },
          HttpStatus.BAD_REQUEST,
        );

      return whitelistUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createWhiteListUser(createWhiteListUserDto: CreateWhiteListUserDto) {
    try {
      const { email, name } = createWhiteListUserDto as WhiteListEntryEntity;
      const whitelistUser = await WhiteListEntryEntity.create({
        email: email,
        name: name,
      });

      if (!whitelistUser)
        throw new HttpException(
          {
            message: 'User Empty',
          },
          HttpStatus.BAD_REQUEST,
        );

      return await whitelistUser.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteWhiteListUser(params: UuidParamValidator) {
    try {
      const { uuid } = params;

      await WhiteListEntryEntity.delete({ uuid });

      if (!uuid)
        throw new HttpException(
          {
            message: 'Params Error',
          },
          HttpStatus.BAD_REQUEST,
        );

      return 'User Deleted';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
