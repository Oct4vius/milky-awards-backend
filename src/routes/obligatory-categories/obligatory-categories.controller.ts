import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ObligatoryCategoriesService } from './obligatory-categories.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('obligatory-categories')
export class ObligatoryCategoriesController {
  constructor(private readonly obligatoryCategoriesService: ObligatoryCategoriesService) {}


  @Get()
  findAll() {
    return this.obligatoryCategoriesService.findAll();
  }

  @Get(':uuid/nominees')
  findNominees(@Param('uuid') uuid: string) {
    return this.obligatoryCategoriesService.findNominees(uuid);
  }

}
