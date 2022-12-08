
import { CreatePlayListSongDto } from "../dtos/music/create-playlist_song.dto";
import { PlayListSong } from "../models/playlist_song";
import musicsService from '../services/music.service';
import playlistService from "./playlist.service";

class PlayListSongService {

    public async getPlayListSong (object: CreatePlayListSongDto) {

        const { playlist_id, user_id, music_id } = object;

        const existsPlaylistSong = await PlayListSong.findOne({ where: { playlist_id, user_id, music_id } });

        return existsPlaylistSong;

    }

    public async create (createPlayListSongDto: CreatePlayListSongDto) {

        if (!(await playlistService.getOne(createPlayListSongDto.playlist_id))) {

            return {
                code: 404,
                message: `The playlist id '${createPlayListSongDto.playlist_id}' not exists!`
            }

        }

        if (!(await musicsService.getOne(createPlayListSongDto.music_id))) {

            return {
                code: 404,
                message: `The music id '${createPlayListSongDto.music_id}' not exists!`
            }

        }

        if (await this.getPlayListSong(createPlayListSongDto)) {

            return {
                code: 404,
                message: `Error! the song already added to playlist!`
            }

        }        
        
        const createUser = await PlayListSong.create({ ...createPlayListSongDto });
        return createUser;

    }


}

export default new PlayListSongService();
