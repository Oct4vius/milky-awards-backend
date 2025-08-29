import { Module } from '@nestjs/common';
import { SuggestionCategoriesService } from './suggestion-categories.service';
import { SuggestionCategoriesController } from './suggestion-categories.controller';
import { AuthModule } from '../auth/auth.module';
import { OptionalCategoriesModule } from '../optional-categories/optional-categories.module';

@Module({
  controllers: [SuggestionCategoriesController],
  providers: [SuggestionCategoriesService],
  imports: [AuthModule, OptionalCategoriesModule],
})
export class SuggestionCategoriesModule {}
