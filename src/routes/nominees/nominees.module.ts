import { Module } from '@nestjs/common';
import { NomineesService } from './nominees.service';
import { NomineesController } from './nominees.controller';

@Module({
  controllers: [NomineesController],
  providers: [NomineesService],
})
export class NomineesModule {}
