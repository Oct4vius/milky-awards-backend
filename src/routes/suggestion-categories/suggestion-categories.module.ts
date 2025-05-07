import { Module } from '@nestjs/common';
import { SuggestionCategoriesService } from './suggestion-categories.service';
import { SuggestionCategoriesController } from './suggestion-categories.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SuggestionCategoriesController],
  providers: [SuggestionCategoriesService],
  imports: [AuthModule],
})
export class SuggestionCategoriesModule {}
