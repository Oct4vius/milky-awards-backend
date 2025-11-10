import { IsOptional, IsString } from "class-validator";

export class CreateNomineeDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    username: string;


}
