import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOptionalCategoryDto } from './dto/create-optional-category.dto';
import { UpdateOptionalCategoryDto } from './dto/update-optional-category.dto';
import { OptionalCategoriesEntity } from './entities/optional-category.entity';
import { ErrorResponse } from 'src/interface/error.interface';
import { IncrementVotesDto } from './dto/increment-votes.dto';

@Injectable()
export class OptionalCategoriesService {
  
  async create(createOptionalCategoryDto: CreateOptionalCategoryDto) {
    try {
      const { name } = createOptionalCategoryDto;

      const doExists = await OptionalCategoriesEntity.findOne({
        where: { name },
      });

      if (doExists)
        throw new BadRequestException({
          message: 'Optional category already exists',
          statusCode: 403,
        });

      let newOptionalCategory = OptionalCategoriesEntity.create({
        name,
      });

      let savedOptinalCategory = await newOptionalCategory.save();

      return savedOptinalCategory;
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }

  async increase(params: IncrementVotesDto) {
    try {
      const { uuid } = params;

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory) throw new Error('Optional category not found');

      optionalCategory.incrementVotes();

      return optionalCategory.save();
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }

  async decrease(params: IncrementVotesDto) {
    try {
      const { uuid } = params;

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory) throw new Error('Optional category not found');

      optionalCategory.decrementVotes();

      return optionalCategory.save();
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }


  findAll() {
    try {
      let optionalCategories = OptionalCategoriesEntity.find();

      return optionalCategories;
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }
}
