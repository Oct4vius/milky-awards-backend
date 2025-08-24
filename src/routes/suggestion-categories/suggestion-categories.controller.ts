import { Controller, Get, Post, Body, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { SuggestionCategoriesService } from './suggestion-categories.service';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UuidParamValidator } from '../optional-categories/dto/increment-votes.dto';

@UseGuards(AuthGuard)
@Controller('suggestion-categories')
export class SuggestionCategoriesController {
  constructor(private readonly suggestionCategoriesService: SuggestionCategoriesService) {}

  @Post()
  create(@Body() createSuggestionCategoryDto: CreateSuggestionCategoryDto, @Req() req) {
    return this.suggestionCategoriesService.create(createSuggestionCategoryDto, req);
  }

  @Get()
  findAll() {
    return this.suggestionCategoriesService.findAll();
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    // Optionally validate UUID format here
    return this.suggestionCategoriesService.delete(uuid);
  }

}
