import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNomineeDto } from './dto/create-nominee.dto';
import { UpdateNomineeDto } from './dto/update-nominee.dto';
import { NomineeEntity } from './entities/nominee.entity';
import { ObligatoryCategoriesEntity } from '../obligatory-categories/entities/obligatory-category.entity';
import { IncreaseVotationDto } from './dto/increase-votation.dto';

@Injectable()
export class NomineesService {
  async create(createNomineeDto: CreateNomineeDto, file?: Express.Multer.File) {
    try {
      const { name, username } = createNomineeDto;

      const photoUrl = file ? `/uploads/nominees/${file.filename}` : undefined;

      const newNominee = NomineeEntity.create({
        name,
        username,
        photoUrl,
      });

      const { id, ...rest } = await newNominee.save();

      return rest;
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
      const nominee = await NomineeEntity.find();

      if (!nominee) {
        throw new HttpException('Nominee not found', HttpStatus.NOT_FOUND);
      }

      return nominee;
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

  async findOne(uuid: string) {
    try {
      const nominee = await NomineeEntity.findOne({ where: { uuid } });

      if (!nominee) {
        throw new HttpException('Nominee not found', HttpStatus.NOT_FOUND);
      }

      return nominee;
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

  async update(uuid: string, updateNomineeDto: UpdateNomineeDto) {
    try {
      const nominee = await NomineeEntity.findOne({ where: { uuid } });

      if (!nominee) {
        throw new HttpException('Nominee not found', HttpStatus.NOT_FOUND);
      }

      Object.assign(nominee, updateNomineeDto);

      await nominee.save();
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

  async remove(uuid: string) {
    try {
      await NomineeEntity.delete({ uuid });
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

  async increaseVotation(req: Request, assignToCategoryDto: IncreaseVotationDto) {
    // try {
    //   const { nomineeUUID, categoryUUID, voteUUID } = assignToCategoryDto;


      
    //   const nominee = await NomineeEntity.findOne({
    //     where: { uuid: nomineeUUID },
    //   });

    //   if (!nominee) {
    //     throw new HttpException('Nominee not found', HttpStatus.NOT_FOUND);
    //   }

    //   const obligatoryCategory = await ObligatoryCategoriesEntity.findOne({
    //     where: { uuid: categoryUUID },
    //   });

    //   if (!obligatoryCategory) throw new HttpException('Obligatory Category not found', HttpStatus.NOT_FOUND);
      


    //   return;

    // } catch (error) {
    //   if (error instanceof HttpException) {
    //     throw error;
    //   }
    //   throw new HttpException(
    //     error.message || 'Internal server error',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }




}
