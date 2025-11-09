import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOptionalCategoryDto } from './dto/create-optional-category.dto';
import { OptionalCategoriesEntity } from './entities/optional-category.entity';
import { UuidParamValidator } from './dto/increment-votes.dto';
import { Request } from 'express';
import { ObligatoryCategoriesEntity } from '../obligatory-categories/entities/obligatory-category.entity';

@Injectable()
export class OptionalCategoriesService {
  async create(createOptionalCategoryDto: CreateOptionalCategoryDto) {
    try {
      const { title } = createOptionalCategoryDto;

      const doExists = await OptionalCategoriesEntity.findOne({
        where: { title },
      });

      if (doExists)
        throw new HttpException(
          {
            message: 'Optional category already exists',
          },
          HttpStatus.BAD_REQUEST,
        );

      let newOptionalCategory = OptionalCategoriesEntity.create({
        title,
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

  async increase(params: UuidParamValidator, req: Request) {
    try {
      const { uuid } = params;

      const { uuid: userUUID } = req['user'];

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory)
        throw new HttpException(
          'Optional category not found',
          HttpStatus.NOT_FOUND,
        );

      if (optionalCategory.didUserVote(userUUID))
        throw new HttpException(
          'Ya tu votaste en eto. Dime a ve',
          HttpStatus.BAD_REQUEST,
        );


      optionalCategory.incrementVotes(userUUID);

      const {votes, ...rest} = await optionalCategory.save();
      
      return {
        ...rest,
        votes: votes.length,
        userVoted: votes === undefined ? false : votes.includes(userUUID),
      }
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

  async decrease(params: UuidParamValidator, req: Request) {
    try {
      const { uuid } = params;

      const { uuid: userUUID } = req['user'];

      let optionalCategory = await OptionalCategoriesEntity.findOne({
        where: { uuid },
      });

      if (!optionalCategory)
        throw new HttpException(
          'Optional category not found',
          HttpStatus.NOT_FOUND,
        );

      if (!optionalCategory.didUserVote(userUUID))
        throw new HttpException(
          'Tu no has votado en eto. Dime a ve',
          HttpStatus.BAD_REQUEST,
        );

      optionalCategory.decrementVotes(userUUID);

      const {votes, ...rest} = await optionalCategory.save();
      
      return {
        ...rest,
        votes: votes.length,
        userVoted: votes === undefined ? false : votes.includes(userUUID),
      }
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

  async findAll(req: Request): Promise<
    Array<{
      uuid: string;
      title: string;
      votes: number;
      userVoted: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    try {
      const optionalCategories = await OptionalCategoriesEntity.find();
      const { uuid: userUUID } = req['user'];

      if (!optionalCategories || optionalCategories.length === 0) {
        throw new HttpException(
          {
            message: 'No optional categories found',
          },
          HttpStatus.NOT_FOUND,
        );
      }


      const formattedCategories = optionalCategories.map(
        ({ id, votes, ...rest }) => ({
          ...rest,
          votes: votes.length ?? 0,
          userVoted: votes === undefined ? false : votes.includes(userUUID),
        }),
      );

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


  async delete(uuid: string) {
    try {

      if (!uuid)
        throw new HttpException(
          {
            message: 'Params Error',
          },
          HttpStatus.BAD_REQUEST,
        );

      await OptionalCategoriesEntity.delete({ uuid });
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

  async optionalToObligatory(){
    try {
      
      const topCat = await OptionalCategoriesEntity.find({
        order: {
          votes: 'DESC'
        },
        take: 9
      })

      const newObligatoryCat = topCat.map((categorie) => (
        ObligatoryCategoriesEntity.create({
          title: categorie.title
        })
      ))

      ObligatoryCategoriesEntity.save(newObligatoryCat)


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
