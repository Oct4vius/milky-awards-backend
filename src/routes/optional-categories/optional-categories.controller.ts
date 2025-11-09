import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { OptionalCategoriesService } from './optional-categories.service';
import { CreateOptionalCategoryDto } from './dto/create-optional-category.dto';
import { UuidParamValidator } from './dto/increment-votes.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AuthGuard)
@Controller('optional-categories')
export class OptionalCategoriesController {
  constructor(
    private readonly optionalCategoriesService: OptionalCategoriesService,
  ) {}

  @Get()
  findAll(@Req() req) {
    return this.optionalCategoriesService.findAll(req);
  }

  @UseGuards(AdminGuard)
  @Get('optional-to-obligatory')
  optionalToObligatory(){
    return this.optionalCategoriesService.optionalToObligatory()
  }

  @Post()
  create(@Body() createOptionalCategoryDto: CreateOptionalCategoryDto) {
    return this.optionalCategoriesService.create(createOptionalCategoryDto);
  }

  @Patch('increase/:uuid')
  increase(@Param() params: UuidParamValidator, @Req() req) {
    return this.optionalCategoriesService.increase(params, req);
  }

  @Patch('decrease/:uuid')
  decrease(@Param() params: UuidParamValidator, @Req() req) {
    return this.optionalCategoriesService.decrease(params, req);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.optionalCategoriesService.delete(uuid);
  }
}
