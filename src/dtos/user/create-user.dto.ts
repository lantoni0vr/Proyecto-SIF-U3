import { Length, IsNotEmpty, IsOptional} from 'class-validator';
import { Unique } from 'sequelize-typescript';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export class CreateUserDto{

    @Length(3, 50, {
        message: "El NOMBRE debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty()
    name: string;

    @Length(3, 200)
    @IsNotEmpty()
    email: string;

    @Length(7, 60)
    @IsOptional()
    phone: string;

    @Length(6, 250)
    @IsNotEmpty()
    password: string

    @Length(6, 250)
    @IsNotEmpty()
    role: string

}

