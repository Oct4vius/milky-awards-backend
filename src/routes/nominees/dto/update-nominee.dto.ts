import { PartialType } from '@nestjs/mapped-types';
import { CreateNomineeDto } from './create-nominee.dto';

export class UpdateNomineeDto extends PartialType(CreateNomineeDto) {}
