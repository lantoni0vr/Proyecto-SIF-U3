import { Length, IsNotEmpty, IsOptional} from 'class-validator';
import { Unique } from 'sequelize-typescript';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export class CreateRoleDto{

    @Length(3, 50, {
        message: ":-("
    })
    @IsNotEmpty()
    role: string;

}