import { Module } from '@nestjs/common';
import { ObligatoryCategoriesService } from './obligatory-categories.service';
import { ObligatoryCategoriesController } from './obligatory-categories.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ObligatoryCategoriesController],
  providers: [ObligatoryCategoriesService],
  imports: [AuthModule],
})
export class ObligatoryCategoriesModule {}
