import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { enviroments } from 'src/environment/secrets.enviroments';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    let user = request['user'] as UserEntity;

    if (!user) {
      const token = this.authService.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('There is no bearer token');
      }

      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret: enviroments.JWT_SECRET,
        });

        const foundUser = await this.authService.findUserById(payload.id);
        if (!foundUser) {
          throw new UnauthorizedException('User not found');
        }

        const { password, ...result } = foundUser as UserEntity;
        user = result as UserEntity;
        request['user'] = result;
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }
        throw new UnauthorizedException('Invalid token');
      }
    }

    if (!user.admin) {
      throw new ForbiddenException('Access denied. Admin privileges required.');
    }

    return true;
  }
}

