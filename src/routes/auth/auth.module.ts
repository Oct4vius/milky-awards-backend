import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { enviroments } from 'src/environment/secrets.enviroments';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: enviroments.JWT_SECRET,
    })
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
