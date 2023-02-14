import { IsArray, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    user: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}
