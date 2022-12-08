import { AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript";
import * as Sequelize from 'sequelize-typescript'
import {conn }from "../database/connection";
import { PlayListSong } from "./playlist_song";

export interface MusicAddModel{
    title: string
    artist: string
    gender: string
    album: string
    year: number

}

export interface MusicModel extends Sequelize.Model<MusicModel, MusicAddModel>{
    id: number
    title: string
    artist: string
    gender: string
    album: string
    year: number
    createdAt: Date;
    updatedAt: Date;
}

export const Music = conn.define<MusicModel, MusicAddModel>( 'music',{
    
    title: {
        type: Sequelize.DataType.STRING(50),
        unique: false,
    },

    artist: {
        type: Sequelize.DataType.STRING(20)
    },

    gender:{
        type: Sequelize.DataType.STRING(15)
    },

    album:{
        type: Sequelize.DataType.STRING(20)
    },

    year:{
        type: Sequelize.DataType.INTEGER
    }

});

Music.hasMany(PlayListSong, {
    sourceKey: 'id',
    foreignKey: 'music_id',
    as: 'music'
});

PlayListSong.belongsTo(Music, {
    foreignKey: 'music_id',
    targetKey: 'id'
});
