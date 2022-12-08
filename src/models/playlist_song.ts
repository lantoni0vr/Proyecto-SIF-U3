
import * as Sequelize from 'sequelize-typescript';
import { conn } from '../database/connection';

export interface PlayListSongAddModel {
    playlist_id: number,
    user_id: number,
    music_id: number
}

export interface PlayListSongModel extends Sequelize.Model<PlayListSongModel, PlayListSongAddModel> {
    playlist_id: number,
    user_id: number,
    music_id: number
}

export const PlayListSong = conn.define(
    'playlist_songs',
    {
        playlist_id: {
            type: Sequelize.DataType.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.DataType.INTEGER,
            primaryKey: true
        },
        music_id: {
            type: Sequelize.DataType.INTEGER,
            primaryKey: true
        }
    }
); 
