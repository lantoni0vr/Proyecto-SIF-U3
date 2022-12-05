import * as Sequelize from 'sequelize-typescript'
import {conn }from "../database/connection";
import { Role } from '../models/roles';

export interface UserAddModel{
    name: string
    email: string
    phone: string
    password: string
    role: string
}


export interface UserModel extends Sequelize.Model<UserModel, UserAddModel>{
    id: number;
    name: string
    email: string
    phone: string
    password: string
    role: string
}


export const User = conn.define<UserModel, UserAddModel>( 'user',{
    
    name: {
        type: Sequelize.DataType.STRING,
        allowNull: false,
        unique: false,
    },

    email: {
        type: Sequelize.DataType.STRING,
        allowNull: false,
        unique : true,
               
    },

    phone:{
        type: Sequelize.DataType.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.DataType.STRING,
 //       unique: true,
        allowNull: false
    },

    role :{
        type: Sequelize.DataType.STRING,
        allowNull : false
    }
})

