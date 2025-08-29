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
import { ApproveCategoryDto } from './dto/approve-category.dto';
import { OptionalCategoriesService } from '../optional-categories/optional-categories.service';
import { title } from 'process';

@Injectable()
export class SuggestionCategoriesService {

  constructor(private readonly optionalCategoriesService: OptionalCategoriesService) {}

  async create(
    createSuggestionCategoryDto: CreateSuggestionCategoryDto,
    req: Request,
  ) {
    try {
      const payload = createSuggestionCategoryDto;

      const author = req['user'].username;

      const suggestionExists = await SuggestionCategoryEntity.findOne({
        where: { title: payload.title },
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

  async approve(approveCategoryDto: ApproveCategoryDto, uuid: string) {
    try {

      const { title } = approveCategoryDto;

      await SuggestionCategoryEntity.delete({
        uuid
      });

      const newOptionalCategory = await this.optionalCategoriesService.create({
        title
      })


      return newOptionalCategory;
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
