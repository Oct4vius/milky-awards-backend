import { IsString } from "class-validator";

export class CreateSuggestionCategoryDto {


    @IsString()
    name: string;

}
