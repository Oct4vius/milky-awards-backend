import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomineesService } from './nominees.service';
import { CreateNomineeDto } from './dto/create-nominee.dto';
import { UpdateNomineeDto } from './dto/update-nominee.dto';
import { AssignToCategoryDto } from './dto/assign-to-category.dto';

@Controller('nominees')
export class NomineesController {
  constructor(private readonly nomineesService: NomineesService) {}

  @Post()
  create(@Body() createNomineeDto: CreateNomineeDto) {
    return this.nomineesService.create(createNomineeDto);
  }

  @Post('assign-to-category')
  assignToCategory(@Body() assignToCategoryDto: AssignToCategoryDto) {
    return this.nomineesService.assignToCategory(assignToCategoryDto);
  }

  @Get()
  findAll() {
    return this.nomineesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nomineesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateNomineeDto: UpdateNomineeDto) {
    return this.nomineesService.update(uuid, updateNomineeDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nomineesService.remove(uuid);
  }
}
