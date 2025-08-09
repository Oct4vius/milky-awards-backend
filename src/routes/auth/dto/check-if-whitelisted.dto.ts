import { IsEmail } from "class-validator";


export class CheckIfWhitelistedDto {
  @IsEmail()
  email: string;
}