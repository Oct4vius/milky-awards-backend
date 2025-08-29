import { IsString } from "class-validator";


export class ApproveCategoryDto {
    
    @IsString()
    title: string;

}