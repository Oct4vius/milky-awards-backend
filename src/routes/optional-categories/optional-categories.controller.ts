import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OptionalCategoriesService } from './optional-categories.service';
import { CreateOptionalCategoryDto } from './dto/create-optional-category.dto';
import { IncrementVotesDto } from './dto/increment-votes.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('optional-categories')
export class OptionalCategoriesController {
  constructor(private readonly optionalCategoriesService: OptionalCategoriesService) {}


  
  @Get()
  findAll() {
    return this.optionalCategoriesService.findAll();
  }


  @Post()
  create(@Body() createOptionalCategoryDto: CreateOptionalCategoryDto) {
    return this.optionalCategoriesService.create(createOptionalCategoryDto);
  }

  @Post('increase/:uuid')
  increase(@Param() params: IncrementVotesDto) {
    return this.optionalCategoriesService.increase(params);
  }

  @Post('decrease/:uuid')
  decrease(@Param() params: IncrementVotesDto) {
    return this.optionalCategoriesService.decrease(params);
  }
  
}
