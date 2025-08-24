import { IsOptional, IsString } from "class-validator";

export class CreateSuggestionCategoryDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

}
