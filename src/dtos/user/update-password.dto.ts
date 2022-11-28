
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UpdatePasswordDto {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    public new_password: string;

}
