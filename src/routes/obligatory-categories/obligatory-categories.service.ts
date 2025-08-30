import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObligatoryCategoriesEntity } from './entities/obligatory-category.entity';

@Injectable()
export class ObligatoryCategoriesService {

  findAll() {
    try {
      let suggestionCategories = ObligatoryCategoriesEntity.find();

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

}
