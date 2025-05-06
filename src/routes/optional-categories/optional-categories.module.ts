import { Module } from '@nestjs/common';
import { OptionalCategoriesService } from './optional-categories.service';
import { OptionalCategoriesController } from './optional-categories.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OptionalCategoriesController],
  providers: [OptionalCategoriesService],
  imports: [AuthModule]
})
export class OptionalCategoriesModule {}
