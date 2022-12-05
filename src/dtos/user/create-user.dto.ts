import { Length, IsNotEmpty, IsOptional, IsEmail} from 'class-validator';
import { Unique } from 'sequelize-typescript';

export class CreateUserDto{

    @Length(3, 50, {
        message: "El nombre debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty({
        message : "Debe de ingresar datos"
    })
    name: string;

    @Length(3, 200, {
        message: "El email debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty({
        message : "Debe de ingresar datos"
    })
    @IsEmail()
    email: string;

    @Length(8 ,8 , {
        message : "El telefono debe de ser valido"
    })
    @IsOptional()
    phone: string;

    @Length(6, 250, {
        message: "La contrasena debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty({
        message : "Debe de ingresar datos"
    })
    password: string

    @Length(6, 250, {
        message: "El rol debe estar entre 3 y 20 caracteres"
    })
    @IsNotEmpty({
        message : "Debe de ingresar datos"
    })
    role: string

}

