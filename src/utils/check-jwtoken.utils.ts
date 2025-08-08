import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { enviroments } from 'src/env/secrets.enviroments';
import { JwtPayload } from 'src/routes/auth/interfaces/jwt-payload.interface';


export async function verifyJwtToken(
  token: string,
  jwtService: JwtService,
): Promise<JwtPayload> {
  try {
    return await jwtService.verifyAsync<JwtPayload>(token, {
      secret: enviroments.JWT_SECRET,
    });
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}