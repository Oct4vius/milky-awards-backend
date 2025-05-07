import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SuggestionCategoriesService } from './suggestion-categories.service';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

UseGuards(AuthGuard)
@Controller('suggestion-categories')
export class SuggestionCategoriesController {
  constructor(private readonly suggestionCategoriesService: SuggestionCategoriesService) {}

  @Post()
  create(@Body() createSuggestionCategoryDto: CreateSuggestionCategoryDto) {
    return this.suggestionCategoriesService.create(createSuggestionCategoryDto);
  }

  @Get()
  findAll() {
    return this.suggestionCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionCategoriesService.findOne(+id);
  }

}
