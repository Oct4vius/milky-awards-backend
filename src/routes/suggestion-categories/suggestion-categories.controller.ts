import { Controller, Get, Post, Body, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { SuggestionCategoriesService } from './suggestion-categories.service';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApproveCategoryDto } from './dto/approve-category.dto';

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

  @Post('approve/:uuid')
  approve(@Body() approveCategoryDto: ApproveCategoryDto, @Param('uuid') uuid: string) {
    return this.suggestionCategoriesService.approve(approveCategoryDto, uuid);
  }
  
  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    // Optionally validate UUID format here
    return this.suggestionCategoriesService.delete(uuid);
  }

}
