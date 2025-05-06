import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionalCategoryDto } from './create-optional-category.dto';

export class UpdateOptionalCategoryDto extends PartialType(CreateOptionalCategoryDto) {}
