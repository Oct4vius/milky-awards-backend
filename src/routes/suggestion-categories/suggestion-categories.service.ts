import { BadRequestException, Injectable } from '@nestjs/common';
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
        throw new BadRequestException({
          message: 'Suggestion already exists',
          statusCode: 403,
        });

      const newSuggestion = await SuggestionCategoryEntity.create({
        name,
      }).save();

      return newSuggestion;
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }

  findAll() {
    try {
      let suggestionCategories = SuggestionCategoryEntity.find();

      return suggestionCategories;
    } catch (error) {
      console.error({ error });
      return error.response as ErrorResponse;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} suggestionCategory`;
  }
}
