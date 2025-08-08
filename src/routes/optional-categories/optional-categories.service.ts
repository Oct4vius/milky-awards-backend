import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOptionalCategoryDto } from './dto/create-optional-category.dto';
import { OptionalCategoriesEntity } from './entities/optional-category.entity';
import { UuidParamValidator } from './dto/increment-votes.dto';

@Injectable()
export class OptionalCategoriesService {
  
  async create(createOptionalCategoryDto: CreateOptionalCategoryDto) {
    try {
      const { name } = createOptionalCategoryDto;

      const doExists = await OptionalCategoriesEntity.findOne({
        where: { name },
      });

      if (doExists)
        throw new HttpException({
          message: 'Optional category already exists',
        }, HttpStatus.BAD_REQUEST);

      let newOptionalCategory = OptionalCategoriesEntity.create({
        name,
      });

      let savedOptinalCategory = await newOptionalCategory.save();

      return savedOptinalCategory;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async increase(params: UuidParamValidator) {
    try {
      const { uuid } = params;

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory) throw new HttpException('Optional category not found', HttpStatus.NOT_FOUND);

      optionalCategory.incrementVotes();

      return optionalCategory.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async decrease(params: UuidParamValidator) {
    try {
      const { uuid } = params;

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory) throw new HttpException('Optional category not found', HttpStatus.NOT_FOUND);

      optionalCategory.decrementVotes();

      return optionalCategory.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    try {
      let optionalCategories = OptionalCategoriesEntity.find();

      return optionalCategories;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
