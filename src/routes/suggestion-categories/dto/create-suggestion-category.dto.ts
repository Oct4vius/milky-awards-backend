import { IsOptional, IsString } from "class-validator";

export class CreateSuggestionCategoryDto {

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

}
