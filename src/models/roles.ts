import { MAX, validate } from 'class-validator';
import { Model } from 'sequelize';
import * as Sequelize from 'sequelize-typescript'
import { AllowNull } from 'sequelize-typescript';
import {conn }from "../database/connection";
import { Music } from './music';
import { User } from './user';


export interface RoleAddModel{
    id: number
    role: string
}


export interface RoleModel extends Sequelize.Model<RoleModel, RoleAddModel>{
    id: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}


export const Role = conn.define<RoleModel, RoleAddModel>( 'roles',{
    
    id: {
        type: Sequelize.DataType.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    role: {
        type: Sequelize.DataType.STRING,
        allowNull : false,
        }
})

Role.hasMany(User, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'user'
});