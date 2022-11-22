import * as Sequelize from 'sequelize-typescript'
import {conn }from "../database/connection";

export interface AdminAddModel{
    name: string
    email: string
    phone: string
    password: string

}

export interface AdminModel extends Sequelize.Model<AdminModel, AdminAddModel>{
    id: number;
    name: string
    email: string
    phone: string
    password: string
    rol: string
}

export const Admin = conn.define<AdminModel, AdminAddModel>( 'admin',{
    
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