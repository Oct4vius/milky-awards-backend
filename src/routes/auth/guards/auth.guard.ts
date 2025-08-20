import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { enviroments } from 'src/env/secrets.enviroments';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authservice: AuthService,

  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authservice.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }

    try {

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: enviroments.JWT_SECRET,
      });

      const user = await this.authservice.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('User not found');

      request['user'] = user;
    } catch (error) {
      console.error({ error });
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

}
