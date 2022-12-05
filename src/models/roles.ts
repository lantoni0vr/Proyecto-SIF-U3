import { MAX, validate } from 'class-validator';
import { Model } from 'sequelize';
import * as Sequelize from 'sequelize-typescript'
import {conn }from "../database/connection";
import { User } from './user';


export interface RoleAddModel{
    id: number
    role: string
}


export interface RoleModel extends Sequelize.Model<RoleModel, RoleAddModel>{
    id: number;
    role: string;
}


export const Role = conn.define( 'roles',{
    
    id: {
        type: Sequelize.DataType.INTEGER,
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
    foreignKey: 'role_id',
    as: 'user'
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    targetKey: 'id'
});
