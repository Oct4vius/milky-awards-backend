import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';
import { SuggestionCategoryEntity } from './entities/suggestion-category.entity';
import { ApproveCategoryDto } from './dto/approve-category.dto';
import { OptionalCategoriesService } from '../optional-categories/optional-categories.service';

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

  async findAll() {
    try {
      const suggestionCategories = await SuggestionCategoryEntity.find();

      const formattedCategories = suggestionCategories.map((cat) => {
        const { id, ...rest } = cat

        return rest
      }) 

      return formattedCategories;
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
