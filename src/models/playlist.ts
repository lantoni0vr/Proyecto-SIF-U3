
import * as Sequelize from 'sequelize-typescript';
import { conn } from '../database/connection';
import { PlayListSong } from './playlist_song';

export interface PlayListAddModel {
    id: number,
    name: string
}

export interface PlayListModel extends Sequelize.Model<PlayListModel, PlayListAddModel> {
    id: number,
    name: string
}

export const PlayList = conn.define(
    'palylists',
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataType.STRING(50)
        }
    }
); 

PlayList.hasMany(PlayListSong, {
    sourceKey: 'id',
    foreignKey: 'playlist_id'
});

PlayListSong.belongsTo(PlayList, {
    foreignKey: 'playlist_id',
    targetKey: 'id'
});
