import { IsString } from "class-validator";

export class AssignToCategoryDto {

    @IsString()
    nomineeUUID: string;

    @IsString()
    categoryUUID: string;

}