import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { ErrorResponse } from 'src/interface/error.interface';
import { SuggestionCategoryEntity } from './entities/suggestion-category.entity';
import { UuidParamValidator } from '../optional-categories/dto/increment-votes.dto';

@Injectable()
export class SuggestionCategoriesService {
  async create(
    createSuggestionCategoryDto: CreateSuggestionCategoryDto,
    req: Request,
  ) {
    try {
      const payload = createSuggestionCategoryDto;

      const author = req['user'].username;

      const suggestionExists = await SuggestionCategoryEntity.findOne({
        where: { name: payload.name },
      });

      if (suggestionExists)
        throw new HttpException(
          {
            message: 'Suggestion already exists',
          },
          HttpStatus.BAD_REQUEST,
        );

      const newSuggestion = await SuggestionCategoryEntity.create({
        ...payload,
        author,
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

  async delete(uuid: string) {
    try {

      if (!uuid)
        throw new HttpException(
          {
            message: 'Params Error',
          },
          HttpStatus.BAD_REQUEST,
        );

      await SuggestionCategoryEntity.delete({ uuid });
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
