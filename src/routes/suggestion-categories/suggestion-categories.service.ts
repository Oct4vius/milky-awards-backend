import { Injectable } from '@nestjs/common';
import { CreateSuggestionCategoryDto } from './dto/create-suggestion-category.dto';

@Injectable()
export class SuggestionCategoriesService {
  create(createSuggestionCategoryDto: CreateSuggestionCategoryDto) {
    return 'This action adds a new suggestionCategory';
  }

  findAll() {
    return `This action returns all suggestionCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suggestionCategory`;
  }

}
