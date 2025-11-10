import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObligatoryCategoriesEntity } from './entities/obligatory-category.entity';

@Injectable()
export class ObligatoryCategoriesService {

  async findAll() {
    try {
      const suggestionCategories = await ObligatoryCategoriesEntity.find();

      const formattedCategories = suggestionCategories.map((cat) => {
        const {id, ...rest} = cat

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

    async findNominees(uuid: string) {
      try {
        const category = await ObligatoryCategoriesEntity.findOne({
          where: { uuid },
          relations: ['nominees'],
        });
        if (!category) {
          throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return category.nominees;
  
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
