import { IsEmail, IsString } from "class-validator";

export class CreateWhiteListUserDto{

    @IsEmail()
    email: string

    @IsString()
    name: string
}