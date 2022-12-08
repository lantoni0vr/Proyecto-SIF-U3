import { MAX, validate } from 'class-validator';
import { Model } from 'sequelize';
import * as Sequelize from 'sequelize-typescript'
import { AllowNull } from 'sequelize-typescript';
import {conn }from "../database/connection";
import { Music } from './music';
import { PlayListSong } from './playlist_song';


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
}


export const User = conn.define( 'user',{
    
    name: {
        type: Sequelize.DataType.STRING,
        allowNull: false,
        unique: false,
    },

    email: {
        type: Sequelize.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "El email debe ser un correo valido"
            }
        }
    },

    phone:{
        type: Sequelize.DataType.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.DataType.STRING,
        unique: true,
        allowNull: false
    }
})

User.hasMany(PlayListSong, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'user'
});

PlayListSong.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});

