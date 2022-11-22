import * as Sequelize from 'sequelize-typescript'
import {conn }from "../database/connection";


export interface UserAddModel{
    name: string
    email: string
    phone: string
    password: string

}


export interface UserModel extends Sequelize.Model<UserModel, UserAddModel>{
    id: number;
    name: string
    email: string
    phone: string
    password: string
    rol: string
}


export const User = conn.define<UserModel, UserAddModel>( 'user',{
    
    name: {
        type: Sequelize.DataType.STRING(50),
        unique: false,
    },

    email: {
        type: Sequelize.DataType.STRING(20)
    },

    phone:{
        type: Sequelize.DataType.STRING(10)
    },

    password:{
        type: Sequelize.DataType.STRING(20)
    }
})