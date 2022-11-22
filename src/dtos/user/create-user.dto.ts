import { Length, IsNotEmpty, IsOptional} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export class CreateUserDto{

    @Length(3, 50, {
        message: "El NOMBRE debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty()
    name: string;

    @Length(3, 20)
    @IsNotEmpty()
    email: string;

    @Length(7, 15)
    @IsOptional()
    phone: string;

    @Length(3, 20)
    @IsOptional()
    password: string
}