import { Module } from '@nestjs/common';
import { NomineesService } from './nominees.service';
import { NomineesController } from './nominees.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NomineesController],
  providers: [NomineesService],
  imports: [AuthModule],
})
export class NomineesModule {}
