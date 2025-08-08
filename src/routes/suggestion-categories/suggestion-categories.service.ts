import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { ErrorResponse } from 'src/interface/error.interface';
import { SuggestionCategoryEntity } from './entities/suggestion-category.entity';

@Injectable()
export class SuggestionCategoriesService {
  async create(createSuggestionCategoryDto: CreateSuggestionCategoryDto) {
    try {
      const { name } = createSuggestionCategoryDto;

      const suggestionExists = await SuggestionCategoryEntity.findOne({
        where: { name },
      });

      if (suggestionExists)
        throw new HttpException({
          message: 'Suggestion already exists',
        }, HttpStatus.BAD_REQUEST);

      const newSuggestion = await SuggestionCategoryEntity.create({
        name,
      }).save();

      return newSuggestion;
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
      let suggestionCategories = SuggestionCategoryEntity.find();

      return suggestionCategories;
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

  findOne(id: number) {
    return `This action returns a #${id} suggestionCategory`;
  }
}
