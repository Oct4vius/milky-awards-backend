import { IsString } from "class-validator";

export class CreateOptionalCategoryDto {

    @IsString()
    name: string

}
