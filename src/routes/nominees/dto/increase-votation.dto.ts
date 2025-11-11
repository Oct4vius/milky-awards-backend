import { IsString } from "class-validator";

export  class IncreaseVotationDto {

    @IsString()
    categoryUUID: string;

    @IsString()
    nomineeUUID: string;

    @IsString()
    votationUUID: string;

}

