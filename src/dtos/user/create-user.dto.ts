import { Length, IsNotEmpty, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto{

    @Length(3, 50, {
        message: "El NOMBRE debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(7, 60)
    @IsOptional()
    phone: string;

    @Length(6, 250)
    @IsNotEmpty()
    password: string

    @IsNumber()
    @IsNotEmpty()
    role_id: number;

}

